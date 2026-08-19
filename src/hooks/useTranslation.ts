import { useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateKey } from '@/i18n';

/**
 * Thin wrapper kept for compatibility. All lookups resolve synchronously
 * from the local static dictionary — no network calls.
 */
export function useTranslation() {
  const { currentLanguage, isRTL } = useLanguage();

  const t = useCallback(
    (text: string): string => translateKey(text, currentLanguage),
    [currentLanguage]
  );

  const tBatch = useCallback(
    (texts: string[]): string[] => texts.map((text) => translateKey(text, currentLanguage)),
    [currentLanguage]
  );

  return {
    t,
    tSync: t,
    tBatch,
    currentLanguage,
    isRTL,
  };
}
