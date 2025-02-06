'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { ExperienceCardProps } from './types';
import { StyledCard } from './styles';

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
  } = experience;

  const formattedStartDate = startDate 
    ? format(new Date(startDate), 'MMMM yyyy', { locale: tr })
    : '';
  
  const formattedEndDate = endDate 
    ? format(new Date(endDate), 'MMMM yyyy', { locale: tr })
    : 'Devam Ediyor';

  return (
    <StyledCard isCurrentJob={isCurrentJob} index={index}>
      <Typography variant="h6" component="h3" gutterBottom>
        {title} @ {company}
      </Typography>
      
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {formattedStartDate} - {formattedEndDate} | {location}
      </Typography>

      <Box sx={{ mt: 2 }}>
        {description.map((item, idx) => (
          <Typography key={idx} variant="body2" paragraph>
            {item}
          </Typography>
        ))}
      </Box>

      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
  );
};

export default ExperienceCard; 