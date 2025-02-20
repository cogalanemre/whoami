import { Box, Chip, Stack } from "@mui/material";
import { Experience } from "@/types";
import { useSelectedSkill } from "@/context/SelectedSkillContext";
import {
  calculateSkillDuration,
  calculateTotalMonths,
} from "@/utils/dateUtils";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Code } from "@mui/icons-material";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { memo } from "react";
import { ThemeColors } from "@/types";

interface SkillsSectionProps {
  experiences: Experience[];
  title: string;
}

// Section container stilleri
const sectionStyles = {
  mt: 4,
};

// Stack container stilleri
const stackStyles = {
  gap: 1,
  direction: "row",
  flexWrap: "wrap",
};

// Chip stilleri için yardımcı fonksiyon
const getChipStyles = (isSelected: boolean, colors: ThemeColors) => ({
  bgcolor: isSelected ? colors.primary : colors.surface,
  color: isSelected ? colors.surface : colors.primary,
  border: `1px solid ${colors.primary}`,
  cursor: "pointer",
  "&:hover": {
    bgcolor: isSelected ? colors.primary : colors.surface,
    opacity: 0.9,
  },
});

/**
 * Yetenekler Section Bileşeni
 * 
 * Kullanıcının sahip olduğu yetenekleri ve bu yeteneklerdeki deneyim sürelerini
 * yüzdelik olarak gösteren bölüm. Tıklanabilir etiketler ile filtreleme yapılabilir.
 * 
 * @param {Experience[]} experiences - Deneyim listesi
 * @param {string} title - Bölüm başlığı
 * @returns {JSX.Element} Skills section bileşeni
 */
function SkillsSection({ experiences, title }: SkillsSectionProps) {
  const colors = useThemeColors();
  const { selectedSkill, setSelectedSkill } = useSelectedSkill();

  // Yetenek tıklama işleyicisi
  const handleSkillClick = (skillTag: string) => {
    if (selectedSkill === skillTag) {
      setSelectedSkill(null);
      return;
    }

    setSelectedSkill(skillTag);
    scrollToFirstMatchingExperience(skillTag);
  };

  // İlgili deneyime scroll yapma
  const scrollToFirstMatchingExperience = (skillTag: string) => {
    const firstMatchingExperience = experiences.find((exp) =>
      exp.skillTags.includes(skillTag)
    );

    if (firstMatchingExperience) {
      const experienceElement = document.getElementById(
        `experience-${firstMatchingExperience.company
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      );

      if (experienceElement) {
        const yOffset = -100;
        const y =
          experienceElement.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

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
            onClick={() => handleSkillClick(skillTag)}
            sx={getChipStyles(selectedSkill === skillTag, colors)}
          />
        ))}
      </Stack>
    </Box>
  );
}

// Bileşeni memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(SkillsSection); 