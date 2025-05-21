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
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
} as const; 