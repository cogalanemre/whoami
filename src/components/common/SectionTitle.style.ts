export const containerStyles = {
  mb: 6,
} as const;

export const titleStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  // Responsive font boyutu
  fontSize: { 
    xs: "1.5rem",  // Mobil
    sm: "1.75rem", // Tablet
    md: "1.75rem"  // Desktop
  },
  position: "relative",
  // Gradient alt çizgi efekti
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: "40px",
    height: "3px",
    background: "linear-gradient(90deg, primary.main, transparent)",
    borderRadius: "4px",
  },
} as const;

export const iconStyles = {
  color: "primary.main",
  fontSize: "2rem",
} as const;

export const subtitleStyles = {
  ml: 2,
  color: "primary.main",
  fontStyle: "italic",
} as const; 