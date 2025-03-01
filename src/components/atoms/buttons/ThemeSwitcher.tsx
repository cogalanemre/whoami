"use client";

import { Box } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";
import MaterialUISwitch from "./MaterialUISwitch";

/**
 * Tema Değiştirici Bileşeni
 * 
 * Açık/koyu tema geçişini sağlayan animasyonlu switch buton.
 * 
 * @component
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * ```
 */
export default function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <MaterialUISwitch
        checked={isDarkMode}
        onChange={toggleTheme}
      />
    </Box>
  );
} 