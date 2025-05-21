import { THEME_STYLE } from '@/theme/theme';

export const projectCardStyles = {
  CARD: {
    ...THEME_STYLE.CARD,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  DATE: {
    ...THEME_STYLE.META,
    mb: 2,
  },
  DESCRIPTION: {
    ...THEME_STYLE.TYPOGRAPHY.BODY,
    mb: 2,
  },
  TAGS: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },
  CHIP: {
    ...THEME_STYLE.CHIP,
  },
} as const; 