/**
 * Eğitim Bölümü Bileşeni
 *
 * Kullanıcının eğitim geçmişini kronolojik sırayla gösteren bölüm.
 * Her eğitim için ayrı bir kart oluşturur.
 *
 * Özellikler:
 * - Responsive tasarım
 * - Kronolojik sıralama
 * - Memo optimizasyonu
 * - Material-UI entegrasyonu
 *
 * @component
 * @example
 * ```tsx
 * <EducationSection
 *   education={[{
 *     logo: "/school-logo.png",
 *     startDate: "2020-09-01",
 *     endDate: "2024-06-01",
 *     tr: { school: "Okul Adı", department: "Bölüm", location: "Konum" },
 *     en: { school: "School Name", department: "Department", location: "Location" }
 *   }]}
 *   sectionTitle="Eğitim"
 * />
 * ```
 */

import { Box, Stack } from '@mui/material';
import { FaGraduationCap } from 'react-icons/fa';
import { Education } from '@/types';
import EducationCard from '@/components/cards/EducationCard';
import SectionTitle from '@/components/common/SectionTitle';
import { memo } from 'react';
import { THEME_STYLE } from '@/theme/theme';

const STYLES = {
  SECTION: {
    ...THEME_STYLE.SECTION,
  },
  STACK: {},
  BOX: {
    mb: 3,
    '&:last-child': {
      mb: 0,
    },
  },
} as const;

/**
 * Eğitim Bölümü Props Interface
 *
 * @interface EducationSectionProps
 * @property {Education[]} education - Eğitim bilgileri listesi
 * @property {string} sectionTitle - Bölüm başlığı
 */
interface EducationSectionProps {
  education: Education[];
  sectionTitle: string;
}

/**
 * Eğitim Bölümü Bileşeni
 *
 * @param {EducationSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Eğitim bölümü
 */
function EducationSection({ education, sectionTitle }: EducationSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle icon={FaGraduationCap} title={sectionTitle} />

      {/* Eğitim Kartları Konteyneri */}
      <Box>
        <Stack sx={STYLES.STACK}>
          {/* Eğitim Kartları */}
          {education.map(edu => (
            <Box key={`${edu.tr.school}-${edu.startDate}`} sx={STYLES.BOX}>
              <EducationCard education={edu} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(EducationSection);
