import { CommonCardStyles } from './CardStyles';

/**
 * Sosyal Medya Kartı Stilleri
 */
export const SocialMediaCardStyles = {
  card: {
    ...CommonCardStyles.base,
    "&:hover": CommonCardStyles.hover,
  },
  header: {
    ...CommonCardStyles.header,
  },
  title: {
    ...CommonCardStyles.title,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
} as const; 