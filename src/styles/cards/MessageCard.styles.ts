import { THEME_STYLE } from '@/theme/theme';

export const MESSAGE_CARD_STYLES = {
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
  CARD_ACTIONS: {
    ...THEME_STYLE.CARD_ACTIONS,
  },
  INPUT: {
    ...THEME_STYLE.INPUT,
  },
} as const; 