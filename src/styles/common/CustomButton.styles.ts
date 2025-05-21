export const CUSTOM_BUTTON_STYLES = {
  BUTTON: {
    borderRadius: '8px',
    padding: '8px 20px',
    textTransform: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    letterSpacing: '0.3px',
    transition: 'all 0.2s ease-in-out',
    boxShadow: 'none',
    background: 'transparent',
    border: '1px solid',
    borderColor: 'divider',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    '&:hover': {
      background: 'transparent',
      borderColor: 'text.secondary',
    },
    '&:active': {
      background: 'action.selected',
    },
    '&.Mui-disabled': {
      background: 'transparent',
      borderColor: 'action.disabledBackground',
      color: 'text.disabled',
    },
    '&:focus-visible': {
      outline: '2px solid',
      outlineColor: 'primary.main',
      outlineOffset: 2,
    },
  },
} as const; 