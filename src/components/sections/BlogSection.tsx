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
 *   sectionTitle="Blog Yazılarım"
 *   noPostsText="Henüz blog yazısı yok"
 * />
 * ```
 */

import { Box, Typography } from '@mui/material';
import { FaNewspaper } from 'react-icons/fa';
import { BlogPost } from '@/types';
import BlogCard from '@/components/cards/BlogCard';
import SectionTitle from '@/components/common/SectionTitle';
import { memo } from 'react';
import { blogSectionStyles as STYLES } from '@/styles/sections/BlogSection.styles';

/**
 * Blog Bölümü Props Interface
 *
 * @interface BlogSectionProps
 * @property {BlogPost[]} blogPosts - Blog yazıları listesi
 * @property {string} sectionTitle - Bölüm başlığı
 * @property {string} noPostsText - Blog yazısı olmadığında gösterilecek metin
 */
interface BlogSectionProps {
  blogPosts: BlogPost[];
  sectionTitle: string;
  noPostsText: string;
}

/**
 * Blog Bölümü Bileşeni
 *
 * @param {BlogSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Blog bölümü
 */
function BlogSection({
  blogPosts,
  sectionTitle,
  noPostsText,
}: BlogSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle icon={FaNewspaper} title={sectionTitle} />

      {/* Blog Kartları Container */}
      <Box sx={STYLES.CONTAINER}>
        {/* Yükleme Durumu */}
        {blogPosts.length > 0 ? (
          // Blog Kartları
          blogPosts.map(post => (
            <Box sx={STYLES.ITEM} key={post.link}>
              <BlogCard post={post} />
            </Box>
          ))
        ) : (
          // Boş Durum
          <Box sx={STYLES.MESSAGE}>
            <Typography>{noPostsText}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(BlogSection);
