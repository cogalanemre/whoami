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
  Box,
} from "@mui/material";
import { FaMediumM, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import resumeData from "@/config/resume.json";
import { memo } from "react";
import { IconType } from "react-icons";

interface SocialLink {
  url: string;
  icon: IconType;
}

/**
 * Sosyal Medya Kartı Bileşeni
 * 
 * @returns {JSX.Element} Sosyal medya kartı
 */
function SocialMediaCard() {
  const { t } = useTranslation();
  const socialMedia = resumeData.hero.socialMedia;

  // Sosyal medya bağlantıları konfigürasyonu
  const socialLinks: Record<string, SocialLink> = {
    github: {
      url: socialMedia.github,
      icon: FaGithub,
    },
    linkedin: {
      url: socialMedia.linkedin,
      icon: FaLinkedinIn,
    },
    medium: {
      url: socialMedia.medium,
      icon: FaMediumM,
    },
  };

  return (
    <Card>
      <CardHeader
        title={t("sections.social")}
      />

      {/* Sosyal Medya Bağlantıları */}
      <CardContent className="social-content">
        {Object.entries(socialLinks).map(([key, { url, icon }]) => (
          url && (
            <Box
              key={key}
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <InfoWithIcon
                icon={icon}
                text={url.replace("https://", "")}
                fontSize="1rem"
              />
            </Box>
          )
        ))}
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(SocialMediaCard); 