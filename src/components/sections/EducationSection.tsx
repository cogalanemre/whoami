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
import { sectionStyles, stackStyles, motionStyles } from "./EducationSection.style";

// Framer Motion için Box bileşeni
const MotionBox = motion(Box);

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
    <Box sx={sectionStyles}>
      {/* Bölüm Başlığı */}
      <SectionTitle
        icon={School}
        title={sectionTitle}
      />

      {/* Eğitim Kartları Konteyneri */}
      <Box>
        <Stack sx={stackStyles}>
          {/* Eğitim Kartları */}
          {education.map((edu, index) => (
            <MotionBox
              key={`${edu.tr.school}-${edu.startDate}`}
              initial={motionStyles.initial}
              animate={motionStyles.animate}
              transition={{ 
                ...motionStyles.transition, 
                delay: index * 0.1 // Her kart için kademeli animasyon
              }}
              sx={motionStyles.container}
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