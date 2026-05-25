import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/use-theme';
import { useI18nContext } from '@/i18n/i18n-react.js';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { LL } = useI18nContext();

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2 px-2 py-2 lg:px-3">
      <Sun
        className={`size-3.5 transition-[color] ${isDark ? 'text-muted-foreground/50' : 'text-foreground'}`}
        strokeWidth={1.5}
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label={isDark ? LL.theme.switchToLight() : LL.theme.switchToDark()}
      />
      <Moon
        className={`size-3.5 transition-[color] ${isDark ? 'text-foreground' : 'text-muted-foreground/50'}`}
        strokeWidth={1.5}
      />
    </div>
  );
}
