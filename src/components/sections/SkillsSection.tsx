import { Box, Chip, Stack, useTheme, Theme } from "@mui/material";
import { Experience } from "@/types";
import {
  calculateSkillDuration,
  calculateTotalMonths,
} from "@/utils/dateUtils";
import { Code } from "@mui/icons-material";
import SectionTitle from "@/components/common/SectionTitle";
import { memo } from "react";

// Stil tanımlamaları
const sectionStyles = {
  mt: 4,
} as const;

const stackStyles = {
  gap: 1,
  direction: "row",
  flexWrap: "wrap",
} as const;

// Chip stilleri için yardımcı fonksiyon
const getChipStyles = (theme: Theme) => ({
  bgcolor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  "&:hover": {
    opacity: 0.9,
  },
});

interface SkillsSectionProps {
  experiences: Experience[];
  title: string;
}

/**
 * Yetenekler Section Bileşeni
 * 
 * Kullanıcının sahip olduğu yetenekleri ve bu yeteneklerdeki deneyim sürelerini
 * yüzdelik olarak gösteren bölüm.
 * 
 * @param {Experience[]} experiences - Deneyim listesi
 * @param {string} title - Bölüm başlığı
 * @returns {JSX.Element} Skills section bileşeni
 */
function SkillsSection({ experiences, title }: SkillsSectionProps) {
  const theme = useTheme();

  // Tüm yetenekleri ve sürelerini hesapla
  const skillDurationsMap = calculateSkillDuration(experiences);
  const totalMonths = calculateTotalMonths(experiences);

  // Map'i array'e çevir ve sürelerine göre sırala
  const sortedSkills = Array.from(skillDurationsMap.entries()).sort(
    ([, durationA], [, durationB]) => durationB - durationA
  );

  return (
    <Box sx={sectionStyles}>
      <SectionTitle
        icon={Code}
        title={title}
      />

      <Stack sx={stackStyles}>
        {sortedSkills.map(([skillTag, duration]) => (
          <Chip
            key={skillTag}
            label={`${skillTag} (${Math.round((duration / totalMonths) * 100)}%)`}
            sx={getChipStyles(theme)}
          />
        ))}
      </Stack>
    </Box>
  );
}

// Bileşeni memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(SkillsSection); 