import { THEME_STYLE } from '@/theme/theme';

export const projectSectionStyles = {
  SECTION: {
    ...THEME_STYLE.SECTION,
  },
  CONTAINER: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'calc(100% + 32px)',
  },
  ITEM: {
    width: {
      xs: '100%',
      sm: '50%',
      md: '33.333%',
    },
    mr: 4,
    mb: 3,
  },
  MESSAGE: {
    width: '100%',
    textAlign: 'center',
  },
} as const; 