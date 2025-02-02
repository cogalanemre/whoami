'use client';

import { Box, Grid, Typography, IconButton, Stack, Avatar } from '@mui/material';
import { GitHub, LinkedIn, Email, Speed } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExperienceCard } from '@/components/ExperienceCard';
import Typewriter from '@/components/Typewriter';
import { experiences } from '@/data/experiences';
import { calculateTotalExperience } from '@/utils/dateUtils';

const MotionBox = motion(Box);

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (!currentDate) {
    return null;
  }

  return (
    <Box component="main" sx={{ py: 4 }}>
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
                alt="Emre"
                src="/profile.png"
              />
              <Box>
                <Typography variant="h1" gutterBottom>
                  Merhaba, Ben Emre 👋
                </Typography>
                <Typewriter
                  variant="h2"
                  color="primary"
                  gutterBottom
                  texts={[
                    "Computer Engineer",
                    "Full Stack Developer",
                    "AI Researcher"
                  ]}
                  typingDelay={150}
                  pauseDelay={3000}
                />
                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', maxWidth: '800px', color: 'text.secondary' }}>
                Küçüklüğümden beri meraklı olan kişiliğimi bir türlü dizginleyemedim. Kafama takılan şeyi araştırmak ve onu çözdükten sonraki mutluluk sanırım beni uzun yıllar bu mesleğe bağlayacak olan en büyük etken
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <IconButton color="primary" size="large" sx={{ 
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}>
                    <GitHub />
                  </IconButton>
                  <IconButton color="primary" size="large" sx={{ 
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton color="primary" size="large" sx={{ 
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}>
                    <Email />
                  </IconButton>
                </Stack>
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
                ({calculateTotalExperience(experiences)})
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
                background: 'linear-gradient(180deg, #81C9C9 0%, rgba(129, 201, 201, 0.2) 100%)',
              }
            }}>
              <Stack spacing={6}>
                {experiences.map((experience, index) => (
                  <ExperienceCard
                    key={index}
                    experience={experience}
                    currentDate={currentDate}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
