"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as CustomThemeProvider,
  useThemeContext,
} from "@/context/ThemeContext";
import { colors } from "@/theme/colors";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomThemeProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </CustomThemeProvider>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useThemeContext();
  const currentColors = isDarkMode ? colors.dark : colors.light;

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: currentColors.primary,
        light: currentColors.surface,
        dark: currentColors.secondary,
      },
      secondary: {
        main: currentColors.secondary,
        light: currentColors.primary,
        dark: currentColors.surface,
      },
      background: {
        default: currentColors.background,
        paper: currentColors.surface,
      },
      text: {
        primary: currentColors.secondary,
        secondary: currentColors.primary,
      },
      divider: currentColors.surface,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            backgroundColor: currentColors.surface,
            border: `1px solid ${currentColors.surface}`,
            "&:hover": {
              borderColor: currentColors.primary,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: currentColors.surface,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: currentColors.background,
            color: currentColors.primary,
            borderColor: currentColors.primary,
            "&:hover": {
              backgroundColor: currentColors.surface,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: `${currentColors.surface}50`,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: currentColors.primary,
            "&:hover": {
              backgroundColor: `${currentColors.surface}50`,
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: `${currentColors.surface}50`,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
