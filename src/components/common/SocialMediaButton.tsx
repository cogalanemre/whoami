/**
 * Sosyal Medya Buton Bileşeni
 *
 * Sosyal medya bağlantıları için özelleştirilmiş, animasyonlu ikonlu buton.
 * Material-UI IconButton bileşenini temel alır ve ek özellikler ekler:
 * - Özel kenarlık ve bulanıklık efekti
 * - Hover durumunda yukarı hareket animasyonu
 * - Özelleştirilebilir ikon ve bağlantı özellikleri
 *
 * @component
 * @example
 * ```tsx
 * import { FaGithub } from 'react-icons/fa';
 *
 * <SocialMediaButton
 *   icon={FaGithub}
 *   href="https://github.com/username"
 *   target="_blank"
 *   rel="noopener noreferrer"
 * />
 * ```
 */

import { IconButton, IconButtonProps } from '@mui/material';
import { IconType } from 'react-icons';

/**
 * Sosyal Medya Buton Props Interface
 *
 * @interface SocialMediaButtonProps
 * @extends {Omit<IconButtonProps, 'children'>} - IconButton'dan children prop'u hariç tüm özellikleri alır
 * @property {IconType} icon - React-icons kütüphanesinden bir ikon komponenti
 * @property {string} href - Butonun yönlendireceği URL
 * @property {string} [target] - Bağlantının açılacağı hedef (örn: "_blank")
 * @property {string} [rel] - Bağlantının ilişki özellikleri (örn: "noopener noreferrer")
 */
interface SocialMediaButtonProps extends Omit<IconButtonProps, 'children'> {
  icon: IconType;
  href: string;
  target?: string;
  rel?: string;
}

// Stil tanımlamaları
const socialMediaButtonStyles = {
  border: '2px solid',
  borderColor: 'primary.main',
  backdropFilter: 'blur(4px)',
  '& > svg': {
    fontSize: '1.5rem',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'all 0.2s ease-in-out',
  },
} as const;

export default function SocialMediaButton({ icon: Icon, sx, ...props }: SocialMediaButtonProps) {
  return (
    <IconButton
      color="primary"
      size="large"
      sx={{
        ...socialMediaButtonStyles,
        ...sx,
      }}
      {...props}
    >
      <Icon />
    </IconButton>
  );
}
