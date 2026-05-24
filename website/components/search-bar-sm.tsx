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

  const hasFilters = searchQuery.trim() !== '' || selectedCategory !== null;
  const hasSearchQuery = searchQuery.trim() !== '';

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] px-container-px lg:hidden">
      <div className="flex h-nav items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={LL.search.placeholder()}
          hasFilters={hasSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        {/* Results count — shows when filtering */}
        {hasFilters && (
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {filteredProjects.length}/{projects.length}
          </span>
        )}

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
  );
}
