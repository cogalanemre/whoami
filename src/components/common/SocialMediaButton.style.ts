export const socialMediaButtonStyles = {
  border: "2px solid",
  borderColor: "primary.main",
  backdropFilter: "blur(4px)",
  "& > svg": {
    fontSize: "1.5rem",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    transition: "all 0.2s ease-in-out",
  },
} as const; 