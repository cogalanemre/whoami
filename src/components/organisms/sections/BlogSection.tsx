/**
 * Blog Bölümü Bileşeni
 * 
 * Medium'dan çekilen blog yazılarını grid yapısında gösteren bölüm.
 * Özellikler:
 * - Responsive grid yapısı
 * - Yükleme durumu gösterimi
 * - Boş durum kontrolü
 * - Framer Motion animasyonları
 * - Memo optimizasyonu
 * - Özelleştirilebilir metinler
 * 
 * @component
 * @example
 * ```tsx
 * <BlogSection
 *   blogPosts={posts}
 *   loading={false}
 *   sectionTitle="Blog Yazılarım"
 *   loadingText="Yazılar yükleniyor..."
 *   noPostsText="Henüz blog yazısı yok"
 * />
 * ```
 */

import { Box, Grid, Typography } from "@mui/material";
import { Article } from "@mui/icons-material";
import { motion } from "framer-motion";
import { BlogPost } from "@/types";
import BlogCard from "@/components/molecules/cards/BlogCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

/**
 * Framer Motion için Box bileşeni
 * Blog kartları için animasyon özelliği sağlar
 */
const MotionBox = motion(Box);

/**
 * Blog Bölümü Props Interface
 * 
 * @interface BlogSectionProps
 * @property {BlogPost[]} blogPosts - Blog yazıları listesi
 * @property {boolean} loading - Yükleme durumu
 * @property {string} sectionTitle - Bölüm başlığı
 * @property {string} loadingText - Yükleme durumunda gösterilecek metin
 * @property {string} noPostsText - Blog yazısı olmadığında gösterilecek metin
 */
interface BlogSectionProps {
  blogPosts: BlogPost[];
  loading: boolean;
  sectionTitle: string;
  loadingText: string;
  noPostsText: string;
}

/**
 * Stil sabitleri
 * Material-UI theme sistem ile uyumlu stil tanımlamaları
 */
const STYLES = {
  SECTION: {
    mt: { xs: 4, sm: 6, md: 8 },
  },
  GRID_CONTAINER: {
    spacing: { xs: 3, sm: 4 },
    justifyContent: "flex-start",
    mx: "-16px",
    width: "calc(100% + 32px)",
  },
  GRID_ITEM: {
    xs: 12,
    sm: 6,
    md: 4,
    p: { xs: 1, sm: 2 },
  },
  MOTION_CONTAINER: {
    height: "100%",
    "& > *": {
      height: "100%",
    },
  },
} as const;

/**
 * Framer Motion animasyon sabitleri
 * Blog kartları için giriş animasyonu tanımları
 */
const MOTION_PROPS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.1 },
} as const;

/**
 * Blog Bölümü Bileşeni
 * 
 * @param {BlogSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Blog bölümü
 */
function BlogSection({ 
  blogPosts,
  loading,
  sectionTitle,
  loadingText,
  noPostsText
}: BlogSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle
        icon={Article}
        title={sectionTitle}
      />

      {/* Blog Kartları Grid Container */}
      <Grid 
        container 
        sx={STYLES.GRID_CONTAINER}
      >
        {/* Yükleme Durumu */}
        {loading ? (
          <Grid item xs={12}>
            <Typography align="center">
              {loadingText}
            </Typography>
          </Grid>
        ) : blogPosts.length > 0 ? (
          // Blog Kartları
          blogPosts.map((post) => (
            <Grid item {...STYLES.GRID_ITEM} key={post.link}>
              <MotionBox {...MOTION_PROPS} sx={STYLES.MOTION_CONTAINER}>
                <BlogCard post={post} />
              </MotionBox>
            </Grid>
          ))
        ) : (
          // Boş Durum
          <Grid item xs={12}>
            <Typography align="center">
              {noPostsText}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(BlogSection); 