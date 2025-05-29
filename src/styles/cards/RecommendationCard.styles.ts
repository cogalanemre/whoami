import { THEME_STYLE } from '@/theme/theme';

export const RECOMMENDATION_CARD_STYLES = {
  CARD: {
    ...THEME_STYLE.CARD,
  },
  CARD_CONTENT: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    height: '100%',
  },
  CONTENT: {
    ...THEME_STYLE.TYPOGRAPHY.BODY,
    flex: 1,
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: 'text.primary',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  META: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  AVATAR_CONTAINER: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AVATAR: {
    ...THEME_STYLE.AVATAR,
    width: 80,
    height: 80,
  },
  INFO: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.5,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
    fontSize: '1.25rem',
    textAlign: 'center',
  },
  SUBTITLE: {
    ...THEME_STYLE.SUBTITLE,
    fontSize: '1rem',
    textAlign: 'center',
  },
} as const; 