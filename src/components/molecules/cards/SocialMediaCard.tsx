/**
 * Sosyal Medya Kartı Bileşeni
 * 
 * Kullanıcının sosyal medya bağlantılarını gösteren kart bileşeni.
 * Özellikler:
 * - Sosyal medya bağlantıları (GitHub, LinkedIn, Medium)
 * - Responsive tasarım
 * - Hover animasyonları
 * - Tema renk entegrasyonu
 * - Erişilebilirlik özellikleri
 * 
 * @component
 */

import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { 
  GitHub, 
  LinkedIn,
} from "@mui/icons-material";
import { FaMedium } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import resumeData from "@/config/resume.json";
import { memo } from "react";
import { useTheme } from "@mui/material/styles";
import { SocialMediaCardStyles } from "@/styles/components/cards/SocialMediaCard.styles";

/**
 * Sosyal Medya Kartı Bileşeni
 * 
 * @returns {JSX.Element} Sosyal medya kartı
 */
function SocialMediaCard() {
  const { locale } = useTranslation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Sosyal medya bilgilerini al
  const socialMedia = resumeData.hero.socialMedia;

  return (
    <Card sx={SocialMediaCardStyles.card}>
      {/* Başlık Bölümü */}
      <Box sx={SocialMediaCardStyles.header}>
        {/* Başlık */}
        <Typography variant="h6" sx={SocialMediaCardStyles.title}>
          {locale === "tr" ? "Sosyal Medya" : "Social Media"}
        </Typography>
      </Box>

      {/* Sosyal Medya Bağlantıları */}
      <CardContent sx={{ p: 3 }}>
        <Box sx={SocialMediaCardStyles.content}>
          {/* GitHub */}
          {socialMedia.github && (
            <InfoWithIcon
              icon={GitHub}
              text={socialMedia.github.replace("https://", "")}
              fontSize="1rem"
            />
          )}

          {/* LinkedIn */}
          {socialMedia.linkedin && (
            <InfoWithIcon
              icon={LinkedIn}
              text={socialMedia.linkedin.replace("https://", "")}
              fontSize="1rem"
            />
          )}

          {/* Medium */}
          {socialMedia.medium && (
            <InfoWithIcon
              icon={FaMedium}
              text={socialMedia.medium.replace("https://", "")}
              fontSize="1rem"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(SocialMediaCard); 