import { CommonCardStyles } from './CardStyles';

/**
 * İletişim Bilgileri Kartı Stilleri
 */
export const ContactInfoCardStyles = {
  card: {
    "&:hover": CommonCardStyles.hover,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
} as const; 