import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="space-y-6">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, tools, and resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-11 pr-20 text-base"
          />
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X className="mr-1 size-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Category filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Categories</h3>
            <span className="text-sm text-muted-foreground">
              {filteredProjects.length} of {projects.length} projects
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories
              .filter((cat) => cat !== 'Uncategorized')
              .map((category) => {
                const isSelected = selectedCategories.has(category);
                const count = projects.filter((p) => p.category === category).length;

                return (
                  <Badge
                    key={category}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer select-none px-3 py-1.5 text-sm transition-all hover:scale-102"
                    onClick={() => toggleCategory(category)}
                  >
                    {category} ({count})
                  </Badge>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
