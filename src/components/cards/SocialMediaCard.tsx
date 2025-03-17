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
  SxProps,
  Theme,
} from "@mui/material";
import { FaMediumM, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import resumeData from "@/config/resume.json";
import { memo } from "react";
import { IconType } from "react-icons";

// Kart stilleri
const cardStyles: SxProps<Theme> = {
  bgcolor: 'background.paper',
  borderRadius: '16px',
  position: "relative",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: '0.5px solid',
  borderColor: 'border.default',
  '&:hover': {
    transform: "translateY(-4px)",
    borderColor: 'border.hover',
  },
};

// Kart başlık stilleri
const cardHeaderStyles: SxProps<Theme> = {
  padding: '24px',
  backdropFilter: 'blur(4px)',
  borderBottom: '0.5px solid',
  borderColor: 'border.default',
  '& .MuiCardHeader-title': {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: 1.3,
    transition: "all 0.2s ease-in-out",
  },
};

// Sosyal medya içerik konteynır stilleri
const socialContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 3,
};

// Sosyal medya bağlantı stilleri
const socialLinkStyles: SxProps<Theme> = {
  textDecoration: 'none',
  color: 'text.primary',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: 'primary.main',
  },
};

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
    <Card sx={cardStyles}>
      <CardHeader
        title={t("sections.social")}
        sx={cardHeaderStyles}
      />

      {/* Sosyal Medya Bağlantıları */}
      <CardContent sx={socialContentStyles}>
        {Object.entries(socialLinks).map(([key, { url, icon }]) => (
          url && (
            <Box
              key={key}
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              sx={socialLinkStyles}
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