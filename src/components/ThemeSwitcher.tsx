"use client";

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
        position: "fixed",
        top: 20,
        right: 20,
        width: "70px",
        height: "30px",
        borderRadius: "15px",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: "primary.main",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        cursor: "pointer",
        zIndex: 1000,
        transition: "all 0.3s ease-in-out",
        justifyContent: "space-between",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "0.7rem",
          color: isDarkMode ? "primary.main" : "text.secondary",
          ml: 0.8,
          userSelect: "none",
          opacity: isDarkMode ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {commonTranslations.theme.dark}
      </Typography>
      <Box
        sx={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          backgroundColor: "primary.main",
          transform: isDarkMode ? "translateX(23px)" : "translateX(-20px)",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.background.paper,
          position: "absolute",
          left: "18px",
        }}
      >
        {isDarkMode ? (
          <LightMode sx={{ fontSize: 16 }} />
        ) : (
          <DarkMode sx={{ fontSize: 16 }} />
        )}
      </Box>
      <Typography
        sx={{
          fontSize: "0.8rem",
          color: !isDarkMode ? "primary.main" : "text.secondary",
          mr: 0.8,
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
