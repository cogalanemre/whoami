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

import { Typography, Box, SvgIconProps } from "@mui/material";

// Stil tanımlamaları
const containerStyles = {
  mb: 6,
} as const;

const titleStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  // Responsive font boyutu
  fontSize: { 
    xs: "1.5rem",  // Mobil
    sm: "1.75rem", // Tablet
    md: "1.75rem"  // Desktop
  },
  position: "relative",
  // Gradient alt çizgi efekti
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: "40px",
    height: "3px",
    background: "linear-gradient(90deg, primary.main, transparent)",
    borderRadius: "4px",
  },
} as const;

const iconStyles = {
  color: "primary.main",
  fontSize: "2rem",
} as const;

const subtitleStyles = {
  ml: 2,
  color: "primary.main",
  fontStyle: "italic",
} as const;

/**
 * Bölüm Başlığı Props Interface
 * 
 * @interface SectionTitleProps
 * @property {React.ComponentType<SvgIconProps>} icon - Başlık yanında gösterilecek Material-UI ikonu
 * @property {string} title - Başlık metni
 * @property {string} [subtitle] - Alt başlık metni (opsiyonel)
 */
interface SectionTitleProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  subtitle?: string;
}

/**
 * Bölüm Başlığı Bileşeni
 * 
 * @param {SectionTitleProps} props - Bileşen props'ları
 * @returns {JSX.Element} Başlık bileşeni
 */
export default function SectionTitle({ 
  icon: Icon, 
  title, 
  subtitle 
}: SectionTitleProps) {
  return (
    <Box sx={containerStyles}>
      {/* Ana Başlık Konteyner */}
      <Typography
        variant="h2"
        gutterBottom
        sx={titleStyles}
      >
        {/* Başlık İkonu */}
        <Icon sx={iconStyles} />

        {/* Başlık Metni */}
        {title}

        {/* Opsiyonel Alt Başlık */}
        {subtitle && (
          <Typography
            component="span"
            variant="h6"
            sx={subtitleStyles}
          >
            ({subtitle})
          </Typography>
        )}
      </Typography>
    </Box>
  );
} 