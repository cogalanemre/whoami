/**
 * Proje Kartı Bileşeni
 *
 * Proje bilgilerini gösteren kart bileşeni.
 * Proje adı, açıklaması, tarihleri ve kullanılan teknolojileri içerir.
 *
 * @component
 * @example
 * ```tsx
 * <ProjectCard
 *   project={{
 *     name: "Proje Adı",
 *     link: "https://example.com",
 *     startDate: "2020-01",
 *     endDate: "2023-01",
 *     description: "Proje açıklaması",
 *     skillTags: ["React", "TypeScript"]
 *   }}
 * />
 * ```
 */

import { Card, CardContent, Typography, Chip, Stack, CardMedia, CardHeader, Box, CardActions } from '@mui/material';
import { Project } from '@/types';
import { formatDate, calculateDuration } from '@/utils/dateUtils';
import { projectCardStyles as STYLES } from '@/styles/cards/ProjectCard.styles';
import { useAppContext } from '@/context/AppContext';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import InfoWithIcon from '@/components/common/InfoWithIcon';

/**
 * Proje Kartı Props Interface
 *
 * @interface ProjectCardProps
 * @property {Project} project - Proje bilgileri
 */
interface ProjectCardProps {
  project: Project;
}

/**
 * Proje Kartı Bileşeni
 *
 * @param {ProjectCardProps} props - Bileşen props'ları
 * @returns {JSX.Element} Proje kartı
 */
function ProjectCard({ project }: ProjectCardProps) {
  const { lang } = useAppContext();

  return (
    <Card component="article" role="article" aria-label={project.name} sx={{ ...STYLES.CARD, display: 'flex', flexDirection: 'column' }}>
      {/* Proje Görseli */}
      {project.thumbnail && (
        <CardMedia
          component="img"
          image={project.thumbnail}
          alt={`${project.name} proje görseli`}
          loading="lazy"
        />
      )}

      <CardHeader
        sx={STYLES.CARD_HEADER}
        title={
          <Typography
            component="a"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="h3"
            sx={{ ...STYLES.TITLE, color: 'inherit' }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {project.name}
          </Typography>
        }
        subheader={
          <Box sx={STYLES.META}>
            <InfoWithIcon 
              icon={FaCalendarAlt} 
              text={`${formatDate(project.startDate, lang)} - ${project.endDate ? formatDate(project.endDate, lang) : 'Present'}`} 
              fontSize="0.875rem" 
            />
            <InfoWithIcon 
              icon={FaClock} 
              text={calculateDuration(project.startDate, project.endDate || new Date().toISOString(), lang)} 
              fontSize="0.875rem" 
            />
          </Box>
        }
      />

      <CardContent sx={STYLES.CARD_CONTENT}>
        {/* Proje Açıklaması */}
        <Typography variant="body2" sx={STYLES.DESCRIPTION}>
          {project[lang].description}
        </Typography>
      </CardContent>

      <CardActions sx={STYLES.CARDACTIONS}>
        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="flex-start" width="100%">
          {project.skillTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={STYLES.CHIP}
            />
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
}

export default ProjectCard; 