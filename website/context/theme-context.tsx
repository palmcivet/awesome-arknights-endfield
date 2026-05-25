import { useEffect, useState } from 'react';
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

  const applyTheme = (updater: (prev: 'light' | 'dark') => 'light' | 'dark') => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setThemeState(updater);
      });
    } else {
      setThemeState(updater);
    }
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    applyTheme(() => newTheme);
  };

  const toggleTheme = () => {
    applyTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
