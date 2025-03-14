"use client";

import { ThemeOptions, Palette, PaletteOptions } from "@mui/material/styles";
import config from "@/config/config.json";

// Sabit tema değerleri
export const COMMON_COLORS = {
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  border: {
    default: 'rgba(128, 128, 128, 0.2)',
    hover: 'rgba(128, 128, 128, 0.4)',
    disabled: 'rgba(128, 128, 128, 0.1)',
  },
  background: {
    light: '#ffffff',
    dark: {
      default: '#0B1018',
      paper: '#121418',
    },
  },
  text: {
    light: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    dark: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  divider: {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  },
  shadow: {
    default: 'rgba(0,0,0,0.1)',
    primary: 'rgba(0,0,0,0.2)',
  },
} as const;

/**
 * Tasarım Sistem Sabitleri
 * Tüm bileşenlerde kullanılan temel değerler
 */
export const DESIGN_TOKENS = {
  TRANSITIONS: {
    DEFAULT: "all 0.3s ease-in-out",
    FAST: "all 0.2s ease-in-out",
    HOVER: {
      transform: "translateY(-4px)",
      boxShadow: (shadow: string) => `0 4px 20px ${shadow}`,
    },
  },
  SPACING: {
    CARD: {
      PADDING: '24px',
      GAP: 4,
    },
    CHIP: {
      GAP: 1,
    },
  },
  TYPOGRAPHY: {
    BODY: {
      fontSize: "0.95rem",
      letterSpacing: "0.3px",
    },
    CHIP: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
  BORDER: {
    RADIUS: {
      DEFAULT: "16px",
      INPUT: "8px",
      CHIP: "7px",
      CARD: "16px",
    },
    COLORS: {
      default: COMMON_COLORS.border.default,
      hover: COMMON_COLORS.border.hover,
      disabled: COMMON_COLORS.border.disabled,
    },
    STYLES: {
      common: {
        default: {
          border: '0.5px solid',
          borderColor: COMMON_COLORS.border.default,
        },
        hover: {
          borderColor: COMMON_COLORS.border.hover,
        },
      },
      card: {
        default: {
          border: '0.5px solid',
          borderColor: COMMON_COLORS.border.default,
        },
        hover: {
          borderColor: COMMON_COLORS.border.hover,
        },
      },
      chip: {
        default: {
          border: '0.5px solid',
          borderColor: COMMON_COLORS.border.default,
        },
        hover: {
          borderColor: COMMON_COLORS.border.hover,
        },
      },
      input: {
        underline: {
          borderBottom: '1px solid',
          borderColor: COMMON_COLORS.border.default,
        },
        focused: {
          borderColor: 'primary.main',
        },
      },
    },
  },
  COMPONENTS: {
    CHIP: {
      selected: {
        bgcolor: "primary.main",
        color: "background.paper",
        borderColor: "primary.main",
        boxShadow: `0 4px 20px ${COMMON_COLORS.shadow.primary}`,
        transform: "translateY(-4px)",
      },
      default: {
        bgcolor: "background.paper",
        color: "text.primary",
        border: "0.5px solid",
        borderColor: COMMON_COLORS.border.default,
      },
    },
    AVATAR: {
      width: 80,
      height: 80,
      bgcolor: "transparent",
      border: "2px solid",
      borderColor: COMMON_COLORS.border.default,
      display: { xs: "none", md: "block" },
      "& img": {
        objectFit: "cover",
        borderRadius: "50%",
      },
    },
  },
} as const;

/**
 * Section stilleri
 * Tüm section'larda kullanılan ortak stiller
 */
export const SECTION_STYLES = {
  mt: { xs: 4, sm: 6, md: 8, lg: 10 },
} as const;

/**
 * Stack stilleri
 * Stack bileşenlerinde kullanılan ortak spacing değerleri
 */
export const STACK_STYLES = {
  spacing: { xs: 4, md: 6 },
} as const;

/**
 * Motion stilleri
 * Framer Motion animasyonları için ortak değerler
 */
export const MOTION_STYLES = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  container: {
    mb: { xs: 4, md: 6 },
    "&:last-child": {
      mb: 0,
    },
  },
} as const;

// Material-UI tema tiplerini genişletiyoruz
declare module '@mui/material/styles' {
  interface Palette {
    shadow: typeof COMMON_COLORS.shadow
  }
  interface PaletteOptions {
    shadow?: typeof COMMON_COLORS.shadow
  }
}

/**
 * Tema konfigürasyonu
 */
const theme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: config.theme.primaryColor,
    },
    shadow: COMMON_COLORS.shadow,
  },
} as const;

export default theme; 