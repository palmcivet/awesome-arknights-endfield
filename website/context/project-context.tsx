import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { Project } from '@/shared';
import { CATEGORIES, type Category } from '@/shared';
import projectsData from '@data/LIST.json';

interface ProjectContextValue {
  projects: Project[];
  filteredProjects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | null;
  selectCategory: (category: Category | null) => void;
  clearFilters: () => void;
  categories: readonly Category[];
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const projects = useMemo(() => projectsData as Project[], []);

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

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
