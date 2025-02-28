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
  CardHeader,
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
import { getTranslation } from "@/i18n/utils";

/**
 * Sosyal Medya Kartı Bileşeni
 * 
 * @returns {JSX.Element} Sosyal medya kartı
 */
function SocialMediaCard() {
  const { locale } = useTranslation();
  const socialMedia = resumeData.hero.socialMedia;

  return (
    <Card>
      <CardHeader
        title={getTranslation("sections.social", locale)}
      />

      {/* Sosyal Medya Bağlantıları */}
      <CardContent className="social-content">
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
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(SocialMediaCard); 