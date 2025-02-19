import { Box, Grid, Typography } from "@mui/material";
import { Article } from "@mui/icons-material";
import { motion } from "framer-motion";
import { BlogPost } from "@/types";
import BlogCard from "@/components/molecules/cards/BlogCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

const MotionBox = motion.create(Box);

interface BlogSectionProps {
  blogPosts: BlogPost[];
  loading: boolean;
  sectionTitle: string;
  loadingText: string;
  noPostsText: string;
}

function BlogSection({ 
  blogPosts,
  loading,
  sectionTitle,
  loadingText,
  noPostsText
}: BlogSectionProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <SectionTitle
        icon={Article}
        title={sectionTitle}
      />
      <Box>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {loading ? (
            <Grid item xs={12}>
              <Typography align="center">
                {loadingText}
              </Typography>
            </Grid>
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.link}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
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

// memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(BlogSection); 