import { Box, Grid, Typography } from "@mui/material";
import { Article } from "@mui/icons-material";
import { motion } from "framer-motion";
import { BlogPost } from "@/types";
import BlogCard from "@/components/molecules/cards/BlogCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

const MotionBox = motion(Box);

interface BlogSectionProps {
  blogPosts: BlogPost[];
  loading: boolean;
  sectionTitle: string;
  loadingText: string;
  noPostsText: string;
}

// Section container stilleri
const sectionStyles = {
  mt: 4,
};

// Grid container stilleri
const gridContainerStyles = {
  spacing: { xs: 2, sm: 3 },
};

// Grid item stilleri
const gridItemStyles = {
  xs: 12,
  sm: 6,
  md: 4,
};

// Animasyon özellikleri
const motionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.1 },
};

/**
 * Blog Section Bileşeni
 * 
 * Medium'dan çekilen blog yazılarını grid yapısında gösteren bölüm.
 * Yükleme durumu ve boş durum kontrolü yapılır.
 * Her blog yazısı için ayrı bir kart oluşturur ve animasyonlu bir şekilde gösterir.
 * 
 * @param {BlogPost[]} blogPosts - Blog yazıları listesi
 * @param {boolean} loading - Yükleme durumu
 * @param {string} sectionTitle - Bölüm başlığı
 * @param {string} loadingText - Yükleme metni
 * @param {string} noPostsText - Blog yazısı yokken gösterilecek metin
 * @returns {JSX.Element} Blog section bileşeni
 */
function BlogSection({ 
  blogPosts,
  loading,
  sectionTitle,
  loadingText,
  noPostsText
}: BlogSectionProps) {
  return (
    <Box sx={sectionStyles}>
      <SectionTitle
        icon={Article}
        title={sectionTitle}
      />
      <Box>
        <Grid container sx={gridContainerStyles}>
          {loading ? (
            <Grid item xs={12}>
              <Typography align="center">
                {loadingText}
              </Typography>
            </Grid>
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Grid item {...gridItemStyles} key={post.link}>
                <MotionBox {...motionProps}>
                  <BlogCard post={post} />
                </MotionBox>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center">
                {noPostsText}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

// Bileşeni memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(BlogSection); 