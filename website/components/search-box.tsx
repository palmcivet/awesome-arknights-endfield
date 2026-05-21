import { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProjects } from '@/context/project-context';
import { useLanguage } from '@/context/language-context';
import { useI18nContext } from '@/i18n/i18n-react.js';
import type { Category } from '@/shared';
import { CATEGORY_LABEL } from '@/shared';

interface SearchBoxProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function SearchBox({ onVisibilityChange }: SearchBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const el = ref.current;
    if (!el || !onVisibilityChange) return;
    const observer = new IntersectionObserver(
      ([entry]) => onVisibilityChange(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisibilityChange]);

  return (
    <div ref={ref} id="projects" className="mb-6 flex items-center gap-3 scroll-mt-20">
      {/* Search input */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={LL.search.placeholder()}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {hasFilters && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={clearFilters}
            className="absolute right-1 top-1/2 -translate-y-1/2"
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
          <SelectTrigger className="h-9 w-32 shrink-0 border-border text-xs">
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
  );
}
