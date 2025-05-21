import { THEME_STYLE } from '@/theme/theme';

export const contactSectionStyles = {
  SECTION: {
    ...THEME_STYLE.SECTION,
  },
  CONTAINER: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', md: 'row' },
  },
  SIDE_BOX: {
    width: { xs: '100%', md: '48%' },
  },
  LEFT_CONTENT: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 4, md: 8 },
  },
} as const; 