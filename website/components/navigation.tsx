import { GithubIcon } from '@/components/icons';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ENDFIELD_REPOSITORY_URL } from '@/shared/constants';
import Logo from '@/assets/logo.svg';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Left: Logo */}
        <a className="flex items-center gap-2.5" href="/" aria-label="Home">
          <img src={Logo} alt="" className="h-5 opacity-80" />
          <span className="label-tech text-foreground/80">Arknights Endfield</span>
        </a>

        {/* Right: Links */}
        <div className="flex items-center">
          <a
            href={ENDFIELD_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech flex items-center gap-1.5 px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-3.5" />
            GitHub
          </a>
          <div className="mx-1 h-4 w-px bg-border" />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
