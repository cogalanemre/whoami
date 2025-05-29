import { THEME_STYLE } from '@/theme/theme';

export const skillCardStyles = {
  CARD: {
    ...THEME_STYLE.CARD,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
    boxShadow: 'none',
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  CARD_CONTENT: {
    ...THEME_STYLE.CARD_CONTENT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    gap: 2,
  },
  CHIP_CONTAINER: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 1,
  },
  CHIP: {
    ...THEME_STYLE.CHIP,
    '&:hover': {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
    },
  },
} as const; 