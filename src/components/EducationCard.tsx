import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Education } from '@/data/education';
import { formatDate } from '@/utils/dateUtils';
import { School } from '@mui/icons-material';

interface EducationCardProps {
  education: Education;
}

export const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'flex-start',
      position: 'relative',
      gap: 3
    }}>
      <Avatar
        sx={{
          width: 60,
          height: 60,
          position: 'absolute',
          left: -20,
          top: 10,
          bgcolor: '#1A1A1A',
          border: '2px solid',
          borderColor: 'primary.main',
          color: 'primary.main',
          zIndex: 1,
        }}
      >
        <School />
      </Avatar>
      <Card sx={{ 
        flex: 1,
        ml: 8,
        background: 'rgba(36, 36, 36, 0.5)',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {education.school}
            </Typography>
            {education.department && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}
              >
                ({education.department})
              </Typography>
            )}
          </Box>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
            {education.location}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {formatDate(education.startDate)} - {formatDate(education.endDate)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}; 