import { useState, useMemo, type ReactNode } from 'react';
import { CATEGORIES, type Category } from '@/shared';
import projectsData from '@data/LIST.json';
import { filterValidProjects } from '@/helpers';
import { ProjectContext } from '@/hooks/use-projects';

function getCategoryFromURL(): Category | null {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (category && (CATEGORIES as readonly string[]).includes(category)) {
    return category as Category;
  }
  return null;
}

function updateCategoryInURL(category: Category | null) {
  const url = new URL(window.location.href);
  if (category) {
    url.searchParams.set('category', category);
  } else {
    url.searchParams.delete('category');
  }
  window.history.replaceState(null, '', url.toString());
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    getCategoryFromURL
  );

  const projects = useMemo(() => filterValidProjects(projectsData), []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          Object.values(project.description).some((desc) =>
            desc.toLowerCase().includes(query)
          ) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          project.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [projects, searchQuery, selectedCategory]);

  const selectCategory = (category: Category | null) => {
    setSelectedCategory((prev) => {
      const next = prev === category ? null : category;
      updateCategoryInURL(next);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    updateCategoryInURL(null);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        filteredProjects,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        selectCategory,
        clearFilters,
        categories: CATEGORIES,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
