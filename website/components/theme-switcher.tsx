import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-context';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="gap-2 font-mono text-xs tracking-widest uppercase border-border/50 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all relative overflow-hidden group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <>
          <Moon className="h-3.5 w-3.5 relative z-10" />
          <span className="relative z-10">[ DARK ]</span>
        </>
      ) : (
        <>
          <Sun className="h-3.5 w-3.5 relative z-10" />
          <span className="relative z-10">[ LIGHT ]</span>
        </>
      )}
      <div className="absolute inset-0 bg-primary/5 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
    </Button>
  );
}
