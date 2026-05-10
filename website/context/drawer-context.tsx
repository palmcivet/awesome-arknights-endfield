import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface DrawerContextValue {
  isOpen: boolean;
  selectedProjectId: number | null;
  openDrawer: (projectId: number) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const isOpen = selectedProjectId !== null;

  const openDrawer = useCallback((projectId: number) => {
    setSelectedProjectId(projectId);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDrawer = useCallback(() => {
    setSelectedProjectId(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <DrawerContext.Provider value={{ isOpen, selectedProjectId, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}
