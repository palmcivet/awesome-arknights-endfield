import { Search, X } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProjects } from '@/hooks/use-projects';
import { useLanguage } from '@/hooks/use-language';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { ENDFIELD_REPOSITORY_URL } from '@/shared/constants';
import type { Category } from '@/shared';
import { CATEGORY_LABEL } from '@/shared';
import Logo from '@/assets/logo.svg';

interface NavigationProps {
  showSearch?: boolean;
}

export default function Navigation({ showSearch = false }: NavigationProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    selectCategory,
    clearFilters,
    categories,
  } = useProjects();
  const { language } = useLanguage();
  const { LL } = useI18nContext();

  const hasFilters = searchQuery.trim() !== '' || selectedCategory !== null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-nav max-w-6xl items-center px-container-px md:px-container-px-md">
        {/* Left: Logo — always visible, never moves */}
        <div className="hidden w-sidebar shrink-0 items-center gap-2.5 lg:flex">
          <a
            className="flex shrink-0 items-center gap-2.5"
            href="/"
            aria-label="Home"
          >
            <img src={Logo} alt="" className="h-5 opacity-80" />
            <span className="label-tech text-foreground/80">Arknights Endfield</span>
          </a>
        </div>
        {/* Mobile logo */}
        <a
          className="flex shrink-0 items-center gap-2.5 lg:hidden"
          href="/"
          aria-label="Home"
        >
          <img src={Logo} alt="" className="h-5 opacity-80" />
          <span className="label-tech text-foreground/80 hidden sm:inline">
            Arknights Endfield
          </span>
        </a>

        {/* Center: Search input — slides up into place */}
        <div
          className={`flex flex-1 items-center gap-3 transition-[opacity,transform] duration-250 lg:pl-layout-gap ${
            showSearch
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={LL.search.placeholder()}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
              tabIndex={showSearch ? 0 : -1}
            />
            {hasFilters && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={clearFilters}
                className="absolute right-1 top-1/2 -translate-y-1/2"
                tabIndex={showSearch ? 0 : -1}
              >
                <X className="size-3.5" />
              </Button>
            )}
          </div>

          {/* Mobile category select */}
          <div className="lg:hidden">
            <Select
              value={selectedCategory ?? ''}
              onValueChange={(value) => selectCategory(value as Category)}
            >
              <SelectTrigger className="h-9 w-28 shrink-0 border-border text-xs">
                <SelectValue placeholder={LL.search.category()} />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => cat !== 'Uncategorized')
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {CATEGORY_LABEL[category as Category]?.[language] ?? category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right: Links — always visible, never moves */}
        <div className="flex shrink-0 items-center">
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
          <LanguageSwitcher />
          <div className="mx-1 h-4 w-px bg-border" />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
