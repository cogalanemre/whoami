import { SxProps, Theme } from '@mui/material';

export const STYLE = {
  CONTAINER: {
    mb: 6,
  } as SxProps<Theme>,
  TITLE: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    // Responsive font boyutu
    fontSize: {
      xs: '1.5rem', // Mobil
      sm: '1.75rem', // Tablet
      md: '1.75rem', // Desktop
    },
    position: 'relative',
  } as SxProps<Theme>,
  ICON: {
    color: (theme) => theme.palette.primary.main,
    fontSize: '2rem',
  } as SxProps<Theme>,
  SUBTITLE: {
    ml: 2,
    color: 'primary.main',
    fontStyle: 'italic',
  } as SxProps<Theme>,
} as const; 