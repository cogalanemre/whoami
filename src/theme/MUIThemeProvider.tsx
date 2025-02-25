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
        main: config.theme.color,
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
} 