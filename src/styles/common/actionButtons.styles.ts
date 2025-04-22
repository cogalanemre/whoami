export const ACTION_BUTTONS_STYLES = {
  CONTAINER: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    mt: 'auto',
  },
  BUTTON: {
    minWidth: 'auto',
    p: 1,
    borderRadius: '50%',
    border: '0.5px solid',
    borderColor: 'divider',
    color: 'text.primary',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: 'action.hover',
    },
  },
} as const; 