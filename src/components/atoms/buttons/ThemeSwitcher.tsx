"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeContext } from "@/context/ThemeContext";
import ToggleButton from "./ToggleButton";

/**
 * Tema Değiştirici Bileşeni
 * 
 * Açık/koyu tema geçişini sağlayan animasyonlu toggle buton.
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
    <ToggleButton
      buttons={[
        { Icon: DarkMode, isActive: isDarkMode },
        { Icon: LightMode, isActive: !isDarkMode }
      ]}
      onClick={toggleTheme}
      position={{ top: 20, right: 20 }}
    />
  );
} 