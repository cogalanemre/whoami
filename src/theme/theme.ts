'use client';

import { ThemeOptions } from '@mui/material/styles';
import config from '@/config/config.json';

// Tema sabitleri
export const THEME_CONSTANTS = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  border: {
    thin: '0.5px',
    medium: '1px',
    thick: '2px',
  },
  transition: {
    fast: '0.2s',
    medium: '0.3s',
    slow: '0.5s',
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    round: '50%',
  },
  boxShadow: {
    light: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    dark: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  animation: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.8,
    },
  },
  layout: {
    pagePadding: {
      mobile: 2,
      desktop: 4,
    },
    container: {
      maxWidth: {
        mobile: '100%',
        tablet: '90%',
        desktop: '85%',
      },
      padding: {
        xs: 2,
        sm: 3,
        md: 4,
      },
      spacing: {
        xs: 4,
        sm: 6,
        md: 8,
      },
    },
  },
  components: {
    avatar: {
      large: 300,
      medium: 100,
      small: 60,
    },
    borderRadius: {
      small: 6,
      medium: 8,
      large: 12,
    },
    skeleton: {
      height: {
        hero: 400,
        section: 300,
        contact: 250,
      },
    },
  },
} as const;

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
      primary: '#1A1A1A',
      secondary: '#4A4A4A',
    },
    dark: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
  },
  divider: {
    light: '#E0E0E0',
    dark: '#212121',
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
    color: 'divider',
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
  typography: {
    fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
        },
      },
    },
  },
} as const;

export default theme;
