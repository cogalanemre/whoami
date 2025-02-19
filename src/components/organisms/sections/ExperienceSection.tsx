import { Box, Stack } from "@mui/material";
import { BusinessCenter } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import ExperienceCard from "@/components/molecules/cards/ExperienceCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

const MotionBox = motion.create(Box);

interface ExperienceSectionProps {
  experiences: Experience[];
  totalExperience: string;
  sectionTitle: string;
}

function ExperienceSection({ 
  experiences, 
  totalExperience,
  sectionTitle 
}: ExperienceSectionProps) {
  return (
    <Box sx={{ mt: 4 }}>
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

// memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(ExperienceSection); 