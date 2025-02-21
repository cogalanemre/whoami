'use client';

import { Box, Skeleton, Typography } from "@mui/material";
import { memo } from "react";

interface LoadingSkeletonProps {
  height: number;
  title?: string;
  withTitle?: boolean;
}

/**
 * Gelişmiş yükleme durumu göstergesi
 * Skeleton animasyonu ve opsiyonel başlık içerir
 */
function LoadingSkeleton({ height, title, withTitle = true }: LoadingSkeletonProps) {
  return (
    <Box>
      {withTitle && (
        <Box mb={2}>
          <Skeleton variant="text" width={200}>
            <Typography variant="h5">{title}</Typography>
          </Skeleton>
        </Box>
      )}
      <Skeleton
        variant="rectangular"
        height={height}
        animation="wave"
        sx={{
          borderRadius: 2,
          bgcolor: 'grey.100',
          '&::after': {
            background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent)'
          }
        }}
      />
    </Box>
  );
}

export default memo(LoadingSkeleton); 