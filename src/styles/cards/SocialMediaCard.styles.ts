import { THEME_STYLE } from '@/theme/theme';

export const SOCIAL_MEDIA_CARD_STYLES = {
  CARD: {
    ...THEME_STYLE.CARD,
    p: 0,
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
  CARD_CONTENT: {
    ...THEME_STYLE.CARD_CONTENT,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
} as const; 