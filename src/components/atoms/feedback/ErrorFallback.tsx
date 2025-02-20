import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        {t("error.title")}
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        {t("error.message")}
      </Typography>
      {process.env.NODE_ENV === "development" && (
        <Typography
          variant="body2"
          component="pre"
          sx={{
            backgroundColor: "background.paper",
            p: 2,
            borderRadius: 1,
            maxWidth: "100%",
            overflow: "auto",
            mb: 2,
          }}
        >
          {error.message}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={resetErrorBoundary}
        sx={{ mt: 2 }}
      >
        {t("error.retry")}
      </Button>
    </Box>
  );
} 