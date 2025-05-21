import { THEME_STYLE } from '@/theme/theme';

export const educationSectionStyles = {
  SECTION: {
    ...THEME_STYLE.SECTION,
  },
  STACK: {},
  BOX: {
    mb: 3,
    '&:last-child': {
      mb: 0,
    },
  },
} as const; 