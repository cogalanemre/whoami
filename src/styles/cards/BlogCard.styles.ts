import { THEME_STYLE } from '@/theme/theme';

export const BLOG_CARD_STYLES = {
  CARD: {
    ...THEME_STYLE.CARD,
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
  META: {
    ...THEME_STYLE.META,
  },
  CARD_CONTENT: {
    ...THEME_STYLE.CARD_CONTENT,
  },
  DESCRIPTION: {
    ...THEME_STYLE.TYPOGRAPHY.BODY,
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textAlign: 'justify',
  },
  CARD_ACTIONS: {
    ...THEME_STYLE.CARD_ACTIONS,
  },
} as const; 