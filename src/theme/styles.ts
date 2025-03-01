/**
 * Ortak stil tanımlamaları
 * Material-UI tema sistemi ile uyumlu stil sabitleri
 */

/**
 * Section stilleri
 * Tüm section'larda kullanılan ortak stiller
 */
export const SECTION_STYLES = {
  mt: { xs: 4, sm: 6, md: 8, lg: 10 },
} as const;

/**
 * Stack stilleri
 * Stack bileşenlerinde kullanılan ortak spacing değerleri
 */
export const STACK_STYLES = {
  spacing: { xs: 4, md: 6 },
} as const;

/**
 * Motion stilleri
 * Framer Motion animasyonları için ortak değerler
 */
export const MOTION_STYLES = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  container: {
    mb: { xs: 4, md: 6 },
    "&:last-child": {
      mb: 0,
    },
  },
} as const;

/**
 * Deneyim Kartı Stilleri
 * ExperienceCard bileşeni için ortak stiller
 */
export const EXPERIENCE_CARD_STYLES = {
  card: {
    background: "background.paper",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      "& .MuiAvatar-root": {
        transform: "scale(1.05)",
      },
    },
  },
  cardHighlighted: {
    border: "1px solid",
    borderColor: "primary.main",
    transform: "translateY(-4px)",
    boxShadow: (theme) => `0 4px 20px ${theme.palette.primary.main}40`,
  },
  avatar: {
    width: 80,
    height: 80,
    bgcolor: "transparent",
    border: "2px solid",
    borderColor: "primary.main",
    display: { xs: "none", md: "block" },
    "& img": {
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
  position: {
    color: "primary.main",
    mb: 1,
    fontWeight: "bold",
    textAlign: { xs: "center", md: "left" },
  },
  metaContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 3 },
    alignItems: { xs: "flex-start", md: "center" },
    flexWrap: "wrap",
  },
  description: {
    color: "text.secondary",
  },
  descriptionContainer: {
    width: "100%",
  },
  skillSection: {
    width: "100%",
  },
  skillContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  skillChip: (isSelected: boolean) => ({
    bgcolor: isSelected ? "primary.main" : "background.default",
    borderColor: "primary.main",
    color: isSelected ? "background.paper" : "primary.main",
    cursor: "pointer",
    "&:hover": {
      bgcolor: isSelected ? "primary.main" : "background.paper",
      borderColor: "primary.main",
    },
  }),
} as const; 