import { useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslationKey } from '@/lib/translation-keys';

interface UseAppTranslationReturn {
  t: (key: string) => string;
  tDynamic: (text: string) => Promise<string>;
  isLoading: boolean;
  currentLanguage: string;
  isRTL: boolean;
}

export function useAppTranslation(): UseAppTranslationReturn {
  const { currentLanguage, translate, isRTL, staticTranslations, isLoadingTranslations } = useLanguage();

  // Synchronous translation function
  const t = useCallback((key: string): string => {
    // If English, return the key directly
    if (currentLanguage === 'en') {
      return getTranslationKey(key);
    }

    // Get the English text for this key
    const englishText = getTranslationKey(key);
    
    // Look up translation from the shared map in LanguageContext
    const translated = staticTranslations.get(englishText);
    
    // Return translated text or fallback to English
    return translated || englishText;
  }, [currentLanguage, staticTranslations]);

  // Async translation for dynamic content (user-generated text)
  const tDynamic = useCallback(async (text: string): Promise<string> => {
    if (currentLanguage === 'en' || !text) {
      return text;
    }

    try {
      return await translate(text);
    } catch (error) {
      console.error('Dynamic translation failed:', error);
      return text;
    }
  }, [currentLanguage, translate]);

  return {
    t,
    tDynamic,
    isLoading: isLoadingTranslations,
    currentLanguage,
    isRTL,
  };
}
