import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import config from '@/config/config.json';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'theme-preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): boolean => {
  try {
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme === 'dark';
      }

      // Sistem temasını kontrol et
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark;
    }
  } catch (error) {
    console.warn('localStorage is not available:', error);
  }
  return config.theme.mode === 'dark';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(config.theme.mode === 'dark');
  const [isInitialized, setIsInitialized] = useState(false);

  // Sayfa yüklendiğinde flash'ı önle
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setIsDarkMode(initialTheme);

    // HTML'e tema class'ını ekle
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme ? 'dark' : 'light');

    // Body'ye loaded class'ını ekle
    document.body.classList.add('loaded');

    setIsInitialized(true);
  }, []);

  // Tema değiştiğinde HTML class'ını güncelle
  useEffect(() => {
    if (isInitialized) {
      try {
        const themeMode = isDarkMode ? 'dark' : 'light';
        window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);

        // HTML class'ını güncelle
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(themeMode);
      } catch (error) {
        console.warn('Failed to save theme preference:', error);
      }
    }
  }, [isDarkMode, isInitialized]);

  // Sistem teması değişikliğini dinle
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
