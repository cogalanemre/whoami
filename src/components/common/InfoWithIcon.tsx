/**
 * İkon ile Bilgi Gösterimi Bileşeni
 * 
 * Bir ikon ve yanında metin içeren bilgi gösterimi komponenti.
 * Material-UI bileşenlerini kullanarak ikon ve metin kombinasyonu oluşturur.
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
 * import { LocationOn } from '@mui/icons-material';
 * 
 * <InfoWithIcon
 *   icon={LocationOn}
 *   text="İstanbul, Türkiye"
 *   fontSize="0.875rem"
 * />
 * ```
 */

import { Box, Typography, SvgIconProps } from "@mui/material";

// Stil tanımlamaları
const containerStyles = {
  display: "flex", 
  alignItems: "center", 
  gap: 1.5,
  py: 0.75,
} as const;

const iconStyles = {
  color: "primary.main",
  fontSize: "1.2em",
  transition: "color 0.2s ease-in-out",
} as const;

const textStyles = (fontSize: string) => ({
  color: "text.secondary",
  fontSize,
  letterSpacing: "0.3px",
  transition: "color 0.2s ease-in-out",
} as const);

/**
 * İkon ile Bilgi Gösterimi Props Interface
 * 
 * @interface InfoWithIconProps
 * @property {React.ComponentType<SvgIconProps>} icon - Gösterilecek Material-UI ikonu
 * @property {string} text - İkonun yanında gösterilecek metin
 * @property {string} [fontSize="1rem"] - Metin boyutu (opsiyonel, varsayılan: 1rem)
 */
interface InfoWithIconProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
  fontSize?: string;
}

/**
 * İkon ile Bilgi Gösterimi Bileşeni
 * 
 * @param {InfoWithIconProps} props - Bileşen props'ları
 * @returns {JSX.Element} İkon ve metin içeren bilgi gösterimi
 */
export default function InfoWithIcon({
  icon: Icon,
  text,
  fontSize = "1rem",
}: InfoWithIconProps) {
  return (
    <Box sx={containerStyles}>
      {/* İkon Bileşeni */}
      <Icon sx={iconStyles} />

      {/* Metin Bileşeni */}
      <Typography
        variant="body2"
        sx={textStyles(fontSize)}
      >
        {text}
      </Typography>
    </Box>
  );
} 