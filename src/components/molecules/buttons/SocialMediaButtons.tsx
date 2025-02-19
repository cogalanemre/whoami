import { Stack } from "@mui/material";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMediumM,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import SocialMediaButton from "@/components/atoms/buttons/SocialMediaButton";
import { SocialMedia } from "@/types";

const SOCIAL_MEDIA_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: FaEnvelope,
  twitter: FaTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  website: FaGlobe,
  medium: FaMediumM,
} as const;

interface SocialMediaButtonsProps {
  socialMedia: Partial<SocialMedia>;
}

export default function SocialMediaButtons({ socialMedia }: SocialMediaButtonsProps) {
  const availableSocialMedia = Object.entries(socialMedia)
    .filter(([platform, value]) => {
      if (platform === 'mail') {
        return value && value.trim() !== '';
      }
      return value;
    });

  if (availableSocialMedia.length === 0) {
    return null;
  }

  return (
    <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
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
    </Stack>
  );
} 