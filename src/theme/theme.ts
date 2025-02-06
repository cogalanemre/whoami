import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    secondary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      background: `linear-gradient(45deg, ${colors.primary.gradient.start} 30%, ${colors.primary.gradient.end} 90%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: colors.primary.main,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: colors.primary.main,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: colors.background.card,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.primary.border}`,
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            border: `1px solid ${colors.primary.borderHover}`,
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          background: colors.primary.hover,
          border: `1px solid ${colors.primary.border}`,
          '&:hover': {
            background: colors.primary.hover,
          },
        },
        label: {
          color: colors.primary.main,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.primary.border} 1px, transparent 0)`,
          backgroundSize: '24px 24px',
          boxShadow: 'none',
          border: `1px solid ${colors.primary.border}`,
          '&:hover': {
            border: `1px solid ${colors.primary.borderHover}`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: colors.primary.border,
            },
            '&:hover fieldset': {
              borderColor: colors.primary.borderHover,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
            },
          },
        },
      },
    },
  },
});

export default theme; 