import { Box, Stack } from "@mui/material";
import { BusinessCenter } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import ExperienceCard from "@/components/molecules/cards/ExperienceCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

const MotionBox = motion(Box);

interface ExperienceSectionProps {
  experiences: Experience[];
  totalExperience: string;
  sectionTitle: string;
}

const sectionStyles = {
  mt: 4,
};

/**
 * Deneyim Section Bileşeni
 * 
 * Kullanıcının iş deneyimlerini kronolojik sırayla gösteren bölüm.
 * Her deneyim için ayrı bir kart oluşturur ve animasyonlu bir şekilde gösterir.
 * 
 * @param {Experience[]} experiences - Deneyim listesi
 * @param {string} totalExperience - Toplam deneyim süresi
 * @param {string} sectionTitle - Bölüm başlığı
 * @returns {JSX.Element} Experience section bileşeni
 */
function ExperienceSection({ 
  experiences, 
  totalExperience,
  sectionTitle 
}: ExperienceSectionProps) {
  return (
    <Box sx={sectionStyles}>
      <SectionTitle
        icon={BusinessCenter}
        title={sectionTitle}
        subtitle={totalExperience}
      />
      <Box>
        <Stack spacing={6}>
          {experiences.map((experience, index) => (
            <MotionBox
              key={`${experience.company}-${experience.startDate}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExperienceCard experience={experience} />
            </MotionBox>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default memo(ExperienceSection); 