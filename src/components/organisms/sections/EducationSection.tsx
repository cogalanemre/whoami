import { Box, Stack } from "@mui/material";
import { School } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Education } from "@/types";
import EducationCard from "@/components/molecules/cards/EducationCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

const MotionBox = motion(Box);

/**
 * Stil sabitleri
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

interface EducationSectionProps {
  education: Education[];
  sectionTitle: string;
}

/**
 * Eğitim Section Bileşeni
 * 
 * Kullanıcının eğitim geçmişini kronolojik sırayla gösteren bölüm.
 * Her eğitim için ayrı bir kart oluşturur ve animasyonlu bir şekilde gösterir.
 * 
 * @param {Education[]} education - Eğitim listesi
 * @param {string} sectionTitle - Bölüm başlığı
 * @returns {JSX.Element} Education section bileşeni
 */
function EducationSection({ 
  education,
  sectionTitle 
}: EducationSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      <SectionTitle
        icon={School}
        title={sectionTitle}
      />
      <Box>
        <Stack sx={STYLES.STACK}>
          {education.map((edu, index) => (
            <MotionBox
              key={`${edu.tr.school}-${edu.startDate}`}
              initial={STYLES.MOTION.initial}
              animate={STYLES.MOTION.animate}
              transition={{ ...STYLES.MOTION.transition, delay: index * 0.1 }}
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

export default memo(EducationSection); 