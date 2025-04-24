'use client';

import { Box } from '@mui/material';
import { useThemeContext } from '@/context/ThemeContext';
import MaterialUISwitch from './MaterialUISwitch';
import { STYLE } from '@/styles/common/ThemeSwitcher.styles';

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
    <Box sx={STYLE.CONTAINER}>
      <MaterialUISwitch checked={isDarkMode} onChange={toggleTheme} type="theme" />
    </Box>
  );
}
