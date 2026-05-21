import { useState, useCallback, type ReactNode } from 'react';
import { DrawerContext } from '@/hooks/use-drawer';

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
    <DrawerContext.Provider
      value={{ isOpen, selectedProjectId, openDrawer, closeDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
