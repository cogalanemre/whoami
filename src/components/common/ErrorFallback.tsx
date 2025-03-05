/**
 * Hata Geri Bildirim Bileşeni
 * 
 * React Error Boundary için özelleştirilmiş hata gösterim komponenti.
 * Uygulama genelinde yakalanan hataları kullanıcı dostu bir şekilde gösterir.
 * Özellikleri:
 * - Hata mesajı gösterimi
 * - Geliştirici modunda detaylı hata bilgisi
 * - Yeniden deneme butonu
 * - Responsive tasarım
 * - i18n desteği
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary FallbackComponent={ErrorFallback}>
 *   <App />
 * </ErrorBoundary>
 * ```
 */

import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Hata Geri Bildirim Props Interface
 * 
 * @interface ErrorFallbackProps
 * @property {Error} error - Yakalanan hata objesi
 * @property {() => void} resetErrorBoundary - Hata sınırını sıfırlama fonksiyonu
 */
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * Hata Geri Bildirim Bileşeni
 * 
 * @param {ErrorFallbackProps} props - Bileşen props'ları
 * @returns {JSX.Element} Hata gösterim arayüzü
 */
export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  // Çeviri hook'unu kullan
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
      {/* Hata Başlığı */}
      <Typography variant="h4" color="error" gutterBottom>
        {t("error.title")}
      </Typography>

      {/* Hata Mesajı */}
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        {t("error.message")}
      </Typography>

      {/* Geliştirici Modu Hata Detayları */}
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

      {/* Yeniden Deneme Butonu */}
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