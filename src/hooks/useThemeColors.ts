import { useTheme } from '@mui/material';
import config from '@/config/config.json';

export interface ThemeColors {
  background: string;
  surface: string;
  secondary: string;
  primary: string;
}

export function useThemeColors() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  const colors: ThemeColors = isDarkMode 
    ? config.theme.colors.dark 
    : config.theme.colors.light;

  return colors;
} 