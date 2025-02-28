import { CommonCardStyles } from './CardStyles';

/**
 * Sosyal Medya Kartı Stilleri
 */
export const SocialMediaCardStyles = {
  card: {
    "&:hover": CommonCardStyles.hover,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
} as const; 