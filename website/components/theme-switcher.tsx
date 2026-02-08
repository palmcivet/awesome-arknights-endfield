import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 border border-border/50 bg-muted/30 backdrop-blur-sm">
      {/* Light mode tab */}
      <button
        onClick={() => setTheme('light')}
        className={`group relative flex items-center gap-1.5 px-3 py-2 text-xs transition-all duration-300 ${
          theme === 'light'
            ? 'bg-primary/10 text-primary'
            : 'cursor-pointer text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        }`}
        aria-label="Switch to light mode"
        aria-pressed={theme === 'light'}
      >
        <Sun className="h-3.5 w-3.5" />
        <span className="font-mono uppercase tracking-widest">LIGHT</span>
        {theme === 'light' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
        )}
      </button>

      {/* Divider */}
      <div className="h-4 w-px bg-border" />

      {/* Dark mode tab */}
      <button
        onClick={() => setTheme('dark')}
        className={`group relative flex items-center gap-1.5 px-3 py-2 text-xs transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-primary/10 text-primary'
            : 'cursor-pointer text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        }`}
        aria-label="Switch to dark mode"
        aria-pressed={theme === 'dark'}
      >
        <Moon className="h-3.5 w-3.5" />
        <span className="font-mono uppercase tracking-widest">DARK</span>
        {theme === 'dark' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
        )}
      </button>
    </div>
  );
}
