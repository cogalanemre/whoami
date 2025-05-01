import { SxProps, Theme } from '@mui/material';

export const STYLE = {
  ROOT: {
    color: 'text.primary',
    fontWeight: 300,
    fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
  },
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
    color: 'primary.main',
  },
} as const;

export const getCursorStyle = (isWaiting: boolean): SxProps<Theme> => ({
  ...STYLE.CURSOR,
  animation: isWaiting ? 'blink 1s infinite' : 'none',
  opacity: isWaiting ? undefined : 1,
}); 