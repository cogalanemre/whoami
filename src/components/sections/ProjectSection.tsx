/**
 * Proje Bölümü Bileşeni
 *
 * Kullanıcının projelerini grid yapısında gösteren bölüm.
 * Her proje için ayrı bir kart oluşturur.
 *
 * Özellikler:
 * - Responsive grid yapısı (xs, sm, md breakpoint'leri için özel genişlikler)
 * - Material-UI tema entegrasyonu
 * - Memo optimizasyonu
 *
 * @component
 * @example
 * ```tsx
 * <ProjectSection
 *   projects={[{
 *     name: "Proje Adı",
 *     link: "https://example.com",
 *     startDate: "2020-01",
 *     endDate: "2023-01",
 *     description: "Proje açıklaması",
 *     skillTags: ["React", "TypeScript"]
 *   }]}
 *   sectionTitle="Projeler"
 * />
 * ```
 */

import { Box, Typography } from '@mui/material';
import { FaCodeBranch } from 'react-icons/fa';
import { Project } from '@/types';
import ProjectCard from '@/components/cards/ProjectCard';
import SectionTitle from '@/components/common/SectionTitle';
import { memo } from 'react';
import { projectSectionStyles as STYLES } from '@/styles/sections/ProjectSection.styles';

/**
 * Proje Bölümü Props Interface
 *
 * @interface ProjectSectionProps
 * @property {Project[]} projects - Proje bilgileri listesi
 * @property {string} sectionTitle - Bölüm başlığı
 */
interface ProjectSectionProps {
  projects: Project[];
  sectionTitle: string;
}

/**
 * Proje Bölümü Bileşeni
 *
 * @param {ProjectSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Proje bölümü
 */
function ProjectSection({ projects, sectionTitle }: ProjectSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle icon={FaCodeBranch} title={sectionTitle} />

      {/* Proje Kartları Container */}
      <Box sx={STYLES.CONTAINER}>
        {/* Proje Kartları */}
        {projects.length > 0 ? (
          projects.map(project => (
            <Box sx={STYLES.ITEM} key={`${project.name}-${project.startDate}`}>
              <ProjectCard project={project} />
            </Box>
          ))
        ) : (
          // Boş Durum
          <Box sx={STYLES.MESSAGE}>
            <Typography>Henüz proje bulunmuyor.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ProjectSection);
