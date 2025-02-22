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
 *   colors={themeColors}
 *   fontSize="0.875rem"
 * />
 * ```
 */

import { Box, Typography, SvgIconProps } from "@mui/material";
import { ThemeColors } from "@/types";

/**
 * İkon ile Bilgi Gösterimi Props Interface
 * 
 * @interface InfoWithIconProps
 * @property {React.ComponentType<SvgIconProps>} icon - Gösterilecek Material-UI ikonu
 * @property {string} text - İkonun yanında gösterilecek metin
 * @property {ThemeColors} colors - Tema renkleri (primary ve secondary)
 * @property {string} [fontSize="1rem"] - Metin boyutu (opsiyonel, varsayılan: 1rem)
 */
interface InfoWithIconProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
  colors: ThemeColors;
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
  colors,
  fontSize = "1rem",
}: InfoWithIconProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {/* İkon Bileşeni */}
      <Icon
        sx={{
          color: colors.primary,
          fontSize: "inherit", // Parent'tan gelen font boyutunu kullan
        }}
      />

      {/* Metin Bileşeni */}
      <Typography
        variant="body2"
        sx={{
          color: colors.secondary,
          fontSize, // Props'tan gelen font boyutunu kullan
        }}
      >
        {text}
      </Typography>
    </Box>
  );
} 