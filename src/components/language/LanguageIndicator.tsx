import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { getAllLanguages, getLanguageInfo, LanguageCode } from '@/lib/languages';
import { IMPLEMENTED_LANGUAGES } from '@/i18n';
import { toast } from 'sonner';

export function LanguageIndicator() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { t } = useAppTranslation();
  const [loading, setLoading] = useState(false);
  const currentLangInfo = getLanguageInfo(currentLanguage);
  const allLanguages = getAllLanguages();

  const handleLanguageChange = async (langCode: LanguageCode) => {
    if (langCode === currentLanguage) return;

    setLoading(true);
    try {
      await setLanguage(langCode);
      toast.success(
        t('language.changedTo').replace('{nativeName}', getLanguageInfo(langCode).nativeName)
      );
    } catch (error) {
      console.error('Failed to change language:', error);
      toast.error(t('language.changeFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-2 border-black gap-1 px-1 sm:px-2 md:gap-2 md:px-3"
          disabled={loading}
        >
          <Globe className="w-4 h-4 hidden sm:block" />
          <span className="text-sm md:text-base">{currentLangInfo.flag}</span>
          <span className="font-bold uppercase text-[10px] sm:text-xs md:text-sm">{currentLangInfo.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-3 border-black w-64"
      >
        {allLanguages.map((lang) => {
          const implemented = IMPLEMENTED_LANGUAGES.includes(lang.code);
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => implemented && handleLanguageChange(lang.code)}
              disabled={!implemented}
              className={`cursor-pointer ${
                lang.code === currentLanguage ? 'bg-primary/10 font-bold' : ''
              } ${!implemented ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="flex items-center gap-2 w-full">
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1">{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground uppercase">
                  {lang.code}
                </span>
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
