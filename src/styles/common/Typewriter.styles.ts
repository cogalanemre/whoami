const CURSOR_BASE = {
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
} as const;

export const STYLE = {
  ROOT: {
    color: 'text.primary',
    fontWeight: 300,
    fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
    '@keyframes blink': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
  CURSOR: CURSOR_BASE,
  CURSOR_WAITING: {
    ...CURSOR_BASE,
    animation: 'blink 1s step-end infinite',
  },
  CURSOR_NOT_WAITING: {
    ...CURSOR_BASE,
    animation: 'none',
    opacity: 1,
  },
} as const; 