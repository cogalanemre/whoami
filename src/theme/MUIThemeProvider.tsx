"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";
import { ReactNode } from "react";
import config from "@/config/config.json";

interface MUIThemeProviderProps {
  children: ReactNode;
}

export default function MUIThemeProvider({ children }: MUIThemeProviderProps) {
  const { isDarkMode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? config.theme.colors.dark.primary : config.theme.colors.light.primary,
      },
      background: {
        default: isDarkMode ? config.theme.colors.dark.background : config.theme.colors.light.background,
        paper: isDarkMode ? config.theme.colors.dark.surface : config.theme.colors.light.surface,
      },
      text: {
        primary: isDarkMode ? config.theme.colors.dark.secondary : config.theme.colors.light.secondary,
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
} 