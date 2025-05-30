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
import { useEffect, useState, useRef } from 'react';

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

  // Seçili kartı belirle
  const [isSelected, setIsSelected] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkHash = () => {
      const isThisSelected = window.location.hash === `#project-${project.name.replace(/\s+/g, '')}`;
      setIsSelected(isThisSelected);
      if (isThisSelected && cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Dışarı tıklanınca seçimi kaldır
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        if (window.location.hash === `#project-${project.name.replace(/\s+/g, '')}`) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
          setIsSelected(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [project.name]);

  const handleCardSectionClick = (e: React.MouseEvent) => {
    // CardActions içindeki tıklamaları engelle
    if ((e.target as HTMLElement).closest('.no-link')) return;
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card component="article" role="article" aria-label={project.name} ref={cardRef} sx={{
      ...STYLES.CARD,
      display: 'flex',
      flexDirection: 'column',
      borderColor: isSelected ? (theme => theme.palette.primary.main) : STYLES.CARD.borderColor,
      borderWidth: isSelected ? 1 : 0.5,
      transform: isSelected ? 'translateY(-4px)' : 'none',
      transition: 'border-color 0.2s, border-width 0.2s, box-shadow 0.2s, transform 0.2s',
    }}>
      {/* Proje Görseli */}
      {project.thumbnail && (
        <CardMedia
          component="img"
          image={project.thumbnail}
          alt={`${project.name} proje görseli`}
          loading="lazy"
          onClick={handleCardSectionClick}
          style={{ cursor: 'pointer' }}
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
            style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
            onClick={e => { e.preventDefault(); handleCardSectionClick(e); }}
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
        onClick={handleCardSectionClick}
        style={{ cursor: 'pointer' }}
      />

      <CardContent sx={STYLES.CARD_CONTENT} onClick={handleCardSectionClick} style={{ cursor: 'pointer' }}>
        {/* Proje Açıklaması */}
        <Typography variant="body2" sx={STYLES.DESCRIPTION}>
          {project[lang].description}
        </Typography>
      </CardContent>

      <CardActions sx={STYLES.CARDACTIONS} className="no-link">
        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="flex-start" width="100%">
          {project.skillTags.map(tag => (
            <a
              key={tag}
              href={`#skill-${tag.replace(/\s+/g, '')}`}
              style={{ textDecoration: 'none' }}
            >
              <Chip
                label={tag}
                size="small"
                sx={STYLES.CHIP}
              />
            </a>
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
}

export default ProjectCard; 