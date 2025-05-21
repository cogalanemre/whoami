import { THEME_STYLE } from '@/theme/theme';

export const CONTACT_CARD_STYLES = {
  CARD: {
    ...THEME_STYLE.CARD,
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
  CARD_CONTENT: {
    ...THEME_STYLE.CARD_CONTENT,
  },
} as const; 