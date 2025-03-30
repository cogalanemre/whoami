import { Stack } from '@mui/material';
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMediumM,
  FaEnvelope,
  FaGlobe,
} from 'react-icons/fa';
import { memo } from 'react';
import SocialMediaButton from '@/components/common/SocialMediaButton';
import DownloadButton from '@/components/common/DownloadButton';
import type { SocialMedia } from '@/types';
import type { CvFile } from '@/utils/getCvFiles';

const SOCIAL_MEDIA_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  mail: FaEnvelope,
  twitter: FaTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  website: FaGlobe,
  medium: FaMediumM,
} as const;

const STYLE = {
  CONTAINER: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
} as const;

interface ActionButtonsProps {
  socialMedia: Partial<SocialMedia>;
  cvFiles: CvFile[];
  locale: 'tr' | 'en';
}

function ActionButtons({ socialMedia, cvFiles, locale }: ActionButtonsProps) {
  // Geçerli sosyal medya bağlantılarını filtrele
  const availableSocialMedia = Object.entries(socialMedia).filter(([platform, value]) => {
    if (platform === 'mail') {
      return value && value.trim() !== '';
    }
    return value;
  });

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={STYLE.CONTAINER}
    >
      {availableSocialMedia.map(([platform, url]) => {
        const icon = SOCIAL_MEDIA_ICONS[platform as keyof typeof SOCIAL_MEDIA_ICONS];
        if (!icon || !url) return null;

        const href = platform === 'mail' ? `mailto:${url}` : url;

        return (
          <SocialMediaButton
            key={platform}
            icon={icon}
            href={href}
            target={platform === 'mail' ? undefined : '_blank'}
            rel={platform === 'mail' ? undefined : 'noopener noreferrer'}
          />
        );
      })}
      <DownloadButton cvFiles={cvFiles} locale={locale} />
    </Stack>
  );
}

export default memo(ActionButtons); 