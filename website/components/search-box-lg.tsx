import { useEffect, useRef } from 'react';
import { SearchInput } from '@/components/search-input';
import { useProjects } from '@/hooks/use-projects';
import { useI18nContext } from '@/i18n/i18n-react.js';

interface SearchBoxLgProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function SearchBoxLg({ onVisibilityChange }: SearchBoxLgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { searchQuery, setSearchQuery, selectedCategory, clearFilters } = useProjects();

  const { LL } = useI18nContext();

  const hasFilters = searchQuery.trim() !== '' || selectedCategory !== null;

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
      id="projects"
      className="mb-6 hidden items-center gap-3 scroll-mt-sticky-offset lg:flex"
    >
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={LL.search.placeholder()}
        hasFilters={hasFilters}
        onClear={clearFilters}
        className="max-w-md"
      />

      {/* Category select — only visible on lg when sidebar is hidden (not used currently since sidebar shows on lg) */}
    </div>
  );
}
