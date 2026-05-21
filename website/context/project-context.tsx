import { useState, useMemo, type ReactNode } from 'react';
import { CATEGORIES, type Category } from '@/shared';
import projectsData from '@data/LIST.json';
import { filterValidProjects } from '@/helpers';
import { ProjectContext } from '@/hooks/use-projects';

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
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
