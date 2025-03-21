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

import { Box, Skeleton, Typography, useTheme, Theme } from '@mui/material';
import { memo } from 'react';

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

// Stil tanımlamaları
const titleContainerStyles = {
  mb: 2,
} as const;

const getTitleSkeletonStyles = (theme: Theme) => ({
  bgcolor: theme.palette.background.paper,
});

const getMainSkeletonStyles = (theme: Theme) => ({
  borderRadius: 2,
  bgcolor: theme.palette.background.paper,
  // Dalga animasyonu için gradient efekti
  '&::after': {
    background: `linear-gradient(
      90deg, 
      transparent, 
      ${theme.palette.primary.main}10, 
      transparent
    )`,
  },
});

/**
 * Yükleme İskeleti Bileşeni
 *
 * @param {LoadingSkeletonProps} props - Bileşen props'ları
 * @returns {JSX.Element} Yükleme iskeleti arayüzü
 */
function LoadingSkeleton({ height, title, withTitle = true }: LoadingSkeletonProps) {
  // Tema renklerini al
  const theme = useTheme();

  return (
    <Box>
      {/* Başlık Bölümü (Opsiyonel) */}
      {withTitle && (
        <Box sx={titleContainerStyles}>
          <Skeleton variant="text" width={200} sx={getTitleSkeletonStyles(theme)}>
            <Typography variant="h5">{title}</Typography>
          </Skeleton>
        </Box>
      )}

      {/* Ana İskelet Bölümü */}
      <Skeleton
        variant="rectangular"
        height={height}
        animation="wave"
        sx={getMainSkeletonStyles(theme)}
      />
    </Box>
  );
}

// Gereksiz yeniden render'ları önlemek için memo kullan
export default memo(LoadingSkeleton);
