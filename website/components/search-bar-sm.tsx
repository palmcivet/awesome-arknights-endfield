import { useState } from 'react';
import { ArrowDownUp, LayoutGrid } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SearchInput } from '@/components/search-input';
import { useProjects } from '@/hooks/use-projects';
import { useLanguage } from '@/hooks/use-language';
import { useI18nContext } from '@/i18n/i18n-react.js';
import type { Category } from '@/shared';
import { CATEGORY_LABEL } from '@/shared';
import { SORT_OPTIONS, getSortLabel } from '@/shared/sort';
import type { SortOption } from '@/shared/sort';

export default function SearchBarSm() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    selectCategory,
    sortBy,
    setSortBy,
    categories,
    filteredProjects,
    projects,
  } = useProjects();
  const { language } = useLanguage();
  const { LL } = useI18nContext();
  const [focused, setFocused] = useState(false);

  const hasSearchQuery = searchQuery.trim() !== '';
  const expanded = focused || hasSearchQuery;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 min-w-xs border-t border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 pb-[env(safe-area-inset-bottom)] px-container-px lg:hidden">
      <div className="flex h-nav items-center">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={LL.search.placeholder()}
          hasFilters={hasSearchQuery}
          onClear={() => setSearchQuery('')}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {/* Results count — visible when expanded */}
        <div
          className={`flex shrink-0 items-center overflow-hidden transition-[max-width,opacity] duration-250 ease-out ${expanded ? 'max-w-20 opacity-100' : 'max-w-0 opacity-0'}`}
        >
          <span className="ml-2 whitespace-nowrap font-mono text-[10px] text-muted-foreground">
            {filteredProjects.length}/{projects.length}
          </span>
        </div>

        {/* Category & Sort — visible when not expanded */}
        <div
          className={`flex shrink-0 items-center overflow-hidden transition-[max-width,opacity] duration-250 ease-out ${expanded ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'}`}
        >
          {/* Category select */}
          <Select
            value={selectedCategory ?? ''}
            onValueChange={(value) => selectCategory(value as Category)}
          >
            <SelectTrigger
              variant="ghost"
              className="label-tech ml-2 gap-1 px-2 py-2"
              aria-label={LL.search.category()}
            >
              <LayoutGrid className="size-4" />
            </SelectTrigger>
            <SelectContent sideOffset={8} className="min-w-36">
              {categories
                .filter((cat) => cat !== 'Uncategorized')
                .map((category) => (
                  <SelectItem key={category} value={category}>
                    {CATEGORY_LABEL[category as Category]?.[language] ?? category}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Sort select */}
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger
              variant="ghost"
              className="label-tech gap-1 px-2 py-2"
              aria-label={getSortLabel(sortBy, LL.sort)}
            >
              <ArrowDownUp className="size-4" />
            </SelectTrigger>
            <SelectContent sideOffset={8} className="min-w-28">
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {getSortLabel(option, LL.sort)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
