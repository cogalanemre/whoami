"use client";

import { Box } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const colors = useThemeColors();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.secondary,
      }}
    >
      {children}
    </Box>
  );
}
