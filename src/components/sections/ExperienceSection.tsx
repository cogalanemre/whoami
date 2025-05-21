/**
 * Deneyim Bölümü Bileşeni
 *
 * Kullanıcının iş deneyimlerini kronolojik sırayla gösteren bölüm.
 * Her deneyim için ayrı bir kart oluşturur.
 *
 * Özellikler:
 * - Responsive tasarım (xs, sm, md, lg breakpoint'leri için özel spacing)
 * - Kronolojik sıralama
 * - Toplam deneyim süresi gösterimi
 * - Material-UI tema entegrasyonu
 *
 * @component
 * @example
 * ```tsx
 * <ExperienceSection
 *   experiences={[{
 *     company: "Şirket Adı",
 *     position: "Pozisyon",
 *     startDate: "2020-01",
 *     endDate: "2023-01",
 *     description: "İş tanımı",
 *     technologies: ["React", "TypeScript"]
 *   }]}
 *   totalExperience="3 yıl 2 ay"
 *   sectionTitle="Deneyim"
 * />
 * ```
 */

import { Box, Stack } from '@mui/material';
import { FaBriefcase } from 'react-icons/fa';
import { Experience } from '@/types';
import ExperienceCard from '@/components/cards/ExperienceCard';
import SectionTitle from '@/components/common/SectionTitle';
import { memo } from 'react';
import { THEME_STYLE } from '@/theme/theme';

const STYLES = {
  SECTION: {
    ...THEME_STYLE.SECTION,
  },
  STACK: {
    spacing: { xs: 4, md: 6 },
  },
  BOX: {
    mb: { xs: 4, md: 6 },
    '&:last-child': {
      mb: 0,
    },
  },
} as const;

/**
 * Deneyim Bölümü Props Interface
 *
 * @interface ExperienceSectionProps
 * @property {Experience[]} experiences - Deneyim bilgileri listesi
 * @property {string} totalExperience - Toplam deneyim süresi
 * @property {string} sectionTitle - Bölüm başlığı
 */
interface ExperienceSectionProps {
  experiences: Experience[];
  totalExperience: string;
  sectionTitle: string;
}

/**
 * Deneyim Bölümü Bileşeni
 *
 * @param {ExperienceSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Deneyim bölümü
 */
function ExperienceSection({ experiences, totalExperience, sectionTitle }: ExperienceSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle icon={FaBriefcase} title={sectionTitle} subtitle={totalExperience} />

      {/* Deneyim Kartları Konteyneri */}
      <Box>
        <Stack sx={STYLES.STACK}>
          {/* Deneyim Kartları */}
          {experiences.map(experience => (
            <Box key={`${experience.company}-${experience.startDate}`} sx={STYLES.BOX}>
              <ExperienceCard experience={experience} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ExperienceSection);
