import { createContext, useContext } from 'react';
import type { Project } from '@/shared';
import type { Category } from '@/shared';
import type { SortOption } from '@/shared/sort';

export interface ProjectContextValue {
  projects: Project[];
  filteredProjects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | null;
  selectCategory: (category: Category | null) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  clearFilters: () => void;
  categories: readonly Category[];
}

export const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
