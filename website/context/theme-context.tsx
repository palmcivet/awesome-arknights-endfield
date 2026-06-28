import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';
import { ThemeContext, type Theme } from '@/hooks/use-theme';

const STORAGE_KEY = 'theme';

type Appearance = 'auto' | 'light' | 'dark';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function useSystemDark() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    () => false
  );
}

function updateDOM(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearanceRaw] = useState<Appearance>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Appearance | null;
    return stored || 'auto';
  });

  const appearanceRef = useRef(appearance);

  useEffect(() => {
    appearanceRef.current = appearance;
  }, [appearance]);

  const setAppearance = useCallback((next: Appearance) => {
    localStorage.setItem(STORAGE_KEY, next);
    setAppearanceRaw(next);
  }, []);

  const systemDark = useSystemDark();
  const theme: Theme =
    appearance === 'auto' ? (systemDark ? 'dark' : 'light') : appearance;

  useEffect(() => {
    updateDOM(theme);
  }, [theme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      const apply = () => {
        setAppearance(newTheme === getSystemTheme() ? 'auto' : newTheme);
      };
      if (document.startViewTransition) {
        document.startViewTransition(apply);
      } else {
        apply();
      }
    },
    [setAppearance]
  );

  const toggleTheme = useCallback(() => {
    const apply = () => {
      const sys = getSystemTheme();
      const current = appearanceRef.current === 'auto' ? sys : appearanceRef.current;
      const next = current === 'light' ? 'dark' : 'light';
      setAppearance(next === sys ? 'auto' : next);
    };
    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, [setAppearance]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
