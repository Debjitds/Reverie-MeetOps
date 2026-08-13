import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function useTranslation() {
  const { currentLanguage, translate, translateBatch, isRTL } = useLanguage();
  const [translations, setTranslations] = useState<Map<string, string>>(new Map());

  // Clear translations when language changes
  useEffect(() => {
    setTranslations(new Map());
  }, [currentLanguage]);

  // Translate a single text
  const t = async (text: string, sourceLang: string = 'en'): Promise<string> => {
    // Check local cache first
    const cacheKey = `${text}_${currentLanguage}`;
    if (translations.has(cacheKey)) {
      return translations.get(cacheKey)!;
    }

    const translated = await translate(text, sourceLang);
    
    // Update local cache
    setTranslations((prev) => new Map(prev).set(cacheKey, translated));
    
    return translated;
  };

  // Synchronous translation (returns original if not cached)
  const tSync = (text: string): string => {
    if (currentLanguage === 'en') return text;
    
    const cacheKey = `${text}_${currentLanguage}`;
    return translations.get(cacheKey) || text;
  };

  // Translate multiple texts
  const tBatch = async (texts: string[], sourceLang: string = 'en'): Promise<string[]> => {
    const translated = await translateBatch(texts, sourceLang);
    
    // Update local cache
    texts.forEach((text, index) => {
      const cacheKey = `${text}_${currentLanguage}`;
      setTranslations((prev) => new Map(prev).set(cacheKey, translated[index]));
    });
    
    return translated;
  };

  return {
    t,
    tSync,
    tBatch,
    currentLanguage,
    isRTL,
  };
}
