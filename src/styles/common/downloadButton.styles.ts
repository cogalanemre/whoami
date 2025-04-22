export const DOWNLOAD_BUTTON_STYLES = {
  BUTTON: {
    gap: 1,
    minWidth: 200,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: 'primary.main',
    },
  },
  MENU: {
    width: 200,
    mt: 1,
  },
  MENU_ITEM: {
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
} as const; 