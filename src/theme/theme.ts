'use client';

import { ThemeOptions } from '@mui/material/styles';
import config from '@/config/config.json';

// Sabit tema değerleri
export const COMMON_COLORS = {
  background: {
    light: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    dark: {
      default: '#0C1018',
      paper: '#121213',
    },
  },
  text: {
    light: {
      primary: '#212121',
      secondary: '#616161',
    },
    dark: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  divider: {
    light: '#E0E0E0',
    dark: '#424242',
  },
} as const;

export const THEME_STYLE = {
  CARD: {
    border: '0.5px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    position: 'relative',
    height: '100%',
    boxShadow: 'none',
    backgroundImage: 'none',
  },
  AVATAR: {
    border: '0.5px solid',
    borderColor: 'divider',
    width: 80,
    height: 80,
    bgcolor: 'transparent',
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      objectFit: 'cover',
      borderRadius: '50%',
    },
  },
  CHIP: {
    border: '0.5px solid',
    borderColor: 'divider',
    fontSize: '0.875rem',
    color: 'text.main',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      bgcolor: 'background.paper',
      borderColor: 'primary.main',
    },
    '&.selected': {
      bgcolor: 'primary.main',
      color: 'white',
      borderColor: 'primary.main',
    },
  },
  BORDER: {
    border: '0.5px solid',
    borderColor: 'divider',
  },
  BORDER_BOTTOM: {
    borderBottom: '0.5px solid',
    borderColor: 'divider',
  },
  TITLE: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  SUBTITLE: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'primary.main',
  },
  META: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 1, sm: 2 },
    mt: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  CARD_HEADER: {
    borderBottom: '0.5px solid',
  borderColor: 'divider',
    p: 3,
  },
  SECTION: {
    component: 'section',
    py: 5,
  },
} as const;

/**
 * Tema konfigürasyonu
 */
const theme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: config.theme.primaryColor,
    },
    divider: COMMON_COLORS.divider.light,
    background: COMMON_COLORS.background.light,
    text: COMMON_COLORS.text.light,
  },
} as const;

export default theme;
