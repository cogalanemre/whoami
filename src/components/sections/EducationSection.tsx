/**
 * Eğitim Bölümü Bileşeni
 * 
 * Kullanıcının eğitim geçmişini kronolojik sırayla gösteren bölüm.
 * Her eğitim için ayrı bir kart oluşturur ve animasyonlu bir şekilde gösterir.
 * 
 * Özellikler:
 * - Responsive tasarım
 * - Framer Motion animasyonları
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

import { Box, Stack } from "@mui/material";
import { School } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Education } from "@/types";
import EducationCard from "@/components/cards/EducationCard";
import SectionTitle from "@/components/common/SectionTitle";
import { memo } from "react";

// Framer Motion için Box bileşeni
const MotionBox = motion(Box);

/**
 * Stil sabitleri
 * Material-UI theme sistem ile uyumlu stil tanımlamaları
 */
const STYLES = {
  SECTION: {
    mt: { xs: 4, sm: 6, md: 8 },
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
      <SectionTitle
        icon={School}
        title={sectionTitle}
      />

      {/* Eğitim Kartları Konteyneri */}
      <Box>
        <Stack sx={STYLES.STACK}>
          {/* Eğitim Kartları */}
          {education.map((edu, index) => (
            <MotionBox
              key={`${edu.tr.school}-${edu.startDate}`}
              initial={STYLES.MOTION.initial}
              animate={STYLES.MOTION.animate}
              transition={{ 
                ...STYLES.MOTION.transition, 
                delay: index * 0.1 // Her kart için kademeli animasyon
              }}
              sx={STYLES.MOTION_CONTAINER}
            >
              <EducationCard education={edu} />
            </MotionBox>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(EducationSection); 