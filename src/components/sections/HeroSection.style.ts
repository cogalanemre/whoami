export const heroContainerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: {
    xs: "calc(100vh - 96px)",
    md: "calc(100vh - 128px)",
  },
} as const;

export const stackStyles = {
  position: "relative",
  pb: { xs: 8, md: 12 },
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  justifyContent: { xs: "center", md: "flex-start" },
  alignItems: "center",
  gap: { xs: 4, md: 8 },
  px: { xs: 2, md: 4 },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    height: "2px",
    background: (theme) =>
      `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
  },
} as const;

export const avatarStyles = {
  width: { xs: 200, sm: 250, md: 300 },
  height: { xs: 200, sm: 250, md: 300 },
  bgcolor: "transparent",
  alignSelf: "center",
  ml: { md: 8 },
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
} as const;

export const contentBoxStyles = {
  textAlign: { xs: "center", md: "left" },
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "center", md: "flex-start" },
  gap: 2,
} as const;

export const nameStyles = {
  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
  textAlign: { xs: "center", md: "left" },
  fontWeight: "normal",
  fontFamily: "var(--font-poppins)",
  display: "flex",
  alignItems: "center",
  gap: 2,
  justifyContent: { xs: "center", md: "flex-start" },
  color: "primary.main",
} as const;

export const typewriterContainerStyles = {
  minHeight: "60px",
  textAlign: { xs: "center", md: "left" },
  width: "100%",
} as const;

export const socialButtonsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  mt: { xs: -4, md: -6 },
  mb: { xs: 4, md: 6 },
} as const; 