"use client";

import { Box } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemeProvider } from "@/context/ThemeContext";
import { SelectedSkillProvider } from "@/context/SelectedSkillContext";
import MUIThemeProvider from "@/theme/MUIThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import config from "@/config/config.json";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <MUIThemeProvider>
        <SelectedSkillProvider>
          <ClientContent>{children}</ClientContent>
        </SelectedSkillProvider>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

function ClientContent({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.secondary,
      }}
    >
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
        {config.features.themeSwitcher && <ThemeSwitcher />}
        {config.features.languageSwitcher && <LanguageSwitcher />}
      </Box>
      {children}
    </Box>
  );
}
