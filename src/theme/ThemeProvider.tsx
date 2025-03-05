"use client";

import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { theme } from "./theme";

interface AppThemeProviderProps {
  children: ReactNode;
}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { isDarkMode } = useThemeContext();

  const customTheme = createTheme(theme(isDarkMode));

  return <MUIThemeProvider theme={customTheme}>{children}</MUIThemeProvider>;
} 