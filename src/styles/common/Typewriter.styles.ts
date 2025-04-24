import { SxProps, Theme } from '@mui/material';

interface BlinkAnimation {
  '0%': { opacity: number };
  '50%': { opacity: number };
  '100%': { opacity: number };
}

export const STYLE = {
  ROOT: {
    color: 'text.primary',
    fontWeight: 300,
    fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
  } as SxProps<Theme>,
  CURSOR: {
    content: '"_"',
    position: 'relative',
    marginLeft: '2px',
    top: '4px',
    fontSize: 'inherit',
    lineHeight: 1,
    fontWeight: 'normal',
    display: 'inline-block',
    transform: 'translateY(2px)',
  } as SxProps<Theme>,
  BLINK_ANIMATION: {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  } as BlinkAnimation,
} as const; 