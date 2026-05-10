import { Search, X } from 'lucide-react';
import { useProjects } from '@/context/project-context';

export default function SearchBox() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    clearFilters,
    categories,
    filteredProjects,
    projects,
  } = useProjects();

  const hasFilters = searchQuery.trim() !== '' || selectedCategories.size > 0;

  return (
    <section id="projects" className="mx-auto max-w-6xl border-b px-6 py-8">
      <div className="space-y-6">
        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="absolute left-0 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects..."
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

        {/* Category filters + count */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="label-tech text-muted-foreground">
            {filteredProjects.length}/{projects.length}
          </span>

          <div className="h-4 w-px bg-border" />

          {categories
            .filter((cat) => cat !== 'Uncategorized')
            .map((category) => {
              const isSelected = selectedCategories.has(category);

              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`label-tech cursor-pointer select-none transition-colors ${
                    isSelected
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isSelected && <span className="mr-1">&bull;</span>}
                  {category}
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
}
