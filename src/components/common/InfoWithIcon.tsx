/**
 * İkon ile Bilgi Gösterimi Bileşeni
 *
 * Bir ikon ve yanında metin içeren bilgi gösterimi komponenti.
 * Font Awesome ikonlarını kullanarak ikon ve metin kombinasyonu oluşturur.
 * Özellikler:
 * - Özelleştirilebilir ikon
 * - Tema renkleriyle uyumlu tasarım
 * - Ayarlanabilir yazı boyutu
 * - Responsive tasarım
 * - Yatay hizalama
 *
 * @component
 * @example
 * ```tsx
 * import { FaEnvelope } from 'react-icons/fa';
 *
 * <InfoWithIcon
 *   icon={FaEnvelope}
 *   text="ornek@email.com"
 *   fontSize="0.875rem"
 * />
 * ```
 */

import { Box, Typography } from '@mui/material';
import { IconType } from 'react-icons';

// Stil tanımlamaları
const STYLE = {
  CONTAINER: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    py: 0.75,
  },
  ICON_WRAPPER: {
    color: 'primary.main',
    fontSize: '1em',
  },
  TEXT: (fontSize: string) => ({
    color: 'text.secondary',
    fontSize,
  }),
} as const;

/**
 * İkon ile Bilgi Gösterimi Props Interface
 *
 * @interface InfoWithIconProps
 * @property {IconType} icon - Gösterilecek Font Awesome ikonu
 * @property {string} text - İkonun yanında gösterilecek metin
 * @property {string} [fontSize="1rem"] - Metin boyutu (opsiyonel, varsayılan: 1rem)
 */
interface InfoWithIconProps {
  icon: IconType;
  text: string;
  fontSize?: string;
}

/**
 * İkon ile Bilgi Gösterimi Bileşeni
 *
 * @param {InfoWithIconProps} props - Bileşen props'ları
 * @returns {JSX.Element} İkon ve metin içeren bilgi gösterimi
 */
export default function InfoWithIcon({ icon: Icon, text, fontSize = '1rem' }: InfoWithIconProps) {
  return (
    <Box sx={STYLE.CONTAINER}>
      {/* İkon Bileşeni */}
      <Box sx={STYLE.ICON_WRAPPER}>
        <Icon />
      </Box>

      {/* Metin Bileşeni */}
      <Typography variant="body2" sx={STYLE.TEXT(fontSize)}>
        {text}
      </Typography>
    </Box>
  );
}
