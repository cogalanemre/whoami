import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { UI_CONSTANTS } from "@/constants";
import config from "@/config/config.json";

/**
 * Dil değiştirici bileşeni
 * 
 * İlaç kapsülü şeklinde tasarlanmış dil değiştirme butonu.
 * Aktif dil vurgulanır ve hover durumunda animasyon içerir.
 * Erişilebilirlik standartlarına uygun.
 * Loading state ve hata yönetimi içerir.
 * 
 * @component
 * @returns {JSX.Element} Dil değiştirici buton
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  /**
   * Dil değiştirme işleyicisi
   * Config'den desteklenen dilleri kontrol eder ve geçiş yapar
   */
  const handleLanguageChange = async () => {
    try {
      setIsChanging(true);
      const nextLocale = config.language.supported.find(lang => lang !== locale) || config.language.default;
      await router.push(`/${nextLocale}`);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Button
      onClick={handleLanguageChange}
      disabled={isChanging}
      aria-label="Change language"
      sx={{
        position: 'relative',
        minWidth: 'unset',
        width: '76px',
        height: '36px',
        borderRadius: '18px',
        padding: 0,
        backgroundColor: 'background.paper',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: `all ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s cubic-bezier(0.4, 0, 0.2, 1)`,
        '&:hover': {
          backgroundColor: 'background.paper',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Hareketli Seçici Arka Plan */}
      <Box
        sx={{
          position: 'absolute',
          width: '50%',
          height: '100%',
          backgroundColor: 'primary.main',
          left: locale === 'tr' ? '0%' : '50%',
          transition: `left ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s cubic-bezier(0.4, 0, 0.2, 1)`,
          borderRadius: '16px',
          opacity: isChanging ? 0.7 : 1,
        }}
      />

      {/* Dil Seçenekleri */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isChanging ? (
          <CircularProgress 
            size={20}
            sx={{ 
              color: locale === 'tr' ? 'background.paper' : 'primary.main'
            }}
          />
        ) : (
          <>
            {/* TR */}
            <Typography
              variant="caption"
              sx={{
                width: '50%',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: locale === 'tr' ? 'background.paper' : 'text.secondary',
                transition: 'color 0.3s ease',
              }}
            >
              TR
            </Typography>

            {/* EN */}
            <Typography
              variant="caption"
              sx={{
                width: '50%',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: locale === 'en' ? 'background.paper' : 'text.secondary',
                transition: 'color 0.3s ease',
              }}
            >
              EN
            </Typography>
          </>
        )}
      </Box>
    </Button>
  );
} 