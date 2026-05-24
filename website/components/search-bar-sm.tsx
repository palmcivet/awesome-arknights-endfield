import { useState } from 'react';
import { ArrowDownUp, Check, ChevronDown, LayoutGrid } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
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

        {/* Results count — fades in when expanded */}
        <span
          className={`ml-2 block w-10 shrink-0 truncate text-right font-mono text-[10px] text-muted-foreground transition-opacity duration-200 ${expanded ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {filteredProjects.length}/{projects.length}
        </span>

        {/* Category & Sort — slide out when expanded */}
        <div
          className={`flex shrink-0 items-center overflow-hidden transition-all duration-250 ease-out ${expanded ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'}`}
        >
          {/* Category select */}
          <SelectPrimitive.Root
            value={selectedCategory ?? ''}
            onValueChange={(value) => selectCategory(value as Category)}
          >
            <SelectPrimitive.Trigger
              className="label-tech ml-2 flex cursor-pointer items-center gap-1 border-0 bg-transparent px-2 py-2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
              aria-label={LL.search.category()}
            >
              <LayoutGrid className="size-4" />
              <ChevronDown className="size-3 opacity-50" />
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content
                className="z-60 min-w-36 overflow-hidden border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                position="popper"
                sideOffset={8}
              >
                <SelectPrimitive.Viewport className="p-1">
                  {categories
                    .filter((cat) => cat !== 'Uncategorized')
                    .map((category) => (
                      <SelectPrimitive.Item
                        key={category}
                        value={category}
                        className="relative flex cursor-default select-none items-center py-1.5 pl-7 pr-3 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                      >
                        <span className="absolute left-2 flex size-3.5 items-center justify-center">
                          <SelectPrimitive.ItemIndicator>
                            <Check className="size-3" />
                          </SelectPrimitive.ItemIndicator>
                        </span>
                        <SelectPrimitive.ItemText>
                          {CATEGORY_LABEL[category as Category]?.[language] ?? category}
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))}
                </SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>

          {/* Sort select */}
          <SelectPrimitive.Root
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectPrimitive.Trigger
              className="label-tech flex cursor-pointer items-center gap-1 border-0 bg-transparent px-2 py-2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
              aria-label={getSortLabel(sortBy, LL.sort)}
            >
              <ArrowDownUp className="size-4" />
              <ChevronDown className="size-3 opacity-50" />
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content
                className="z-60 min-w-28 overflow-hidden border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                position="popper"
                sideOffset={8}
              >
                <SelectPrimitive.Viewport className="p-1">
                  {SORT_OPTIONS.map((option) => (
                    <SelectPrimitive.Item
                      key={option}
                      value={option}
                      className="relative flex cursor-default select-none items-center py-1.5 pl-7 pr-3 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                    >
                      <span className="absolute left-2 flex size-3.5 items-center justify-center">
                        <SelectPrimitive.ItemIndicator>
                          <Check className="size-3" />
                        </SelectPrimitive.ItemIndicator>
                      </span>
                      <SelectPrimitive.ItemText>
                        {getSortLabel(option, LL.sort)}
                      </SelectPrimitive.ItemText>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
        </div>
      </div>
    </div>
  );
}
