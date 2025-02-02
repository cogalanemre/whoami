'use client';

import { Box, Grid, Typography, IconButton, Stack, Avatar } from '@mui/material';
import { GitHub, LinkedIn, Email, Speed, School } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExperienceCard } from '@/components/ExperienceCard';
import { EducationCard } from '@/components/EducationCard';
import Typewriter from '@/components/Typewriter';
import { experiences } from '@/data/experiences';
import { education } from '@/data/education';
import { personalInfo } from '@/data/personalInfo';
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
                alt={personalInfo.name}
                src="/profile.png"
              />
              <Box>
                <Typography variant="h1" gutterBottom>
                  Merhaba, Ben {personalInfo.name} 👋
                </Typography>
                <Typewriter
                  variant="h2"
                  color="primary"
                  gutterBottom
                  texts={personalInfo.titles}
                  typingDelay={150}
                  pauseDelay={3000}
                />
                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', maxWidth: '800px', color: 'text.secondary' }}>
                  {personalInfo.bio}
                </Typography>
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
                background: 'linear-gradient(180deg, #64FFDA 0%, rgba(100, 255, 218, 0.2) 100%)',
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
                background: 'linear-gradient(180deg, #64FFDA 0%, rgba(100, 255, 218, 0.2) 100%)',
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
      </Grid>
    </Box>
  );
}
