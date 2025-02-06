'use client';

import dynamic from 'next/dynamic';
import { Box, Grid, Typography, IconButton, Stack, Avatar, Container } from '@mui/material';
import { GitHub, LinkedIn, Email, Speed, School, Article, ContactMail } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import ExperienceCard from '@/components/ExperienceCard';
import EducationCard from '@/components/EducationCard';
import BlogCard from '@/components/BlogCard';
import { personalInfo } from '@/data/personalInfo';
import { experiences } from '@/data/experiences';
import { education } from '@/data/education';
import { calculateTotalExperience } from '@/utils/dateUtils';
import { fetchBlogPosts } from '@/utils/fetchBlogPosts';
import { BlogPost } from '@/data/blog';
import { colors } from '@/theme/colors';
import type { ContactFormData } from '@/types';

// Lazy load components
const Typewriter = dynamic(() => import('@/components/Typewriter'), {
  loading: () => <Typography variant="h2" color="primary">Yükleniyor...</Typography>,
  ssr: false
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <Typography>İletişim formu yükleniyor...</Typography>,
  ssr: false
});

const MotionBox = motion(Box);

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Memoize expensive calculations
  const totalExperience = useMemo(() => 
    calculateTotalExperience(experiences), 
    []
  );

  const socialButtons = useMemo(() => (
    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
      {personalInfo.social.github && (
        <IconButton 
          color="primary" 
          size="large" 
          href={personalInfo.social.github}
          target="_blank"
          sx={{ 
            border: '2px solid',
            borderColor: 'primary.main',
            '&:hover': { 
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out'
            }
          }}
        >
          <GitHub />
        </IconButton>
      )}
      {personalInfo.social.linkedin && (
        <IconButton 
          color="primary" 
          size="large"
          href={personalInfo.social.linkedin}
          target="_blank"
          sx={{ 
            border: '2px solid',
            borderColor: 'primary.main',
            '&:hover': { 
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out'
            }
          }}
        >
          <LinkedIn />
        </IconButton>
      )}
      {personalInfo.social.email && (
        <IconButton 
          color="primary" 
          size="large"
          href={personalInfo.social.email}
          sx={{ 
            border: '2px solid',
            borderColor: 'primary.main',
            '&:hover': { 
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out'
            }
          }}
        >
          <Email />
        </IconButton>
      )}
    </Stack>
  ), []);

  if (!currentDate) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box component="main" sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
        <Grid container spacing={4}>
          {/* Hero Section */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
                <Avatar
                  sx={{
                    width: 300,
                    height: 300,
                    bgcolor: 'transparent'
                  }}
                  alt={personalInfo.name}
                  src="/profile.png"
                />
                <Box>
                  <Typography variant="h1" gutterBottom>
                    Merhaba, Ben {personalInfo.name} 👋
                  </Typography>
                  <Typewriter
                    texts={personalInfo.titles}
                    delay={150}
                  />
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', maxWidth: '800px', color: 'text.secondary' }}>
                    {personalInfo.bio}
                  </Typography>
                  {socialButtons}
                </Box>
              </Stack>
            </MotionBox>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 6 }}>
                <Speed sx={{ color: 'primary.main' }} /> 
                Deneyim 
                <Typography 
                  component="span" 
                  variant="h6" 
                  sx={{ 
                    ml: 2,
                    color: 'primary.main',
                    opacity: 0.8,
                    fontStyle: 'italic'
                  }}
                >
                  ({totalExperience})
                </Typography>
              </Typography>
              <Box sx={{ 
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '20px',
                  width: '2px',
                  height: '100%',
                  background: colors.primary.timeline,
                }
              }}>
                <Stack spacing={6}>
                  {experiences.map((experience, index) => (
                    <ExperienceCard
                      key={index}
                      experience={experience}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Education Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 6 }}>
                <School sx={{ color: 'primary.main' }} /> 
                Eğitim
              </Typography>
              <Box sx={{ 
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '10px',
                  width: '2px',
                  height: '100%',
                  background: colors.primary.timeline,
                }
              }}>
                <Stack spacing={4}>
                  {education.map((edu, index) => (
                    <EducationCard
                      key={index}
                      education={edu}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Blog Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 6 }}>
                <Article sx={{ color: 'primary.main' }} /> 
                Blog Yazılarım
              </Typography>
              <Grid container spacing={3}>
                {loading ? (
                  <Grid item xs={12}>
                    <Typography>Yazılar yükleniyor...</Typography>
                  </Grid>
                ) : blogPosts.length > 0 ? (
                  blogPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.link}>
                      <BlogCard post={post} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography>Henüz blog yazısı bulunmuyor.</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 6 }}>
                <ContactMail sx={{ color: 'primary.main' }} /> 
                İletişim
              </Typography>
              <ContactSection onSubmit={async (data: ContactFormData) => {
                console.log('Form data:', data);
              }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
