"use client";

import { ThemeOptions, Theme } from "@mui/material/styles";
import config from "@/config/config.json";

// Sabit tema değerleri
export const COMMON_COLORS = {
  background: {
    light: {
      default: '#F7F8FC',
      paper: '#FDFDFD',
    },
    dark: {
      default: '#0C1018',
      paper: '#060607',
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
} as const;

const BORDER = {
  border: '0.5px solid',
  borderColor: (theme: Theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.300',
} as const;

export const THEME_STYLE = {
  CARD: {
    ...BORDER,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    position: "relative",
    height: "100%",
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)',
    p: 2,
  },
  CHIP: {
    ...BORDER,
    fontSize: "0.875rem",
    color: "text.main",
    bgcolor: "background.paper",
    borderRadius: '8px',
  },
  BORDER: {
    ...BORDER,
  }
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
  },
} as const;

export default theme; 