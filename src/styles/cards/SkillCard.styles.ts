import { THEME_STYLE } from '@/theme/theme';

export const skillCardStyles = {
  CARD: {
    ...THEME_STYLE.CARD,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: THEME_STYLE.CARD.boxShadow,
    },
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  CARD_CONTENT: {
    ...THEME_STYLE.CARD_CONTENT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
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