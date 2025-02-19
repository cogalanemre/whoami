import { Box, Typography, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeContext } from "@/context/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function ThemeSwitcher() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { t } = useTranslation();
  const commonTranslations = t("common");

  return (
    <Box
      onClick={toggleTheme}
      sx={{
        width: "60px",
        height: "30px",
        borderRadius: "15px",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: "primary.main",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        justifyContent: "space-between",
        "@keyframes rotate360": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "&:hover": {
          "& .theme-icon-inner": {
            animation: "rotate360 0.5s ease-in-out",
          },
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "0.6rem",
          fontWeight: "bold",
          color: isDarkMode ? "primary.main" : "text.secondary",
          ml: 0.4,
          userSelect: "none",
          opacity: isDarkMode ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {commonTranslations.theme.dark}
      </Typography>
      <Box
        className="theme-icon"
        sx={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          backgroundColor: "primary.main",
          transform: isDarkMode ? "translateX(13px)" : "translateX(-19px)",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.background.paper,
          position: "absolute",
          left: "18px",
        }}
      >
        <Box
          className="theme-icon-inner"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isDarkMode ? (
            <LightMode sx={{ fontSize: 16 }} />
          ) : (
            <DarkMode sx={{ fontSize: 16 }} />
          )}
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: "0.6rem",
          fontWeight: "bold",
          color: !isDarkMode ? "primary.main" : "text.secondary",
          mr: 0.6,
          userSelect: "none",
          opacity: !isDarkMode ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {commonTranslations.theme.light}
      </Typography>
    </Box>
  );
} 