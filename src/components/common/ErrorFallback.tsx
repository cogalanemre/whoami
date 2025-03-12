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
import {
  containerStyles,
  errorMessageStyles,
  errorDetailsStyles,
  retryButtonStyles,
} from "./ErrorFallback.style";

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
    <Box sx={containerStyles}>
      {/* Hata Başlığı */}
      <Typography variant="h4" color="error" gutterBottom>
        {t("error.title")}
      </Typography>

      {/* Hata Mesajı */}
      <Typography variant="body1" align="center" sx={errorMessageStyles}>
        {t("error.message")}
      </Typography>

      {/* Geliştirici Modu Hata Detayları */}
      {process.env.NODE_ENV === "development" && (
        <Typography
          variant="body2"
          component="pre"
          sx={errorDetailsStyles}
        >
          {error.message}
        </Typography>
      )}

      {/* Yeniden Deneme Butonu */}
      <Button
        variant="contained"
        color="primary"
        onClick={resetErrorBoundary}
        sx={retryButtonStyles}
      >
        {t("error.retry")}
      </Button>
    </Box>
  );
} 