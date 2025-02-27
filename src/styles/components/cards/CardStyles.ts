/**
 * Ortak Kart Stilleri
 * 
 * Tüm kartlar için ortak olan stilleri içerir.
 * - Temel kart stilleri
 * - Hover efektleri
 * - Header stilleri
 * - Başlık stilleri
 */

export const CommonCardStyles = {
  base: {
    border: "1px solid",
    borderColor: "primary.main",
    borderRadius: "16px",
    position: "relative" as const,
    transition: "all 0.3s ease-in-out",
    height: "100%",
    background: "transparent",
  },
  hover: {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  header: {
    padding: 3,
    backdropFilter: "blur(4px)",
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  content: {
    padding: 3,
  },
} as const; 