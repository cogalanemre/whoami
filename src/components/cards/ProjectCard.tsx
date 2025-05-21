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

import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { Project } from '@/types';
import { formatDate } from '@/utils/dateUtils';
import { projectCardStyles as STYLES } from '@/styles/cards/ProjectCard.styles';
import { useAppContext } from '@/context/AppContext';

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
    <Card sx={STYLES.CARD}>
      <CardContent>
        {/* Proje Adı ve Link */}
        <Typography
          component="a"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="h6"
          sx={STYLES.TITLE}
        >
          {project.name}
        </Typography>

        {/* Tarih Aralığı */}
        <Typography variant="body2" color="text.secondary" sx={STYLES.DATE}>
          {formatDate(project.startDate, lang)} - {project.endDate ? formatDate(project.endDate, lang) : 'Present'}
        </Typography>

        {/* Proje Açıklaması */}
        <Typography variant="body1" sx={STYLES.DESCRIPTION}>
          {project[lang].description}
        </Typography>

        {/* Teknoloji Etiketleri */}
        <Stack direction="row" spacing={1} sx={STYLES.TAGS}>
          {project.skillTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={STYLES.CHIP}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProjectCard; 