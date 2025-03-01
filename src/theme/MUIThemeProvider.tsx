"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";
import { ReactNode } from "react";
import config from "@/config/config.json";

// Sabit tema değerleri
const COMMON_COLORS = {
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
};

// Kart stilleri
const CARD_STYLES = {
  border: '0.5px solid',
  borderColor: 'rgba(128, 128, 128, 0.2)',
  bgcolor: 'background.paper',
  borderRadius: "16px",
  position: "relative" as const,
  height: "100%",
  transition: "all 0.3s ease-in-out",
  '&:hover': {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
};

// Input stilleri
const INPUT_STYLES = {
  transition: 'all 0.2s ease-in-out',
  '&::before': {
    borderBottom: '2px solid',
    borderColor: 'primary.main',
  },
  '&::after': {
    borderBottom: '2px solid',
    borderColor: 'primary.main',
  },
  '&:hover:not(.Mui-disabled)::before': {
    borderColor: 'primary.main',
  },
};

interface MUIThemeProviderProps {
  children: ReactNode;
}

export default function MUIThemeProvider({ children }: MUIThemeProviderProps) {
  const { isDarkMode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: config.theme.color,
      },
      ...COMMON_COLORS,
      background: {
        default: isDarkMode ? '#0B1018' : '#ffffff',
        paper: isDarkMode ? '#121418' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
        secondary: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
        disabled: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)',
      },
      divider: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            '&&': {
              ...CARD_STYLES,
              '& .MuiCardHeader-root': {
                padding: '24px',
                backdropFilter: 'blur(4px)',
              },
              '& .MuiCardHeader-title': {
                color: 'text.primary',
                fontWeight: 'bold',
              },
              '& .MuiCardContent-root': {
                padding: '24px',
                display: "flex",
                flexDirection: "column",
                gap: 4,
                '& .section': {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                '&.social-content': {
                  gap: 3,
                  '& .social-link': {
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    '&:hover': {
                      '& .MuiTypography-root': {
                        color: 'text.primary',
                      },
                      '& svg': {
                        color: 'primary.main',
                      }
                    }
                  }
                },
                '&.message-form': {
                  gap: 3,
                  '& .MuiFormControl-root': {
                    marginBottom: 2,
                  }
                }
              },
              '& .MuiCardActions-root': {
                padding: '24px',
                '&.message-actions': {
                  paddingTop: 0,
                }
              },
            },
          },
        },
        defaultProps: {
          elevation: 0,
          variant: 'outlined',
        },
      },
      MuiInput: {
        styleOverrides: {
          root: INPUT_STYLES,
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'text.secondary',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: 'text.primary',
            padding: '8px 0',
            fontSize: '1rem',
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 0.5,
            },
          },
          multiline: {
            padding: '8px 0',
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
} 