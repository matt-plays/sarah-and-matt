'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SiteContent } from '@/types/content';

interface CMSContextValue {
  content: SiteContent;
  isEditing: boolean;
  updateField: (path: string, value: string) => void;
}

const CMSContext = createContext<CMSContextValue | null>(null);

interface CMSProviderProps {
  children: ReactNode;
  content: SiteContent;
  updateField: (path: string, value: string) => void;
}

export function CMSProvider({ children, content, updateField }: CMSProviderProps) {
  return (
    <CMSContext.Provider value={{ content, isEditing: true, updateField }}>
      {children}
    </CMSContext.Provider>
  );
}

/** Returns null when not inside a CMSProvider (i.e., on the public site). */
export function useCMS() {
  return useContext(CMSContext);
}
