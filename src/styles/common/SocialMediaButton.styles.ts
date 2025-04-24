import { SxProps, Theme } from '@mui/material';

export const STYLE = {
  BUTTON: {
    border: '1px solid',
    borderColor: 'primary.main',
    '& > svg': {
      fontSize: '1.5rem',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      transition: 'all 0.2s ease-in-out',
    },
  } as SxProps<Theme>,
} as const; 