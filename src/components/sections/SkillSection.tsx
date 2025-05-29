/**
 * Yetenekler Bölümü Bileşeni
 *
 * Kullanıcının yeteneklerini kategorilere göre gösteren bölüm.
 * Deneyim ve projelerdeki skill tag'lerinden otomatik olarak oluşturulur.
 *
 * Özellikler:
 * - Responsive tasarım
 * - Otomatik yetenek kategorilendirme
 * - Material-UI tema entegrasyonu
 *
 * @component
 * @example
 * ```tsx
 * <SkillSection
 *   experiences={[{
 *     skillTags: ["React", "TypeScript"]
 *   }]}
 *   projects={[{
 *     skillTags: ["Next.js", "Material UI"]
 *   }]}
 *   sectionTitle="Yetenekler"
 * />
 * ```
 */

import { Box, Grid } from '@mui/material';
import { FaCode } from 'react-icons/fa';
import SectionTitle from '@/components/common/SectionTitle';
import { memo, useMemo } from 'react';
import { skillSectionStyles as STYLES } from '@/styles/sections/SkillSection.styles';
import SkillCard from '@/components/cards/SkillCard';

/**
 * Yetenekler Bölümü Props Interface
 *
 * @interface SkillSectionProps
 * @property {Array<{skillTags: string[]}>} experiences - Deneyim bilgileri listesi
 * @property {Array<{skillTags: string[]}>} projects - Proje bilgileri listesi
 * @property {string} sectionTitle - Bölüm başlığı
 */
interface SkillSectionProps {
  experiences: Array<{ skillTags: string[] }>;
  projects: Array<{ skillTags: string[] }>;
  sectionTitle: string;
}

/**
 * Yetenekler Bölümü Bileşeni
 *
 * @param {SkillSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Yetenekler bölümü
 */
function SkillSection({ experiences, projects, sectionTitle }: SkillSectionProps) {
  // Tüm skill tag'lerini birleştir ve benzersiz hale getir
  const uniqueSkills = useMemo(() => {
    const allSkills = [
      ...experiences.flatMap(exp => exp.skillTags),
      ...projects.flatMap(proj => proj.skillTags)
    ];
    return [...new Set(allSkills)].sort();
  }, [experiences, projects]);

  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle icon={FaCode} title={sectionTitle} />

      {/* Yetenekler Grid */}
      <Grid container spacing={2} sx={STYLES.GRID}>
        {uniqueSkills.map(skill => (
          <Grid item xs={12} sm={6} md={3} key={skill}>
            <SkillCard skill={skill} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(SkillSection); 