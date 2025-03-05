'use client';

import { Box, Container, Typography } from "@mui/material";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

/**
 * Test Sayfası
 * LoadingSkeleton bileşeninin farklı konfigürasyonlarını gösterir
 */
export default function TestPage() {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          LoadingSkeleton Test Sayfası
        </Typography>

        {/* Test 1: Başlıklı Skeleton */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            1. Başlıklı Skeleton (200px)
          </Typography>
          <LoadingSkeleton 
            height={200} 
            title="Yükleniyor..." 
          />
        </Box>

        {/* Test 2: Başlıksız Skeleton */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            2. Başlıksız Skeleton (300px)
          </Typography>
          <LoadingSkeleton 
            height={300} 
            withTitle={false} 
          />
        </Box>

        {/* Test 3: Kısa Skeleton */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            3. Kısa Skeleton (100px)
          </Typography>
          <LoadingSkeleton 
            height={100} 
            title="Kısa İçerik" 
          />
        </Box>

        {/* Test 4: Uzun Skeleton */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            4. Uzun Skeleton (500px)
          </Typography>
          <LoadingSkeleton 
            height={500} 
            title="Uzun İçerik" 
          />
        </Box>
      </Box>
    </Container>
  );
} 