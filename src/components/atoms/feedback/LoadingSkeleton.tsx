/**
 * Yükleme İskeleti Bileşeni
 * 
 * Sayfa içeriği yüklenirken gösterilen animasyonlu yükleme göstergesi.
 * Material-UI Skeleton bileşenini temel alır ve gelişmiş özellikler ekler:
 * - Özelleştirilebilir yükseklik
 * - Opsiyonel başlık gösterimi
 * - Dalga animasyonu efekti
 * - Responsive tasarım
 * - Tema renkleri ile uyumlu tasarım
 * 
 * @component
 * @example
 * ```tsx
 * // Başlıklı yükleme iskeleti
 * <LoadingSkeleton 
 *   height={200} 
 *   title="Yükleniyor..." 
 * />
 * 
 * // Başlıksız yükleme iskeleti
 * <LoadingSkeleton 
 *   height={300} 
 *   withTitle={false} 
 * />
 * ```
 */

'use client';

import { Box, Skeleton, Typography } from "@mui/material";
import { memo } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

/**
 * Yükleme İskeleti Props Interface
 * 
 * @interface LoadingSkeletonProps
 * @property {number} height - İskelet yüksekliği (piksel cinsinden)
 * @property {string} [title] - Gösterilecek başlık metni (opsiyonel)
 * @property {boolean} [withTitle=true] - Başlık gösterilip gösterilmeyeceği
 */
interface LoadingSkeletonProps {
  height: number;
  title?: string;
  withTitle?: boolean;
}

/**
 * Yükleme İskeleti Bileşeni
 * 
 * @param {LoadingSkeletonProps} props - Bileşen props'ları
 * @returns {JSX.Element} Yükleme iskeleti arayüzü
 */
function LoadingSkeleton({ 
  height, 
  title, 
  withTitle = true 
}: LoadingSkeletonProps) {
  // Tema renklerini al
  const colors = useThemeColors();

  return (
    <Box>
      {/* Başlık Bölümü (Opsiyonel) */}
      {withTitle && (
        <Box mb={2}>
          <Skeleton 
            variant="text" 
            width={200}
            sx={{
              bgcolor: colors.surface,
            }}
          >
            <Typography variant="h5">{title}</Typography>
          </Skeleton>
        </Box>
      )}

      {/* Ana İskelet Bölümü */}
      <Skeleton
        variant="rectangular"
        height={height}
        animation="wave"
        sx={{
          borderRadius: 2,
          bgcolor: colors.surface,
          // Dalga animasyonu için gradient efekti
          '&::after': {
            background: `linear-gradient(
              90deg, 
              transparent, 
              ${colors.primary}10, 
              transparent
            )`
          }
        }}
      />
    </Box>
  );
}

// Gereksiz yeniden render'ları önlemek için memo kullan
export default memo(LoadingSkeleton); 