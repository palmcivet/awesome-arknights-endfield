import { useEffect, useRef } from 'react';
import { SearchInput } from '@/components/search-input';
import { useProjects } from '@/hooks/use-projects';
import { useI18nContext } from '@/i18n/i18n-react.js';
import { SORT_OPTIONS, getSortLabel } from '@/shared/sort';

interface SearchBoxLgProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function SearchBoxLg({ onVisibilityChange }: SearchBoxLgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { searchQuery, setSearchQuery, sortBy, setSortBy } = useProjects();

  const { LL } = useI18nContext();

  const hasFilters = searchQuery.trim() !== '';

  useEffect(() => {
    const el = ref.current;
    if (!el || !onVisibilityChange) return;

    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;

    const observer = new IntersectionObserver(
      ([entry]) => onVisibilityChange(entry.isIntersecting),
      { threshold: 0, rootMargin: `-${navHeight}px 0px 0px 0px` }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisibilityChange]);

  return (
    <div
      ref={ref}
      className="mb-6 hidden items-center gap-3 scroll-mt-sticky-offset lg:flex"
    >
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={LL.search.placeholder()}
        hasFilters={hasFilters}
        onClear={() => setSearchQuery('')}
        className="max-w-md"
      />

      <div className="ml-auto flex items-center gap-1">
        {SORT_OPTIONS.map((option, i) => (
          <span key={option} className="flex items-center">
            {i > 0 && <span className="px-1 text-[10px] text-foreground/60">·</span>}
            <button
              type="button"
              onClick={() => setSortBy(option)}
              className={`label-tech transition-[color] cursor-pointer ${
                sortBy === option
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground/70'
              }`}
              aria-pressed={sortBy === option}
            >
              {getSortLabel(option, LL.sort)}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
