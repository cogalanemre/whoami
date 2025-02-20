import { Box, Button, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTranslation } from "@/hooks/useTranslation";
import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const commonTranslations = t("common");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 3,
        background: colors.background,
        color: colors.secondary,
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        {commonTranslations.error.title}
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        {commonTranslations.error.message}
      </Typography>
      <Typography variant="body2" color="error" sx={{ mb: 2 }}>
        {error.message}
      </Typography>
      <Button
        variant="contained"
        onClick={resetErrorBoundary}
        sx={{
          bgcolor: colors.primary,
          color: colors.surface,
          "&:hover": {
            bgcolor: colors.primary,
            opacity: 0.9,
          },
        }}
      >
        {commonTranslations.error.retry}
      </Button>
    </Box>
  );
} 