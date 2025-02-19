"use client";

import { Box } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemeProvider } from "@/context/ThemeContext";
import { SelectedSkillProvider } from "@/context/SelectedSkillContext";
import MUIThemeProvider from "@/theme/MUIThemeProvider";
import ThemeAndLanguageSwitcher from "@/components/ThemeAndLanguageSwitcher";

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
      <ThemeAndLanguageSwitcher />
      {children}
    </Box>
  );
}
