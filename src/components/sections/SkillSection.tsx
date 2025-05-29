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
 * - Çok dilli destek
 *
 * @component
 * @example
 * ```tsx
 * <SkillSection
 *   experiences={[{
 *     company: "OBSS",
 *     startDate: "2020-01",
 *     endDate: "2023-01",
 *     skillTags: ["React", "TypeScript"]
 *   }]}
 *   projects={[{
 *     name: "Whoami",
 *     startDate: "2023-01",
 *     endDate: "2023-06",
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
import { calculateDuration } from '@/utils/dateUtils';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * Yetenekler Bölümü Props Interface
 *
 * @interface SkillSectionProps
 * @property {Array<{company: string; startDate: string; endDate?: string; skillTags: string[]}>} experiences - Deneyim bilgileri listesi
 * @property {Array<{name: string; startDate: string; endDate?: string; skillTags: string[]}>} projects - Proje bilgileri listesi
 * @property {string} sectionTitle - Bölüm başlığı
 */
interface SkillSectionProps {
  experiences: Array<{ 
    company: string; 
    startDate: string;
    endDate?: string;
    skillTags: string[] 
  }>;
  projects: Array<{ 
    name: string; 
    startDate: string;
    endDate?: string;
    skillTags: string[] 
  }>;
  sectionTitle: string;
}

/**
 * Yetenekler Bölümü Bileşeni
 *
 * @param {SkillSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Yetenekler bölümü
 */
function SkillSection({ experiences, projects, sectionTitle }: SkillSectionProps) {
  const { t, locale } = useTranslation();

  // Her yetenek için kullanıldığı yerleri ve süreleri hesapla
  const skillUsage = useMemo(() => {
    const usage: Record<string, { 
      experiences: Array<{ name: string; duration: string }>;
      projects: Array<{ name: string; duration: string }>;
    }> = {};

    // Deneyimlerdeki yetenekleri ekle
    experiences.forEach(exp => {
      const duration = calculateDuration(
        exp.startDate,
        exp.endDate || new Date().toISOString(),
        locale
      );

      exp.skillTags.forEach(skill => {
        if (!usage[skill]) {
          usage[skill] = { experiences: [], projects: [] };
        }
        usage[skill].experiences.push({
          name: exp.company,
          duration
        });
      });
    });

    // Projelerdeki yetenekleri ekle
    projects.forEach(proj => {
      const duration = calculateDuration(
        proj.startDate,
        proj.endDate || new Date().toISOString(),
        locale
      );

      proj.skillTags.forEach(skill => {
        if (!usage[skill]) {
          usage[skill] = { experiences: [], projects: [] };
        }
        usage[skill].projects.push({
          name: proj.name,
          duration
        });
      });
    });

    return usage;
  }, [experiences, projects, locale]);

  // Süreleri aylara çevir
  const convertDurationToMonths = (duration: string): number => {
    if (!duration) return 0;
    
    // "2 yıl" veya "6 ay" veya "2 year" veya "6 month" formatındaki string'i parse et
    const match = duration.match(/(\d+)\s*(yıl|ay|year|month)/i);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case 'yıl':
      case 'year':
        return value * 12;
      case 'ay':
      case 'month':
        return value;
      default:
        return 0;
    }
  };

  // Benzersiz yetenekleri al ve sırala
  const uniqueSkills = useMemo(() => {
    const allSkills = [
      ...experiences.flatMap(exp => exp.skillTags),
      ...projects.flatMap(proj => proj.skillTags)
    ];
    
    // Yetenekleri kullanım sürelerine göre sırala
    return [...new Set(allSkills)].sort((a, b) => {
      const aDuration = [
        ...skillUsage[a].experiences.map(exp => convertDurationToMonths(exp.duration)),
        ...skillUsage[a].projects.map(proj => convertDurationToMonths(proj.duration))
      ].reduce((sum, months) => sum + months, 0);

      const bDuration = [
        ...skillUsage[b].experiences.map(exp => convertDurationToMonths(exp.duration)),
        ...skillUsage[b].projects.map(proj => convertDurationToMonths(proj.duration))
      ].reduce((sum, months) => sum + months, 0);

      return bDuration - aDuration; // Büyükten küçüğe sırala
    });
  }, [experiences, projects, skillUsage]);

  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle icon={FaCode} title={sectionTitle} />

      {/* Yetenekler Grid */}
      <Grid container spacing={2} sx={STYLES.GRID}>
        {uniqueSkills.map(skill => (
          <Grid item xs={12} sm={6} md={3} key={skill}>
            <SkillCard 
              skill={skill} 
              usedIn={skillUsage[skill]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(SkillSection); 