export const containerStyles = {
  display: "flex", 
  alignItems: "center", 
  gap: 1.5,
  py: 0.75,
} as const;

export const iconStyles = {
  color: "primary.main",
  fontSize: "1.2em",
  transition: "color 0.2s ease-in-out",
} as const;

export const textStyles = (fontSize: string) => ({
  color: "text.secondary",
  fontSize,
  letterSpacing: "0.3px",
  transition: "color 0.2s ease-in-out",
} as const); 