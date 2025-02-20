import { Box, CircularProgress } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function LoadingSpinner() {
  const colors = useThemeColors();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.background,
      }}
    >
      <CircularProgress
        sx={{
          color: colors.primary,
        }}
      />
    </Box>
  );
} 