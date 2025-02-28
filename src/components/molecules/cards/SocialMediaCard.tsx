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
          <Box
            component="a"
            href={socialMedia.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
            }}
          >
            <InfoWithIcon
              icon={FaGithub}
              text={socialMedia.github.replace("https://", "")}
              fontSize="1rem"
            />
          </Box>
        )}

        {/* LinkedIn */}
        {socialMedia.linkedin && (
          <Box
            component="a"
            href={socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
            }}
          >
            <InfoWithIcon
              icon={FaLinkedinIn}
              text={socialMedia.linkedin.replace("https://", "")}
              fontSize="1rem"
            />
          </Box>
        )}

        {/* Medium */}
        {socialMedia.medium && (
          <Box
            component="a"
            href={socialMedia.medium}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
            }}
          >
            <InfoWithIcon
              icon={FaMediumM}
              text={socialMedia.medium.replace("https://", "")}
              fontSize="1rem"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(SocialMediaCard); 