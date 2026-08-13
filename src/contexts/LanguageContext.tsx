import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/db/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageCode, DEFAULT_LANGUAGE, isRTL } from '@/lib/languages';
import { getAllTranslationKeys } from '@/lib/translation-keys';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  translate: (text: string, sourceLang?: string) => Promise<string>;
  translateBatch: (texts: string[], sourceLang?: string) => Promise<string[]>;
  isRTL: boolean;
  staticTranslations: Map<string, string>;
  isLoadingTranslations: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation cache
const translationCache = new Map<string, string>();

function getCacheKey(text: string, targetLang: string): string {
  return `${text}|||${targetLang}`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { profile, refreshProfile } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [isRTLMode, setIsRTLMode] = useState(false);
  const [staticTranslations, setStaticTranslations] = useState<Map<string, string>>(new Map());
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);

  // Update document direction for RTL
  const updateDocumentDirection = (lang: LanguageCode) => {
    const rtl = isRTL(lang);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const translateBatch = useCallback(async (texts: string[], sourceLang: string = 'en'): Promise<string[]> => {
    // If target language is English or same as source, return original
    if (currentLanguage === 'en' || currentLanguage === sourceLang) {
      return texts;
    }

    // Check which texts need translation
    const textsToTranslate: string[] = [];
    const cachedTranslations: (string | null)[] = texts.map((text) => {
      const cacheKey = getCacheKey(text, currentLanguage);
      if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)!;
      }
      textsToTranslate.push(text);
      return null;
    });

    // If all are cached, return cached results
    if (textsToTranslate.length === 0) {
      return cachedTranslations as string[];
    }

    try {
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: {
          text: textsToTranslate,
          targetLang: currentLanguage,
          sourceLang,
        },
      });

      if (error) throw error;

      const translations = data.translations || textsToTranslate;

      // Cache the translations
      textsToTranslate.forEach((text, index) => {
        const cacheKey = getCacheKey(text, currentLanguage);
        translationCache.set(cacheKey, translations[index]);
      });

      // Merge cached and new translations
      let translationIndex = 0;
      return cachedTranslations.map((cached) => {
        if (cached !== null) return cached;
        return translations[translationIndex++];
      });
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts; // Return original texts on error
    }
  }, [currentLanguage]);

  // Load static translations when language changes
  useEffect(() => {
    const loadStaticTranslations = async () => {
      if (currentLanguage === 'en') {
        setStaticTranslations(new Map());
        setIsLoadingTranslations(false);
        return;
      }

      setIsLoadingTranslations(true);
      try {
        const allKeys = getAllTranslationKeys();
        const translatedValues = await translateBatch(allKeys);
        
        const translationMap = new Map<string, string>();
        allKeys.forEach((key, index) => {
          translationMap.set(key, translatedValues[index]);
        });
        
        setStaticTranslations(translationMap);
      } catch (error) {
        console.error('Failed to load static translations:', error);
      } finally {
        setIsLoadingTranslations(false);
      }
    };

    loadStaticTranslations();
  }, [currentLanguage, translateBatch]);

  // Load user's language preference
  useEffect(() => {
    if (profile?.language_preference) {
      const lang = profile.language_preference as LanguageCode;
      setCurrentLanguage(lang);
      setIsRTLMode(isRTL(lang));
      updateDocumentDirection(lang);
    }
  }, [profile]);

  const setLanguage = async (lang: LanguageCode) => {
    try {
      // Update in database if user is logged in
      if (profile?.id) {
        const { error } = await supabase
          .from('profiles')
          .update({ language_preference: lang })
          .eq('id', profile.id);

        if (error) throw error;
        
        // Refresh profile in AuthContext to keep it in sync
        await refreshProfile();
      }

      // Update local state
      setCurrentLanguage(lang);
      setIsRTLMode(isRTL(lang));
      updateDocumentDirection(lang);
    } catch (error) {
      console.error('Failed to update language preference:', error);
      throw error;
    }
  };

  const translate = async (text: string, sourceLang: string = 'en'): Promise<string> => {
    // If target language is English or same as source, return original
    if (currentLanguage === 'en' || currentLanguage === sourceLang) {
      return text;
    }

    // Check cache
    const cacheKey = getCacheKey(text, currentLanguage);
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    try {
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: {
          text,
          targetLang: currentLanguage,
          sourceLang,
        },
      });

      if (error) throw error;

      const translated = data.translations || text;
      
      // Cache the translation
      translationCache.set(cacheKey, translated);
      
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translate,
        translateBatch,
        isRTL: isRTLMode,
        staticTranslations,
        isLoadingTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
