'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { EducationCardProps } from './types';
import { StyledCard } from './styles';

const EducationCard: React.FC<EducationCardProps> = ({ education, index }) => {
  const {
    school,
    department,
    location,
    startDate,
    endDate
  } = education;

  const formattedStartDate = startDate 
    ? format(new Date(startDate), 'MMMM yyyy', { locale: tr })
    : '';
  
  const formattedEndDate = endDate 
    ? format(new Date(endDate), 'MMMM yyyy', { locale: tr })
    : 'Devam Ediyor';

  return (
    <StyledCard index={index}>
      <Typography variant="h6" component="h3" gutterBottom sx={{
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
        textAlign: { xs: 'center', sm: 'left' }
      }}>
        {school}
      </Typography>
      
      {department && (
        <Typography variant="subtitle1" gutterBottom sx={{
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          {department}
        </Typography>
      )}

      <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{
        textAlign: { xs: 'center', sm: 'left' }
      }}>
        {formattedStartDate} - {formattedEndDate} | {location}
      </Typography>
    </StyledCard>
  );
};

export default EducationCard; 