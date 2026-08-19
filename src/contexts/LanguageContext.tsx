import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/db/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageCode, DEFAULT_LANGUAGE, isRTL } from '@/lib/languages';
import { IMPLEMENTED_LANGUAGES } from '@/i18n';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { profile, refreshProfile } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [isRTLMode, setIsRTLMode] = useState(false);

  // Update document direction for RTL
  const updateDocumentDirection = (lang: LanguageCode) => {
    const rtl = isRTL(lang);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

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

  // Languages without a static dictionary yet fall back to English everywhere
  const effectiveLanguage = IMPLEMENTED_LANGUAGES.includes(currentLanguage)
    ? currentLanguage
    : DEFAULT_LANGUAGE;

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: effectiveLanguage,
        setLanguage,
        isRTL: isRTLMode,
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
