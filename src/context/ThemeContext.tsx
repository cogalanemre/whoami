import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import config from "@/config/config.json";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = "theme-preference";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): boolean => {
  try {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme === "dark";
      }
    }
  } catch (error) {
    console.warn("localStorage is not available:", error);
  }
  return config.theme.default === "dark";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(config.theme.default === "dark");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setIsDarkMode(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
      } catch (error) {
        console.warn("Failed to save theme preference:", error);
      }
    }
  }, [isDarkMode, isInitialized]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
