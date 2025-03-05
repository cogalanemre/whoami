"use client";

import { ThemeOptions } from "@mui/material/styles";
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
const DESIGN_TOKENS = {
  TRANSITIONS: {
    DEFAULT: "all 0.3s ease-in-out",
    FAST: "all 0.2s ease-in-out",
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
      CHIP: "16px",
    },
    COLORS: {
      default: COMMON_COLORS.border.default,
      hover: COMMON_COLORS.border.hover,
      disabled: COMMON_COLORS.border.disabled,
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
 * Kart stilleri
 * Tüm kartlarda kullanılan temel stiller
 */
const CARD_STYLES = {
  border: '0.5px solid',
  borderColor: COMMON_COLORS.border.default,
  bgcolor: 'background.paper',
  borderRadius: DESIGN_TOKENS.BORDER.RADIUS.DEFAULT,
  position: "relative" as const,
  height: "100%",
  transition: DESIGN_TOKENS.TRANSITIONS.DEFAULT,
  '&:hover': {
    transform: "translateY(-4px)",
    boxShadow: `0 4px 20px ${COMMON_COLORS.shadow.default}`,
  },
};

/**
 * Temel input stilleri
 * MUI Input bileşenleri için ortak stiller
 */
const BASE_INPUT_STYLES = {
  transition: DESIGN_TOKENS.TRANSITIONS.FAST,
  borderRadius: DESIGN_TOKENS.BORDER.RADIUS.INPUT,
  ...DESIGN_TOKENS.TYPOGRAPHY.BODY,
};

/**
 * Alt çizgi stilleri
 * Standard variant input'lar için alt çizgi stilleri
 */
const UNDERLINE_STYLES = {
  '&::before': {
    borderBottom: '1px solid',
    borderColor: COMMON_COLORS.border.default,
  },
  '&::after': {
    borderBottom: '1px solid',
    borderColor: 'primary.main',
  },
  '&:hover:not(.Mui-disabled)::before': {
    borderBottom: '1px solid',
    borderColor: COMMON_COLORS.border.hover,
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
    marginBottom: DESIGN_TOKENS.SPACING.CARD.PADDING,
  }
};

/**
 * Kart aksiyon stilleri
 * Tüm kart aksiyonlarında kullanılan ortak stiller
 */
const CARD_ACTIONS_STYLES = {
  padding: DESIGN_TOKENS.SPACING.CARD.PADDING,
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
 * Kart başlık stilleri
 * Tüm kart başlıklarında kullanılan ortak stiller
 */
const CARD_HEADER_STYLES = {
  padding: DESIGN_TOKENS.SPACING.CARD.PADDING,
  backdropFilter: 'blur(4px)',
  borderBottom: '0.5px solid',
  borderColor: COMMON_COLORS.border.default,
  '& .MuiCardHeader-title': {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: 1.3,
    transition: DESIGN_TOKENS.TRANSITIONS.FAST,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  '& .MuiCardHeader-subheader': {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    marginTop: 1,
  },
} as const;

/**
 * Kart içerik stilleri
 * Tüm kart içeriklerinde kullanılan ortak stiller
 */
const CARD_CONTENT_STYLES = {
  padding: DESIGN_TOKENS.SPACING.CARD.PADDING,
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
    }
  },
  '&.message-form': FORM_STYLES,
  '&.blog-content': {
    padding: DESIGN_TOKENS.SPACING.CARD.PADDING,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: 2,
  },
  '& .MuiCardMedia-root': {
    ...CARD_MEDIA_STYLES,
  },
} as const;

/**
 * Blog içerik stilleri
 * Blog kartlarında kullanılan özel stiller
 */
const BLOG_CONTENT_STYLES = {
  '& .blog-title': {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: 1.3,
    textDecoration: 'none',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
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

/**
 * Deneyim Kartı Stilleri
 * ExperienceCard bileşeni için ortak stiller
 */
export const EXPERIENCE_CARD_STYLES = {
  card: {
    background: "background.paper",
    position: "relative",
    transition: DESIGN_TOKENS.TRANSITIONS.DEFAULT,
  },
  cardHighlighted: {
    border: "1px solid",
    borderColor: "primary.main",
    boxShadow: (theme) => `0 4px 20px ${theme.palette.primary.main}40`,
  },
  avatar: DESIGN_TOKENS.COMPONENTS.AVATAR,
  position: {
    color: "primary.main",
    mb: 1,
    fontWeight: "bold",
    textAlign: { xs: "center", md: "left" },
  },
  metaContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 3 },
    alignItems: { xs: "flex-start", md: "center" },
    flexWrap: "wrap",
  },
  description: {
    color: "text.secondary",
  },
  descriptionContainer: {
    width: "100%",
  },
  skillSection: {
    width: "100%",
  },
  skillContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: DESIGN_TOKENS.SPACING.CHIP.GAP,
  },
  skillChip: (isSelected: boolean) => ({
    ...DESIGN_TOKENS.TYPOGRAPHY.CHIP,
    borderRadius: DESIGN_TOKENS.BORDER.RADIUS.CHIP,
    transition: DESIGN_TOKENS.TRANSITIONS.DEFAULT,
    cursor: "pointer",
    height: 32,
    ...(isSelected ? DESIGN_TOKENS.COMPONENTS.CHIP.selected : DESIGN_TOKENS.COMPONENTS.CHIP.default),
  }),
} as const;

/**
 * Eğitim Kartı Stilleri
 * EducationCard bileşeni için ortak stiller
 */
export const EDUCATION_CARD_STYLES = {
  card: {
    background: "background.paper",
    position: "relative",
    transition: "all 0.3s ease-in-out",
  },
  avatar: DESIGN_TOKENS.COMPONENTS.AVATAR,
  schoolName: {
    color: "primary.main",
    mb: 1,
    fontWeight: "bold",
    textAlign: { xs: "center", md: "left" },
  },
  department: {
    color: "text.secondary",
    mb: 2,
    textAlign: { xs: "center", md: "left" },
  },
  metaContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 3 },
    alignItems: { xs: "flex-start", md: "center" },
  },
} as const;

/**
 * Input bileşeni stilleri
 * Tüm input bileşenlerinde kullanılan ortak stiller
 */
const INPUT_STYLES = {
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
          borderColor: DESIGN_TOKENS.BORDER.COLORS.default,
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

    // Disabled durumu
    "& .Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: DESIGN_TOKENS.BORDER.COLORS.disabled,
      },
      "&:before": {
        borderColor: `${DESIGN_TOKENS.BORDER.COLORS.disabled} !important`,
      },
    },
  },
} as const;

/**
 * Chip bileşeni stilleri
 * Tüm chip bileşenlerinde kullanılan ortak stiller
 */
const CHIP_STYLES = {
  root: {
    ...DESIGN_TOKENS.TYPOGRAPHY.CHIP,
    borderRadius: DESIGN_TOKENS.BORDER.RADIUS.CHIP,
    transition: DESIGN_TOKENS.TRANSITIONS.DEFAULT,
    height: 32,
    border: "0.5px solid",
    borderColor: COMMON_COLORS.border.default,
    "&:hover": {
      borderColor: COMMON_COLORS.border.hover,
      transform: "translateY(-4px)",
      boxShadow: `0 4px 20px ${COMMON_COLORS.shadow.default}`,
    },
    "&.MuiChip-colorPrimary": {
      bgcolor: "primary.main",
      color: "background.paper",
      borderColor: "primary.main",
      boxShadow: `0 4px 20px ${COMMON_COLORS.shadow.primary}`,
      transform: "translateY(-4px)",
      "&:hover": {
        bgcolor: "primary.main",
        borderColor: "primary.main",
      },
    },
  },
  label: {
    color: "text.primary",
    padding: "0 12px",
  },
  clickable: {
    cursor: "pointer",
    "&:hover": {
      bgcolor: "background.paper",
    },
  },
} as const;

/**
 * Typography bileşeni stilleri
 * Tüm typography bileşenlerinde kullanılan ortak stiller
 */
const TYPOGRAPHY_STYLES = {
  h3: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "inherit",
    lineHeight: 1.2,
  },
  h4: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "primary.main",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
} as const;

/**
 * Tema oluşturma fonksiyonu
 * @param isDarkMode - Karanlık mod durumu
 * @returns Tema konfigürasyonu
 */
export const theme = (isDarkMode: boolean): ThemeOptions => ({
  // Tema paleti
  palette: {
    mode: isDarkMode ? "dark" : "light",
    primary: {
      main: config.theme.color,
    },
    ...COMMON_COLORS,
    background: {
      default: isDarkMode ? COMMON_COLORS.background.dark.default : COMMON_COLORS.background.light,
      paper: isDarkMode ? COMMON_COLORS.background.dark.paper : COMMON_COLORS.background.light,
    },
    text: {
      primary: isDarkMode ? COMMON_COLORS.text.dark.primary : COMMON_COLORS.text.light.primary,
      secondary: isDarkMode ? COMMON_COLORS.text.dark.secondary : COMMON_COLORS.text.light.secondary,
      disabled: isDarkMode ? COMMON_COLORS.text.dark.disabled : COMMON_COLORS.text.light.disabled,
    },
    divider: isDarkMode ? COMMON_COLORS.divider.dark : COMMON_COLORS.divider.light,
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
              ...CARD_HEADER_STYLES,
            },
            '& .MuiCardContent-root': {
              ...CARD_CONTENT_STYLES,
              '&.blog-content': {
                ...BLOG_CONTENT_STYLES,
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
        root: INPUT_STYLES.root,
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
    // Chip bileşeni özelleştirmeleri
    MuiChip: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: CHIP_STYLES,
    },
    MuiTypography: {
      styleOverrides: TYPOGRAPHY_STYLES,
    },
  },
}); 