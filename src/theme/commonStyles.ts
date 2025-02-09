import { SxProps } from "@mui/material";
import { ThemeColors } from "./colors";

export const cardStyles = (currentColors: ThemeColors): SxProps => ({
  display: "flex",
  flexDirection: "column",
  background: currentColors.surface,
  overflow: "hidden",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  borderRadius: 2,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
});

export const cardContentStyles: SxProps = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 2,
  },
};

export const truncatedTextStyles: SxProps = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const iconButtonStyles = (currentColors: ThemeColors): SxProps => ({
  color: currentColors.primary,
  "&:hover": {
    backgroundColor: `${currentColors.surface}50`,
  },
});

export const sectionTitleStyles = (): SxProps => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  mb: 6,
  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "1.75rem" },
  position: "relative",
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
});

export const linkButtonStyles = (currentColors: ThemeColors): SxProps => ({
  color: currentColors.primary,
  "&:hover": {
    backgroundColor: "transparent",
    transform: "translateX(4px)",
    transition: "all 0.2s ease-in-out",
  },
});

export const infoIconStyles = (currentColors: ThemeColors): SxProps => ({
  color: currentColors.primary,
  fontSize: "1rem",
});

export const flexRowCenterStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  mb: 1,
}; 