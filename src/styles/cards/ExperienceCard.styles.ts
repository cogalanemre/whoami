import { THEME_STYLE } from '@/theme/theme';

export const EXPERIENCE_CARD_STYLES = {
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
  CARDCONTENT: {
    ...THEME_STYLE.TYPOGRAPHY.BODY,
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    alignItems: 'flex-start',
    '& > span': {
      color: 'primary.main',
      flexShrink: 0,
      fontSize: '1rem',
      lineHeight: 1,
      mt: 0.2,
    },
  },
  CARDACTIONS: {
    ...THEME_STYLE.CARD_ACTIONS,
  },
  CHIP: {
    ...THEME_STYLE.CHIP,
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
} as const; 