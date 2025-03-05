/**
 * Sosyal Medya Butonları Bileşeni
 * 
 * Kullanıcının sosyal medya bağlantılarını gösteren buton grubu.
 * Her platform için özel ikon ve bağlantı içerir.
 * 
 * Özellikler:
 * - Responsive tasarım
 * - Dinamik buton oluşturma
 * - Platform bazlı özel davranış (mail için mailto:)
 * - Güvenli link açma (noopener, noreferrer)
 * - Boş/geçersiz bağlantıları otomatik filtreleme
 * 
 * @component
 * @example
 * ```tsx
 * <SocialMediaButtons
 *   socialMedia={{
 *     github: "https://github.com/username",
 *     linkedin: "https://linkedin.com/in/username",
 *     mail: "user@example.com"
 *   }}
 * />
 * ```
 */

import { Stack } from "@mui/material";
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
} from "react-icons/fa";
import { memo } from "react";
import SocialMediaButton from "@/components/common/SocialMediaButton";
import type { SocialMedia } from "@/types";

/**
 * Platform bazlı ikon eşleştirmeleri
 * Her sosyal medya platformu için ilgili React-Icons bileşeni
 */
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

/**
 * Sosyal Medya Butonları Props Interface
 * 
 * @interface SocialMediaButtonsProps
 * @property {Partial<SocialMedia>} socialMedia - Sosyal medya bağlantıları
 */
interface SocialMediaButtonsProps {
  socialMedia: Partial<SocialMedia>;
}

/**
 * Sosyal Medya Butonları Bileşeni
 * 
 * @param {SocialMediaButtonsProps} props - Bileşen props'ları
 * @returns {JSX.Element | null} Sosyal medya butonları grubu veya null
 */
function SocialMediaButtons({ socialMedia }: SocialMediaButtonsProps) {
  // Geçerli bağlantıları filtrele
  const availableSocialMedia = Object.entries(socialMedia)
    .filter(([platform, value]) => {
      // Mail için özel kontrol (boş string olmamalı)
      if (platform === 'mail') {
        return value && value.trim() !== '';
      }
      return value;
    });

  // Hiç bağlantı yoksa null döndür
  if (availableSocialMedia.length === 0) {
    return null;
  }

  return (
    <Stack 
      direction="row" 
      spacing={3} 
      sx={{ 
        mb: 4,
        // Responsive aralık
        '& > *': {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          }
        }
      }}
    >
      {availableSocialMedia.map(([platform, url]) => {
        // Platform için ikon kontrolü
        const icon = SOCIAL_MEDIA_ICONS[platform as keyof typeof SOCIAL_MEDIA_ICONS];
        if (!icon || !url) return null;

        // Mail için özel href formatı
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

// Gereksiz render'ları önlemek için memo kullan
export default memo(SocialMediaButtons); 