import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { LANGUAGE_LABEL, LANGUAGES } from '@/shared/locales';

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
      className="label-tech flex cursor-pointer items-center gap-1.5 px-2 py-2 text-muted-foreground transition-colors hover:text-foreground lg:px-3"
      aria-label={LL.language.label()}
    >
      <Languages className="size-4 lg:size-3.5" />
      <span className="hidden lg:inline">{LANGUAGE_LABEL[language]}</span>
    </button>
  );
}
