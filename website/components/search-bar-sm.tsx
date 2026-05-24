import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
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
import type { Category } from '@/shared';
import { CATEGORY_LABEL } from '@/shared';

export default function SearchBarSm() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    selectCategory,
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

        {/* Trailing slot — results count or category select, never both */}
        <div
          className={`shrink-0 overflow-hidden transition-all duration-200 ${expanded ? 'ml-2 w-10' : 'ml-2 w-28'}`}
        >
          {expanded ? (
            <span className="block w-10 truncate text-right font-mono text-[10px] text-muted-foreground">
              {filteredProjects.length}/{projects.length}
            </span>
          ) : (
            <Select
              value={selectedCategory ?? ''}
              onValueChange={(value) => selectCategory(value as Category)}
            >
              <SelectTrigger className="h-9 w-28 border-border text-xs">
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
          )}
        </div>
      </div>
    </div>
  );
}
