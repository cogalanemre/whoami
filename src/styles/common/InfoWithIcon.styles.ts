import { SxProps, Theme } from '@mui/material';

export const STYLE = {
  CONTAINER: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    py: 0.75,
  },
  ICON_WRAPPER: {
    color: 'primary.main',
    fontSize: '1em',
    display: 'flex',
    alignItems: 'center',
  },
  TEXT: (fontSize: string) => ({
    color: 'text.secondary',
    fontSize,
    display: 'flex',
    alignItems: 'center',
  } as SxProps<Theme>),
} as const; 