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

import { Card, CardContent, CardHeader, Box, Typography } from '@mui/material';
import { FaMediumM, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import InfoWithIcon from '@/components/common/InfoWithIcon';
import resumeData from '@/config/resume.json';
import { memo, useMemo } from 'react';
import { IconType } from 'react-icons';
import { THEME_STYLE } from '@/theme/theme';

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

  // Stil objelerini memoize et
  const STYLE = useMemo(() => ({
    CARD: {
      ...THEME_STYLE.CARD,
      p: 0,
    },
    CARD_HEADER: {
      ...THEME_STYLE.CARD_HEADER,
    },
    CARD_CONTENT: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
    TITLE: {
      ...THEME_STYLE.TITLE,
    },
  }), []);

  // Sosyal medya bağlantıları konfigürasyonunu memoize et
  const socialLinks = useMemo<Record<string, SocialLink>>(() => ({
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
  }), [socialMedia.github, socialMedia.linkedin, socialMedia.medium]);

  return (
    <Card sx={STYLE.CARD}>
      <CardHeader
        title={
          <Typography variant="h3" sx={{ ...STYLE.TITLE }}>
            {t('sections.social')}
          </Typography>
        }
        sx={STYLE.CARD_HEADER}
      />

      {/* Sosyal Medya Bağlantıları */}
      <CardContent>
        <Box sx={STYLE.CARD_CONTENT}>
          {Object.entries(socialLinks).map(
            ([key, { url, icon }]) =>
              url && (
                <InfoWithIcon
                  key={key}
                  icon={icon}
                  text={url.replace('https://', '')}
                  fontSize="1rem"
                />
              )
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(SocialMediaCard);
