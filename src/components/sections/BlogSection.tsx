/**
 * Blog Bölümü Bileşeni
 * 
 * Medium'dan çekilen blog yazılarını grid yapısında gösteren bölüm.
 * Özellikler:
 * - Responsive flex yapısı
 * - Yükleme durumu gösterimi
 * - Boş durum kontrolü
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

import { Box, Typography } from "@mui/material";
import { Article } from "@mui/icons-material";
import { BlogPost } from "@/types";
import BlogCard from "@/components/cards/BlogCard";
import SectionTitle from "@/components/common/SectionTitle";
import { memo } from "react";

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
    mt: 5,
  },
  CONTAINER: {
    display: 'flex',
    flexWrap: 'wrap',
    mx: -2,
    width: 'calc(100% + 32px)',
  },
  ITEM: {
    width: {
      xs: '100%',
      sm: '50%',
      md: '33.333%'
    },
    p: 2,
  },
  MESSAGE: {
    width: '100%',
    textAlign: 'center',
  }
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

      {/* Blog Kartları Container */}
      <Box sx={STYLES.CONTAINER}>
        {/* Yükleme Durumu */}
        {loading ? (
          <Box sx={STYLES.MESSAGE}>
            <Typography>
              {loadingText}
            </Typography>
          </Box>
        ) : blogPosts.length > 0 ? (
          // Blog Kartları
          blogPosts.map((post) => (
            <Box sx={STYLES.ITEM} key={post.link}>
              <BlogCard post={post} />
            </Box>
          ))
        ) : (
          // Boş Durum
          <Box sx={STYLES.MESSAGE}>
            <Typography>
              {noPostsText}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(BlogSection); 