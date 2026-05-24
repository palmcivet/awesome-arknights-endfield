import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useI18nContext } from '@/i18n/i18n-react.js';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { LL } = useI18nContext();

  return (
    <button
      onClick={toggleTheme}
      className="label-tech cursor-pointer flex items-center gap-1.5 px-2 py-2 text-muted-foreground transition-colors hover:text-foreground lg:px-3"
      aria-label={theme === 'light' ? LL.theme.switchToDark() : LL.theme.switchToLight()}
    >
      {theme === 'light' ? (
        <Moon className="size-4 lg:size-3.5" />
      ) : (
        <Sun className="size-4 lg:size-3.5" />
      )}
      <span className="hidden lg:inline">
        {theme === 'light' ? LL.theme.dark() : LL.theme.light()}
      </span>
    </button>
  );
}
