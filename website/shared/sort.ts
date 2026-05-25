import type { TranslationFunctions } from '@/i18n/i18n-types.js';

export type SortOption = 'newest' | 'name';

export const SORT_OPTIONS: Array<SortOption> = ['newest', 'name'];

export function getSortLabel(
  option: SortOption,
  sort: TranslationFunctions['sort']
): string {
  switch (option) {
    case 'newest':
      return sort.newest();
    case 'name':
      return sort.name();
  }
}
