"use client";

import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";
import { ReactNode } from "react";
import theme, { COMMON_COLORS } from "./theme";

interface AppThemeProviderProps {
  children: ReactNode;
}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { isDarkMode } = useThemeContext();
  const customTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? COMMON_COLORS.background.dark.default : COMMON_COLORS.background.light.default,
        paper: isDarkMode ? COMMON_COLORS.background.dark.paper : COMMON_COLORS.background.light.paper,
      },
      text: isDarkMode ? COMMON_COLORS.text.dark : COMMON_COLORS.text.light,
      divider: isDarkMode ? COMMON_COLORS.divider.dark : COMMON_COLORS.divider.light,
    },
  });

  return (
    <MUIThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
} 