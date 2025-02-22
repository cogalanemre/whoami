/**
 * Deneyim Bölümü Bileşeni
 * 
 * Kullanıcının iş deneyimlerini kronolojik sırayla gösteren bölüm.
 * Her deneyim için ayrı bir kart oluşturur ve animasyonlu bir şekilde gösterir.
 * 
 * Özellikler:
 * - Responsive tasarım
 * - Framer Motion animasyonları
 * - Kronolojik sıralama
 * - Toplam deneyim süresi gösterimi
 * - Kademeli kart animasyonları
 * - Material-UI entegrasyonu
 * 
 * @component
 * @example
 * ```tsx
 * <ExperienceSection
 *   experiences={[{
 *     company: "Şirket Adı",
 *     startDate: "2020-01",
 *     endDate: "2023-01",
 *     // ... diğer deneyim özellikleri
 *   }]}
 *   totalExperience="3 yıl 2 ay"
 *   sectionTitle="Deneyim"
 * />
 * ```
 */

import { Box, Stack } from "@mui/material";
import { BusinessCenter } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import ExperienceCard from "@/components/molecules/cards/ExperienceCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

// Framer Motion için Box bileşeni
const MotionBox = motion(Box);

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
 * Stil sabitleri
 * Material-UI theme sistem ile uyumlu stil tanımlamaları
 */
const STYLES = {
  SECTION: {
    mt: { xs: 4, sm: 6, md: 8, lg: 10 },
  },
  STACK: {
    spacing: { xs: 4, md: 6 },
  },
  MOTION: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  MOTION_CONTAINER: {
    mb: { xs: 4, md: 6 },
    "&:last-child": {
      mb: 0,
    },
  },
} as const;

/**
 * Deneyim Bölümü Bileşeni
 * 
 * @param {ExperienceSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Deneyim bölümü
 */
function ExperienceSection({ 
  experiences, 
  totalExperience,
  sectionTitle 
}: ExperienceSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle
        icon={BusinessCenter}
        title={sectionTitle}
        subtitle={totalExperience}
      />

      {/* Deneyim Kartları Konteyneri */}
      <Box>
        <Stack sx={STYLES.STACK}>
          {/* Deneyim Kartları */}
          {experiences.map((experience, index) => (
            <MotionBox
              key={`${experience.company}-${experience.startDate}`}
              initial={STYLES.MOTION.initial}
              animate={STYLES.MOTION.animate}
              transition={{ 
                ...STYLES.MOTION.transition, 
                delay: index * 0.1 // Her kart için kademeli animasyon
              }}
              sx={STYLES.MOTION_CONTAINER}
            >
              <ExperienceCard experience={experience} />
            </MotionBox>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ExperienceSection); 