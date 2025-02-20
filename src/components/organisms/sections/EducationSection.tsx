import { Box, Stack } from "@mui/material";
import { School } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Education } from "@/types";
import EducationCard from "@/components/molecules/cards/EducationCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

const MotionBox = motion(Box);

interface EducationSectionProps {
  education: Education[];
  sectionTitle: string;
}

const sectionStyles = {
  mt: 4,
};

const stackContainerStyles = {
  spacing: 4,
};

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
    <Box sx={sectionStyles}>
      <SectionTitle
        icon={School}
        title={sectionTitle}
      />
      <Box>
        <Stack sx={stackContainerStyles}>
          {education.map((edu, index) => (
            <MotionBox
              key={`${edu.tr.school}-${edu.startDate}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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