"use client";

import { Box } from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import config from "@/config/config.json";

export default function ThemeAndLanguageSwitcher() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 1000,
      }}
    >
      <ThemeSwitcher />
      {config.features.languageSwitcher && <LanguageSwitcher />}
    </Box>
  );
} 