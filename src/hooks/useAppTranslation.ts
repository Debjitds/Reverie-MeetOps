import { useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateKey } from '@/i18n';

interface UseAppTranslationReturn {
  t: (key: string) => string;
  currentLanguage: string;
  isRTL: boolean;
}

export function useAppTranslation(): UseAppTranslationReturn {
  const { currentLanguage, isRTL } = useLanguage();

  // Synchronous lookup against the local static dictionary — no network calls
  const t = useCallback(
    (key: string): string => translateKey(key, currentLanguage),
    [currentLanguage]
  );

  return {
    t,
    currentLanguage,
    isRTL,
  };
}
