import { CommonCardStyles } from './CardStyles';

/**
 * İletişim Kartı Stilleri
 */
export const ContactCardStyles = {
  card: {
    "&:hover": CommonCardStyles.hover,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
} as const; 