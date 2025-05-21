import { THEME_STYLE } from '@/theme/theme';

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
    ...THEME_STYLE.CARD,
    height: 'auto',
    '& .MuiList-root': {
      p: 0,
      display: 'flex',
      flexDirection: 'column',
    },
  },
  MENU_ITEM: {
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    py: 1.5,
    px: 2,
    borderBottom: '0.5px solid',
    borderColor: 'divider',
    '&:last-child': {
      borderBottom: 'none',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
      color: 'text.primary',
    },
  },
} as const; 