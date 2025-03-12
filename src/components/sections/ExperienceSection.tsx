/**
 * Deneyim Bölümü Bileşeni
 * 
 * Kullanıcının iş deneyimlerini kronolojik sırayla gösteren bölüm.
 * Her deneyim için ayrı bir kart oluşturur ve animasyonlu bir şekilde gösterir.
 * 
 * Özellikler:
 * - Responsive tasarım (xs, sm, md, lg breakpoint'leri için özel spacing)
 * - Framer Motion animasyonları
 *   - Fade in ve slide up efekti
 *   - Kademeli kart animasyonları (her kart 0.1s gecikmeli)
 *   - Smooth geçişler (0.5s duration)
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

import { Box, Stack } from "@mui/material";
import { BusinessCenter } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import ExperienceCard from "@/components/cards/ExperienceCard";
import SectionTitle from "@/components/common/SectionTitle";
import { memo } from "react";
import { sectionStyles, stackStyles, motionStyles } from "./ExperienceSection.style";

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
    <Box sx={sectionStyles}>
      {/* Bölüm Başlığı */}
      <SectionTitle
        icon={BusinessCenter}
        title={sectionTitle}
        subtitle={totalExperience}
      />

      {/* Deneyim Kartları Konteyneri */}
      <Box>
        <Stack sx={stackStyles}>
          {/* Deneyim Kartları - Kademeli Animasyon */}
          {experiences.map((experience, index) => (
            <MotionBox
              key={`${experience.company}-${experience.startDate}`}
              initial={motionStyles.initial}
              animate={motionStyles.animate}
              transition={{ 
                ...motionStyles.transition, 
                delay: index * 0.1
              }}
              sx={motionStyles.container}
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