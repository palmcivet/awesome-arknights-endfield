import { Search, X } from 'lucide-react';
import { useProjects } from '@/context/project-context';
import { useLanguage } from '@/context/language-context';
import { useI18nContext } from '@/i18n/i18n-react.js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/shared';
import { CATEGORY_LABEL } from '@/shared';

export default function SearchBox() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    selectCategory,
    clearFilters,
    categories,
    filteredProjects,
    projects,
  } = useProjects();
  const { language } = useLanguage();
  const { LL } = useI18nContext();

  const hasFilters = searchQuery.trim() !== '' || selectedCategory !== null;

  return (
    <section
      id="projects"
      className="sticky top-14 z-40 border-b bg-background"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        {/* Search input */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-0 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder={LL.search.placeholder()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full border-b border-border bg-transparent pl-6 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Mobile category select */}
        <div className="lg:hidden">
          <Select
            value={selectedCategory ?? ''}
            onValueChange={(value) => selectCategory(value as Category)}
          >
            <SelectTrigger className="h-9 w-40 border-border text-xs">
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

        {/* Count */}
        <span className="label-tech hidden text-muted-foreground lg:inline">
          {filteredProjects.length}/{projects.length}
        </span>
      </div>
    </section>
  );
}
