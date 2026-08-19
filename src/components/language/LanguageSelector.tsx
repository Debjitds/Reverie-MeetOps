import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { getAllLanguages, LanguageCode } from '@/lib/languages';
import { IMPLEMENTED_LANGUAGES } from '@/i18n';
import { toast } from 'sonner';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { t } = useAppTranslation();
  const [loading, setLoading] = useState(false);
  const languages = getAllLanguages();

  const handleLanguageChange = async (value: string) => {
    setLoading(true);
    try {
      await setLanguage(value as LanguageCode);
      toast.success(t('language.updateSuccess'));
    } catch (error) {
      console.error('Failed to update language:', error);
      toast.error(t('language.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="language-selector" className="font-bold uppercase">
        Language Preference
      </Label>
      <Select
        value={currentLanguage}
        onValueChange={handleLanguageChange}
        disabled={loading}
      >
        <SelectTrigger
          id="language-selector"
          className="w-full border-3 border-black"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-3 border-black">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              disabled={!IMPLEMENTED_LANGUAGES.includes(lang.code)}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
                <span className="text-muted-foreground">— {lang.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Select your preferred language for the entire application interface.
      </p>
    </div>
  );
}
