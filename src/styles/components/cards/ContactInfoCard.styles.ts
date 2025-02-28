import { CommonCardStyles } from './CardStyles';

/**
 * İletişim Bilgileri Kartı Stilleri
 */
export const ContactInfoCardStyles = {
  card: {
    ...CommonCardStyles.base,
    "&:hover": CommonCardStyles.hover,
    bgcolor: "background.paper",
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
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
} as const; 