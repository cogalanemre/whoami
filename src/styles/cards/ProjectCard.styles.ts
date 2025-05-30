import { THEME_STYLE } from '@/theme/theme';

export const projectCardStyles = {
  CARD: {
    ...THEME_STYLE.CARD,
    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
    borderColor: THEME_STYLE.CARD.borderColor,
    borderStyle: 'solid',
    boxShadow: 'none',
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  META: {
    ...THEME_STYLE.META,
  },
  CARD_CONTENT: {
    ...THEME_STYLE.CARD_CONTENT,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  DESCRIPTION: {
    ...THEME_STYLE.TYPOGRAPHY.BODY,
    mb: 2,
    flex: 1,
  },
  CHIP: {
    ...THEME_STYLE.CHIP,
    '& .MuiChip-label': {
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
  CARDACTIONS: {
    ...THEME_STYLE.CARD_ACTIONS,
  },
} as const; 