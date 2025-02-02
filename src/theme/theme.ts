import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64FFDA',
      light: '#9FFFEA',
      dark: '#00E5B5',
    },
    secondary: {
      main: '#FFB74D',
      light: '#FFE97D',
      dark: '#C88719',
    },
    background: {
      default: '#1A1A1A',
      paper: '#242424',
    },
    text: {
      primary: '#E6F1FF',
      secondary: '#A7A7A7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #64FFDA 30%, #FFB74D 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#64FFDA',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: '#64FFDA',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'linear-gradient(145deg, #242424, #2A2A2A)',
          boxShadow: '10px 10px 20px #161616, -10px -10px 20px #2E2E2E',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: 'rgba(100, 255, 218, 0.1)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          '&:hover': {
            background: 'rgba(100, 255, 218, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 26, 0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
        },
      },
    },
  },
});

export default theme; 