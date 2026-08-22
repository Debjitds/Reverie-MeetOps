/**
 * Static i18n dictionaries.
 *
 * Static UI translation is resolved LOCALLY from these dictionaries —
 * no translation API (Gemini / MeDo gateway / translate-text) is involved.
 *
 * English is derived by flattening TRANSLATION_KEYS (the English source).
 * Other languages live in sibling files (bn.ts, ...) using the same
 * dot-notation keys. Missing keys in a language fall back to English.
 */
import type { LanguageCode } from '@/lib/languages';
import { TRANSLATION_KEYS } from '@/lib/translation-keys';
import { bn } from './bn';
import { hi } from './hi';
import { zh } from './zh';
import { ja } from './ja';
import { ta } from './ta';
import { es } from './es';
import { fr } from './fr';

function flattenKeys(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const flat: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      flat[path] = value;
    } else if (value && typeof value === 'object') {
      Object.assign(flat, flattenKeys(value as Record<string, unknown>, path));
    }
  }
  return flat;
}

const en: Record<string, string> = flattenKeys(TRANSLATION_KEYS);

export const DICTIONARIES: Partial<Record<LanguageCode, Record<string, string>>> = {
  en,
  bn,
  hi,
  zh,
  ja,
  ta,
  es,
  fr,
};

/** Languages that have a static dictionary implemented so far. */
export const IMPLEMENTED_LANGUAGES: LanguageCode[] = ['en', 'bn', 'hi', 'zh', 'ja', 'ta', 'es', 'fr'];

/**
 * Resolve a dot-notation translation key for a language.
 * Falls back to English when the language has no dictionary or the key
 * is missing from it — never makes a network request.
 */
export function translateKey(key: string, language: LanguageCode): string {
  const dict = DICTIONARIES[language];
  return (dict && dict[key]) || en[key] || key;
}
