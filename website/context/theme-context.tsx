import { useEffect, useState, useCallback, useMemo } from 'react';
import { ThemeContext } from '@/hooks/use-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return stored || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    const updater = () => newTheme;
    if (document.startViewTransition) {
      document.startViewTransition(() => setThemeState(updater));
    } else {
      setThemeState(updater);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const updater = (prev: 'light' | 'dark') => (prev === 'light' ? 'dark' : 'light');
    if (document.startViewTransition) {
      document.startViewTransition(() => setThemeState(updater));
    } else {
      setThemeState(updater);
    }
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
