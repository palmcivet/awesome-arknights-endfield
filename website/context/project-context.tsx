import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { CATEGORIES, type Category } from '@/shared';
import projectsData from '@data/LIST.json';
import { filterValidProjects } from '@/helpers';
import { ProjectContext } from '@/hooks/use-projects';
import { SORT_OPTIONS, type SortOption } from '@/shared/sort';

function getCategoryFromURL(): Category | null {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (category && (CATEGORIES as ReadonlyArray<string>).includes(category)) {
    return category as Category;
  }
  return null;
}

function getSortFromURL(): SortOption {
  const params = new URLSearchParams(window.location.search);
  const sort = params.get('sort');
  if (sort && (SORT_OPTIONS as ReadonlyArray<string>).includes(sort)) {
    return sort as SortOption;
  }
  return 'newest';
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

function updateSortInURL(sort: SortOption) {
  const url = new URL(window.location.href);
  if (sort === 'newest') {
    url.searchParams.delete('sort');
  } else {
    url.searchParams.set('sort', sort);
  }
  window.history.replaceState(null, '', url.toString());
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    getCategoryFromURL
  );
  const [sortBy, setSortByState] = useState<SortOption>(getSortFromURL);

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

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
        break;
      case 'name':
        sorted.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        );
        break;
    }

    return sorted;
  }, [projects, searchQuery, selectedCategory, sortBy]);

  const selectCategory = useCallback((category: Category | null) => {
    setSelectedCategory((prev) => {
      const next = prev === category ? null : category;
      updateCategoryInURL(next);
      return next;
    });
  }, []);

  const setSortBy = useCallback((sort: SortOption) => {
    setSortByState(sort);
    updateSortInURL(sort);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSortByState('newest');
    updateCategoryInURL(null);
    updateSortInURL('newest');
  }, []);

  const value = useMemo(
    () => ({
      projects,
      filteredProjects,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      selectCategory,
      sortBy,
      setSortBy,
      clearFilters,
      categories: CATEGORIES,
    }),
    [
      projects,
      filteredProjects,
      searchQuery,
      selectedCategory,
      sortBy,
      selectCategory,
      setSortBy,
      clearFilters,
    ]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
