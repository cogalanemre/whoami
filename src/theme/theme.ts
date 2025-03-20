"use client";

import { ThemeOptions, Theme } from "@mui/material/styles";
import config from "@/config/config.json";

// Sabit tema değerleri
export const COMMON_COLORS = {
  background: {
    light: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    dark: {
      default: '#0C1018',
      paper: '#060607',
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
    light: 'grey.300',
    dark: 'grey.900',
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
  },
  AVATAR: {
    ...BORDER,
    width: 80,
    height: 80,
    bgcolor: "transparent",
    display: { xs: "none", md: "flex" },
    alignItems: 'center',
    justifyContent: 'center',
    "& img": {
      objectFit: "cover",
      borderRadius: "50%",
    },
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
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 1, sm: 2 },
    mt: 1,
    flexWrap: "wrap",
    alignItems: "center",
  },
  CARD_HEADER: {
    ...BORDER,
    p: 3,
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
  },
} as const;

export default theme; 