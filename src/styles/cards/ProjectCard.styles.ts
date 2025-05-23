import { THEME_STYLE } from '@/theme/theme';

export const projectCardStyles = {
  CARD: {
    ...THEME_STYLE.CARD,
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
  META: {
    ...THEME_STYLE.META,
  },
  CARD_CONTENT: {
    ...THEME_STYLE.CARD_CONTENT,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  DESCRIPTION: {
    ...THEME_STYLE.TYPOGRAPHY.BODY,
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textAlign: 'justify',
    mb: 2,
    flex: 1,
  },
  CHIP: {
    ...THEME_STYLE.CHIP,
    '& .MuiChip-label': {
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
  CARDACTIONS: {
    ...THEME_STYLE.CARD_ACTIONS,
  },
} as const; 