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
import { memo, useMemo } from 'react';
import SocialMediaButton from '@/components/common/SocialMediaButton';
import DownloadButton from '@/components/common/DownloadButton';
import type { SocialMedia } from '@/types';
import { STYLE } from '@/styles/common/ActionButtons.styles';

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

type SocialMediaPlatform = keyof typeof SOCIAL_MEDIA_ICONS;

const filterAvailableSocialMedia = (socialMedia: Partial<SocialMedia>) => 
  Object.entries(socialMedia).filter(([, value]) => value);

const createSocialMediaButton = (platform: string, url: string) => {
  const icon = SOCIAL_MEDIA_ICONS[platform as SocialMediaPlatform];
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
};

interface ActionButtonsProps {
  socialMedia: Partial<SocialMedia>;
}

function ActionButtons({ socialMedia }: ActionButtonsProps) {
  const availableSocialMedia = useMemo(() => 
    filterAvailableSocialMedia(socialMedia),
    [socialMedia]
  );

  const socialMediaButtons = useMemo(() => 
    availableSocialMedia.map(([platform, url]) => createSocialMediaButton(platform, url)),
    [availableSocialMedia]
  );

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={STYLE.CONTAINER}
    >
      {socialMediaButtons}
      <DownloadButton />
    </Stack>
  );
}

export default memo(ActionButtons); 