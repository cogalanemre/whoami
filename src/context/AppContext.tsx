'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { CvFile } from '@/utils/getCvFiles';

// Context için tip tanımlamaları
interface AppContextType {
  lang: 'tr' | 'en';
  cvFiles: CvFile[];
}

// Context oluşturma
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context kullanımı için özel hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Provider bileşeni
interface AppProviderProps {
  children: ReactNode;
  lang: 'tr' | 'en';
  cvFiles: CvFile[];
}

export function AppProvider({ children, lang, cvFiles }: AppProviderProps) {
  return (
    <AppContext.Provider value={{ lang, cvFiles }}>
      {children}
    </AppContext.Provider>
  );
} 