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

/**
 * Stil sabitleri
 */
const STYLES = {
  CARD: {
    background: "background.paper",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    height: "100%",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
  },
  HEADER: {
    p: 3,
  },
  TITLE: {
    color: "primary.main",
    fontWeight: "bold",
  },
  CONTENT: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  SECTION: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
} as const;

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
    <Card sx={STYLES.CARD}>
      {/* Başlık Bölümü */}
      <Box sx={{
        ...STYLES.HEADER,
        background: isDarkMode
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(0, 0, 0, 0.03)",
        backdropFilter: "blur(4px)",
      }}>
        {/* Başlık */}
        <Typography variant="h6" sx={STYLES.TITLE}>
          {locale === "tr" ? "Sosyal Medya" : "Social Media"}
        </Typography>
      </Box>

      {/* Sosyal Medya Bağlantıları */}
      <CardContent sx={{ p: 3 }}>
        <Box sx={STYLES.CONTENT}>
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