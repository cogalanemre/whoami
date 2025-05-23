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
  TAGS: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    justifyContent: 'flex-start',
    mt: 'auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  CHIP: {
    ...THEME_STYLE.CHIP,
    height: 24,
    '& .MuiChip-label': {
      px: 1,
      fontSize: '0.75rem',
    },
    m: 0,
  },
} as const; 