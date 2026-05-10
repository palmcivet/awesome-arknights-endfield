import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="label-tech cursor-pointer flex items-center gap-1.5 px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
