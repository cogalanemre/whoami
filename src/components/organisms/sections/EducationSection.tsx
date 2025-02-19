import { Box, Stack } from "@mui/material";
import { School } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Education } from "@/types";
import EducationCard from "@/components/molecules/cards/EducationCard";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";

const MotionBox = motion.create(Box);

interface EducationSectionProps {
  education: Education[];
  sectionTitle: string;
}

function EducationSection({ 
  education,
  sectionTitle 
}: EducationSectionProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <SectionTitle
        icon={School}
        title={sectionTitle}
      />
      <Box>
        <Stack spacing={4}>
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

// memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(EducationSection); 