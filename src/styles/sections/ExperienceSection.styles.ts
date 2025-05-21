import { THEME_STYLE } from '@/theme/theme';

export const experienceSectionStyles = {
  SECTION: {
    ...THEME_STYLE.SECTION,
  },
  STACK: {
    spacing: { xs: 4, md: 6 },
  },
  BOX: {
    mb: { xs: 4, md: 6 },
    '&:last-child': {
      mb: 0,
    },
  },
} as const; 