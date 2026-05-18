import { useProjects } from '@/context/project-context';
import { useLanguage } from '@/context/language-context';
import { useI18nContext } from '@/i18n/i18n-react.js';
import type { Category } from '@/shared';
import { CATEGORY_LABEL } from '@/shared';

export default function CategorySidebar() {
  const {
    selectedCategory,
    selectCategory,
    clearFilters,
    categories,
    filteredProjects,
    projects,
    searchQuery,
  } = useProjects();

  const hasFilters = searchQuery.trim() !== '' || selectedCategory !== null;
  const { language } = useLanguage();
  const { LL } = useI18nContext();

  return (
    <aside className="hidden w-44 shrink-0 lg:block">
      <nav className="sticky top-20 space-y-1 py-2">
        <div className="mb-3 flex items-center justify-between">
          <span className="label-tech text-muted-foreground">
            {filteredProjects.length}/{projects.length}
          </span>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="label-tech text-muted-foreground transition-colors hover:text-foreground"
            >
              {LL.sidebar.clear()}
            </button>
          )}
        </div>

        {categories
          .filter((cat) => cat !== 'Uncategorized')
          .map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => selectCategory(category as Category)}
                className={`label-tech flex w-full cursor-pointer select-none items-center gap-2 py-1.5 text-left transition-colors ${
                  isSelected
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span
                  className={`inline-block size-1.5 rounded-full ${
                    isSelected ? 'bg-foreground' : 'bg-transparent'
                  }`}
                />
                {CATEGORY_LABEL[category as Category]?.[language] ?? category}
              </button>
            );
          })}
      </nav>
    </aside>
  );
}
