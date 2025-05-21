import { THEME_STYLE } from '@/theme/theme';

export const EDUCATION_CARD_STYLES = {
  CARD: {
    ...THEME_STYLE.CARD,
  },
  AVATAR: {
    ...THEME_STYLE.AVATAR,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
  SUBTITLE: {
    ...THEME_STYLE.SUBTITLE,
  },
  META: {
    ...THEME_STYLE.META,
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
    border: 'none',
  },
} as const; 