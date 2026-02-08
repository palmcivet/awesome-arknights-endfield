import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { Project } from '@/shared';
import { CATEGORIES, type Category } from '@/shared';
import projectsData from '@data/LIST.json';

interface ProjectContextValue {
  projects: Project[];
  filteredProjects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: Set<Category>;
  toggleCategory: (category: Category) => void;
  clearFilters: () => void;
  categories: readonly Category[];
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set());

  const projects = useMemo(() => projectsData as Project[], []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by categories
    if (selectedCategories.size > 0) {
      filtered = filtered.filter((project) =>
        selectedCategories.has(project.category as Category)
      );
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
  }, [projects, searchQuery, selectedCategories]);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories(new Set());
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        filteredProjects,
        searchQuery,
        setSearchQuery,
        selectedCategories,
        toggleCategory,
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
