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

/**
 * Ortak kenar çizgisi renkleri
 * Tüm input ve kartlarda kullanılan tutarlı renkler
 */
const BORDER_COLORS = {
  default: 'rgba(128, 128, 128, 0.2)',
  hover: 'rgba(128, 128, 128, 0.4)',
  disabled: 'rgba(128, 128, 128, 0.1)',
};

/**
 * Kart stilleri
 * Tüm kartlarda kullanılan temel stiller
 */
const CARD_STYLES = {
  border: '0.5px solid',
  borderColor: BORDER_COLORS.default,
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

/**
 * Temel input stilleri
 * MUI Input bileşenleri için ortak stiller
 */
const BASE_INPUT_STYLES = {
  transition: 'all 0.2s ease-in-out',
  borderRadius: "8px",
  fontSize: "0.95rem",
  letterSpacing: "0.3px",
};

/**
 * Alt çizgi stilleri
 * Standard variant input'lar için alt çizgi stilleri
 */
const UNDERLINE_STYLES = {
  '&::before': {
    borderBottom: '1px solid',
    borderColor: BORDER_COLORS.default,
  },
  '&::after': {
    borderBottom: '1px solid',
    borderColor: 'primary.main',
  },
  '&:hover:not(.Mui-disabled)::before': {
    borderBottom: '1px solid',
    borderColor: BORDER_COLORS.hover,
  },
  '&.Mui-focused::before': {
    borderBottom: '1px solid !important',
    borderColor: 'primary.main !important',
  },
};

/**
 * Form stilleri
 * Form içindeki alanların düzeni
 */
const FORM_STYLES = {
  display: "flex",
  flexDirection: "column",
  '& > .MuiTextField-root:not(:last-child)': {
    marginBottom: '24px',
  }
};

/**
 * Kart aksiyon stilleri
 * Tüm kart aksiyonlarında kullanılan ortak stiller
 */
const CARD_ACTIONS_STYLES = {
  padding: '24px',
  paddingTop: 0,
  justifyContent: 'flex-end',
  '& .MuiButton-root': {
    minWidth: 'auto',
  }
};

/**
 * Kart medya stilleri
 * Tüm kart medya bileşenlerinde kullanılan ortak stiller
 */
const CARD_MEDIA_STYLES = {
  width: "100%",
  height: "auto",
  aspectRatio: "16/9",
  objectFit: "cover",
};

/**
 * Section stilleri
 * Tüm section'larda kullanılan ortak stiller
 */
const SECTION_STYLES = {
  mt: { xs: 4, sm: 6, md: 8, lg: 10 },
};

/**
 * Stack stilleri
 * Stack bileşenlerinde kullanılan ortak spacing değerleri
 */
const STACK_STYLES = {
  spacing: { xs: 4, md: 6 },
};

/**
 * Motion stilleri
 * Framer Motion animasyonları için ortak değerler
 */
const MOTION_STYLES = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  container: {
    mb: { xs: 4, md: 6 },
    "&:last-child": {
      mb: 0,
    },
  },
};

interface MUIThemeProviderProps {
  children: ReactNode;
}

export default function MUIThemeProvider({ children }: MUIThemeProviderProps) {
  const { isDarkMode } = useThemeContext();

  const theme = createTheme({
    // Tema paleti
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
    // Bileşen özelleştirmeleri
    components: {
      // Kart bileşeni özelleştirmeleri
      MuiCard: {
        styleOverrides: {
          root: {
            '&&': {
              ...CARD_STYLES,
              '& .MuiCardHeader-root': {
                padding: '24px',
                backdropFilter: 'blur(4px)',
                '& .MuiCardHeader-title': {
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  lineHeight: 1.3,
                  transition: 'color 0.2s ease-in-out',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  '&:hover': {
                    color: 'text.primary',
                  }
                },
                '& .MuiCardHeader-subheader': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  marginTop: 1,
                },
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
                '&.message-form': FORM_STYLES,
                '&.blog-content': {
                  padding: '24px',
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 2,
                  '& .blog-title': {
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    lineHeight: 1.3,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    '&:hover': {
                      color: 'text.primary',
                    }
                  },
                  '& .blog-meta': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  },
                  '& .blog-description': {
                    fontSize: '0.9rem',
                    color: 'text.primary',
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }
                },
                '& .MuiCardMedia-root': {
                  ...CARD_MEDIA_STYLES,
                },
              },
              '& .MuiCardActions-root': {
                ...CARD_ACTIONS_STYLES,
                '&.message-actions, &.blog-actions': {
                  ...CARD_ACTIONS_STYLES
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
      // TextField bileşeni özelleştirmeleri
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: "standard",
        },
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              ...BASE_INPUT_STYLES,
              
              // Standard variant için özel stiller
              "&.MuiInput-root": {
                ...UNDERLINE_STYLES,
              },

              // Outlined variant için özel stiller
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "1px",
                  borderColor: BORDER_COLORS.default,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: BORDER_COLORS.hover,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderColor: "primary.main",
                },
              },
            },

            // Label stilleri
            "& .MuiInputLabel-root": {
              color: "text.secondary",
              "&.Mui-focused": {
                color: "primary.main",
              },
            },

            // Input stilleri
            "& .MuiInputBase-input": {
              ...BASE_INPUT_STYLES,
              color: "text.primary",
            },

            // Disabled durumu
            "& .Mui-disabled": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: BORDER_COLORS.disabled,
              },
              "&:before": {
                borderColor: `${BORDER_COLORS.disabled} !important`,
              },
            },
          },
        },
      },
      // Input bileşeni özelleştirmeleri
      MuiInput: {
        styleOverrides: {
          root: {
            ...BASE_INPUT_STYLES,
            ...UNDERLINE_STYLES,
          },
        },
      },
      // InputLabel bileşeni özelleştirmeleri
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
      // InputBase bileşeni özelleştirmeleri
      MuiInputBase: {
        styleOverrides: {
          input: {
            ...BASE_INPUT_STYLES,
            color: 'text.primary',
            padding: '8px 0',
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