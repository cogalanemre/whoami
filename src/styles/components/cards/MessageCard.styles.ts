import { CommonCardStyles } from './CardStyles';

/**
 * Mesaj Kartı Stilleri
 */
export const MessageCardStyles = {
  card: {
    "&:hover": CommonCardStyles.hover,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
} as const; 