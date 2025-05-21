/**
 * Proje Bölümü Bileşeni
 *
 * Kullanıcının projelerini kronolojik sırayla gösteren bölüm.
 * Her proje için ayrı bir kart oluşturur.
 *
 * Özellikler:
 * - Responsive tasarım (xs, sm, md, lg breakpoint'leri için özel spacing)
 * - Kronolojik sıralama
 * - Material-UI tema entegrasyonu
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

import { Box, Stack } from '@mui/material';
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

      {/* Proje Kartları Konteyneri */}
      <Box>
        <Stack sx={STYLES.STACK}>
          {/* Proje Kartları */}
          {projects.map(project => (
            <Box key={`${project.name}-${project.startDate}`} sx={STYLES.BOX}>
              <ProjectCard project={project} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ProjectSection);
