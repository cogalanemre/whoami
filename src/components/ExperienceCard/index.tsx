'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { ExperienceCardProps } from './types';
import { StyledExperienceBox, StyledCard } from './styles';
import Avatar from '@mui/material/Avatar';

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const {
    company,
    title,
    startDate,
    endDate,
    isCurrentJob,
    location,
    description,
    skills,
    logo,
  } = experience;

  const formattedStartDate = startDate 
    ? format(new Date(startDate), 'MMMM yyyy', { locale: tr })
    : '';
  
  const formattedEndDate = endDate 
    ? format(new Date(endDate), 'MMMM yyyy', { locale: tr })
    : 'Devam Ediyor';

  return (
    <StyledExperienceBox>
      <Avatar
        src={logo}
        alt={company}
        sx={{
          width: { xs: 40, sm: 80, md: 100 },
          height: { xs: 40, sm: 80, md: 100 },
          position: 'absolute',
          left: { xs: -15, sm: -25, md: -30 },
          top: { xs: 5, sm: 8, md: 10 },
          bgcolor: 'transparent',
          border: '2px solid',
          borderColor: 'primary.main',
          zIndex: 1,
          '& img': {
            objectFit: 'contain',
            borderRadius: '50%',
            width: '100%',
            height: '100%',
            padding: { xs: 4, sm: 8 }
          }
        }}
      />
      <StyledCard isCurrentJob={isCurrentJob}>
        <Typography variant="h6" component="h3" gutterBottom sx={{
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          {title} @ {company}
        </Typography>
        
        <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          {formattedStartDate} - {formattedEndDate} | {location}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {description.map((item, idx) => (
            <Typography key={idx} variant="body2" paragraph sx={{
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              {item}
            </Typography>
          ))}
        </Box>

        <Box sx={{ 
          mt: 2, 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1,
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
        </Box>
      </StyledCard>
    </StyledExperienceBox>
  );
};

export default ExperienceCard; 