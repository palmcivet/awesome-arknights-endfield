import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { LANGUAGES } from '@/shared/locales';
import type { Language } from '@/shared/locales';

const LANGUAGE_DISPLAY: Record<Language, string> = {
  'en-US': 'EN',
  'zh-CN': '中',
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { LL } = useI18nContext();

  const toggleLanguage = () => {
    const currentIndex = LANGUAGES.indexOf(language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIndex]);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="label-tech flex cursor-pointer items-center gap-1.5 px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
      aria-label={LL.language.label()}
    >
      <Languages className="size-3.5" />
      {LANGUAGE_DISPLAY[language]}
    </button>
  );
}
