import { createTheme } from '@mui/material/styles';
import { validateColorPalette } from '../utils/colorUtils';

// Ana renk paleti
const palette = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
  },
};

// Renk paletini doğrula
const colorValidation = validateColorPalette({
  'primary.main': palette.primary.main,
  'primary.contrastText': palette.primary.contrastText,
  'secondary.main': palette.secondary.main,
  'secondary.contrastText': palette.secondary.contrastText,
  'background.default': palette.background.default,
  'background.paper': palette.background.paper,
  'text.primary': palette.text.primary,
  'text.secondary': palette.text.secondary,
});

// Eğer kontrast sorunları varsa konsola uyarı bas
if (!colorValidation.valid) {
  console.warn('Renk kontrastı sorunları tespit edildi:', colorValidation.issues);
}

const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          '&:focus-visible': {
            outline: '2px solid #000',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '2px solid #000',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});

export default theme; 