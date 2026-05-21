import type { BaseTranslation } from '../i18n-types.js';

const en_US = {
  // Navigation
  nav: {
    github: 'GitHub',
  },

  // Hero section
  hero: {
    label: 'Community Resources',
    projectCount: '{count} Projects',
    titleLine1: 'Awesome',
    titleLine2: 'Arknights Endfield',
    description:
      'A curated collection of tools, resources, and community projects for Arknights: Endfield — maintained by the community.',
    explore: 'Explore',
    github: 'GitHub',
  },

  // Search
  search: {
    placeholder: 'Search projects...',
    category: 'Category',
  },

  // Category sidebar
  sidebar: {
    clear: 'Clear',
  },

  // Project card
  projectCard: {},

  // Project detail drawer
  drawer: {
    close: 'Close',
    index: 'No.',
    author: 'Author',
    added: 'Added',
    license: 'License',
    source: 'Source',
    repository: 'Repository',
    websites: 'Websites',
    openSource: 'Open Source',
    closedSource: 'Closed Source',
    noScreenshots: 'No screenshots',
  },

  // Project gallery
  gallery: {
    noResults: 'No projects found.',
    noResultsHint: 'Try adjusting your search or filters.',
  },

  // Footer
  footer: {
    contribute: 'Contribute',
    awesomeArknights: 'Awesome Arknights',
  },

  // Language switcher
  language: {
    label: 'Language',
  },

  // Theme switcher
  theme: {
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
    dark: 'Dark',
    light: 'Light',
  },
} satisfies BaseTranslation;

export default en_US;
