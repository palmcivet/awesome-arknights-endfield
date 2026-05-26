import { GithubIcon } from '@/components/icons';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LanguageSwitcher } from '@/components/language-switcher';
import { SearchInput } from '@/components/search-input';
import { useProjects } from '@/hooks/use-projects';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { ENDFIELD_REPOSITORY_URL } from '@/shared/constants';
import Logo from '@/assets/logo.svg';

interface NavigationProps {
  showSearch?: boolean;
}

export default function Navigation({ showSearch = false }: NavigationProps) {
  const { searchQuery, setSearchQuery } = useProjects();
  const { LL } = useI18nContext();

  const hasFilters = searchQuery.trim() !== '';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-nav max-w-6xl items-center px-container-px md:px-container-px-md">
        {/* Left: Logo — desktop shows text, mobile shows icon only */}
        <div className="hidden w-sidebar shrink-0 items-center gap-2.5 lg:flex">
          <a className="flex shrink-0 items-center gap-2.5" href="/" aria-label="Home">
            <img src={Logo} alt="" className="h-5 opacity-80" />
            <span className="label-tech text-foreground/80">Arknights Endfield</span>
          </a>
        </div>
        {/* Mobile logo — icon only */}
        <a className="flex shrink-0 items-center lg:hidden" href="/" aria-label="Home">
          <img src={Logo} alt="" className="h-5 opacity-80" />
        </a>

        {/* Center: Search — desktop only, slides up into place */}
        <div
          className={`hidden lg:flex lg:flex-1 items-center gap-3 lg:pl-layout-gap transition-[opacity,transform] duration-250 ${
            showSearch
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={LL.search.placeholder()}
            hasFilters={hasFilters}
            onClear={() => setSearchQuery('')}
            tabIndex={showSearch ? 0 : -1}
            className="max-w-md"
          />
        </div>

        {/* Spacer on mobile to push right section */}
        <div className="flex-1 lg:hidden" />

        {/* Right: Links — icon-only on mobile, with text on desktop */}
        <div className="flex shrink-0 items-center">
          <LanguageSwitcher />
          <div className="mx-1 hidden h-4 w-px bg-border lg:block" />
          <ThemeSwitcher />
          <div className="mx-1 hidden h-4 w-px bg-border lg:block" />
          <a
            href={ENDFIELD_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-tech flex items-center gap-1.5 px-2 py-2 text-muted-foreground transition-[color] hover:text-foreground lg:px-3"
            aria-label="GitHub"
          >
            <GithubIcon className="size-4 lg:size-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
