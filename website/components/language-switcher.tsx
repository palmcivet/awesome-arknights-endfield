import { Languages } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { LANGUAGE_LABEL, LANGUAGES } from '@/shared/locales';
import type { Language } from '@/shared/locales';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { LL } = useI18nContext();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger
        variant="ghost"
        className="label-tech gap-1.5 px-2 py-2 lg:px-3"
        aria-label={LL.language.label()}
      >
        <Languages className="size-4 lg:size-3.5" />
        <span className="hidden md:inline">
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent sideOffset={8}>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {LANGUAGE_LABEL[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
