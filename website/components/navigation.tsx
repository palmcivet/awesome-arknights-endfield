import { Github } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.svg';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo/Brand */}
        <a className="flex items-center gap-2" href="/" aria-label="Home">
          <img src={Logo} alt="Awesome Endfield" className="h-8" />
          <div className="ml-2">
            <span className="text-md font-semibold leading-none">Arknights Endfield</span>
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" asChild>
            <a
              href="https://github.com/HetmesAskalana/awesome-arknights-endfield"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
            >
              <Github className="size-4" />
            </a>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
