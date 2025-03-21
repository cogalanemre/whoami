/**
 * Bölüm Başlığı Bileşeni
 *
 * Sayfa bölümlerinin başlıklarını göstermek için kullanılan özelleştirilmiş başlık komponenti.
 * Material-UI bileşenlerini kullanarak gelişmiş bir başlık tasarımı sunar.
 *
 * Özellikler:
 * - İkon entegrasyonu
 * - Alt başlık desteği (opsiyonel)
 * - Responsive tasarım
 * - Gradient alt çizgi efekti
 * - Özelleştirilmiş tipografi
 *
 * @component
 * @example
 * ```tsx
 * import { WorkHistory } from '@mui/icons-material';
 *
 * <SectionTitle
 *   icon={WorkHistory}
 *   title="Deneyim"
 *   subtitle="5+ Yıl"
 * />
 * ```
 */

import { Typography, Box } from '@mui/material';
import { IconType } from 'react-icons';

const STYLE = {
  CONTAINER: {
    mb: 6,
  },
  TITLE: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    // Responsive font boyutu
    fontSize: {
      xs: '1.5rem', // Mobil
      sm: '1.75rem', // Tablet
      md: '1.75rem', // Desktop
    },
    position: 'relative',
  },
  ICON: {
    color: (theme) => theme.palette.primary.main,
    fontSize: '2rem',
  },
  SUBTITLE: {
    ml: 2,
    color: 'primary.main',
    fontStyle: 'italic',
  },
} as const;

/**
 * Bölüm Başlığı Props Interface
 *
 * @interface SectionTitleProps
 * @property {IconType} icon - Gösterilecek Font Awesome ikonu
 * @property {string} title - Başlık metni
 * @property {string} [subtitle] - Alt başlık metni (opsiyonel)
 */
interface SectionTitleProps {
  icon: IconType;
  title: string;
  subtitle?: string;
}

/**
 * Bölüm Başlığı Bileşeni
 *
 * @param {SectionTitleProps} props - Bileşen props'ları
 * @returns {JSX.Element} Başlık bileşeni
 */
export default function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <Box sx={STYLE.CONTAINER}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Başlık İkonu */}
        <Box sx={{ color: 'primary.main', fontSize: '2rem' }}>
          <Icon />
        </Box>
        {/* Ana Başlık Konteyner */}
        <Typography variant="h2" gutterBottom sx={STYLE.TITLE}>
          {/* Başlık Metni */}
          {title}
        </Typography>
        {/* Opsiyonel Alt Başlık */}
        {subtitle && (
          <Typography component="span" variant="h6" sx={STYLE.SUBTITLE}>
            ({subtitle})
          </Typography>
        )}
      </Box>
    </Box>
  );
}
