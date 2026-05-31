import { useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Locales } from '@/i18n/i18n-types.js';
import TypesafeI18n, { useI18nContext } from '@/i18n/i18n-react.js';
import { loadLocaleAsync } from '@/i18n/i18n-util.async.js';
import { LANGUAGES } from '@/shared/locales';
import type { Language } from '@/shared/locales';
import { LanguageContext } from '@/hooks/use-language';

const STORAGE_KEY = 'language';
const DEFAULT_LOCALE: Language = 'en-US';

function detectInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && (LANGUAGES as readonly string[]).includes(stored)) return stored;

  const browserLang = navigator.language;
  if ((LANGUAGES as readonly string[]).includes(browserLang))
    return browserLang as Language;

  const prefix = browserLang.split('-')[0];
  const match = LANGUAGES.find((l) => l.startsWith(prefix));
  if (match) return match;

  return DEFAULT_LOCALE;
}

/**
 * Bridge component that syncs our language state to typesafe-i18n's internal
 * locale state. TypesafeI18n only reads its `locale` prop on mount — it ignores
 * subsequent prop changes. This component must be rendered *inside* TypesafeI18n
 * so it can call the context's `setLocale`.
 */
function I18nLocaleSyncer({
  language,
  children,
}: {
  language: Language;
  children: ReactNode;
}) {
  const { setLocale } = useI18nContext();

  useEffect(() => {
    setLocale(language as Locales);
    document.documentElement.lang = language;
  }, [language, setLocale]);

  return <>{children}</>;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);
  const [localeLoaded, setLocaleLoaded] = useState(false);

  // Load the initial locale asynchronously
  useEffect(() => {
    loadLocaleAsync(language as Locales).then(() => setLocaleLoaded(true));
  }, [language]);

  const setLanguage = useCallback(async (lang: Language) => {
    await loadLocaleAsync(lang as Locales);
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  if (!localeLoaded) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <TypesafeI18n locale={language as Locales}>
        <I18nLocaleSyncer language={language}>{children}</I18nLocaleSyncer>
      </TypesafeI18n>
    </LanguageContext.Provider>
  );
}
