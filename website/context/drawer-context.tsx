import { useState, useCallback, useMemo, type ReactNode } from 'react';
import { DrawerContext } from '@/hooks/use-drawer';

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const isOpen = selectedProjectId !== null;

  const openDrawer = useCallback((projectId: number) => {
    setSelectedProjectId(projectId);
  }, []);

  const closeDrawer = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, selectedProjectId, openDrawer, closeDrawer }),
    [isOpen, selectedProjectId, openDrawer, closeDrawer]
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}
