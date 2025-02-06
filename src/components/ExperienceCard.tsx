import { Card, CardContent, Typography, Stack, Chip, Avatar, Box } from '@mui/material';
import { Experience } from '@/data/experiences';
import { formatDate, calculateDuration } from '@/utils/dateUtils';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'flex-start',
      position: 'relative',
      gap: 3
    }}>
      <Avatar
        src={experience.logo}
        alt={experience.company}
        sx={{
          width: 100,
          height: 100,
          position: 'absolute',
          left: -30,
          top: 10,
          bgcolor: 'transparent',
          border: '2px solid',
          borderColor: 'primary.main',
          zIndex: 1,
          '& img': {
            objectFit: 'cover',
            borderRadius: '50%'
          }
        }}
      />
      <Card sx={{ 
        flex: 1,
        ml: 12,
        background: 'rgba(36, 36, 36, 0.5)',
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {experience.title}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            {experience.company} • {formatDate(experience.startDate)} - {experience.isCurrentJob ? 'Günümüz' : formatDate(experience.endDate)} ({calculateDuration(experience.startDate, experience.isCurrentJob ? new Date() : experience.endDate)})
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
            {experience.location} • {experience.type}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {experience.description.map((desc, index) => (
              <span key={index}>• {desc}<br /></span>
            ))}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {experience.skills.map((skill, index) => (
              <Chip key={index} size="small" label={skill} variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
} 