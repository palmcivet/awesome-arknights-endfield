import { createContext, useContext } from 'react';

export interface DrawerContextValue {
  isOpen: boolean;
  selectedProjectId: number | null;
  openDrawer: (projectId: number) => void;
  closeDrawer: () => void;
}

export const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}
