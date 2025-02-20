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

interface SkillsSectionProps {
  experiences: Experience[];
  title: string;
}

export default function SkillsSection({ experiences, title }: SkillsSectionProps) {
  const colors = useThemeColors();
  const { selectedSkill, setSelectedSkill } = useSelectedSkill();

  const handleSkillClick = (skillTag: string) => {
    if (selectedSkill === skillTag) {
      setSelectedSkill(null);
      return;
    }

    setSelectedSkill(skillTag);
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
    <Box>
      <SectionTitle
        icon={Code}
        title={title}
      />

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        sx={{
          gap: 1,
        }}
      >
        {sortedSkills.map(([skillTag, duration]) => (
          <Chip
            key={skillTag}
            label={`${skillTag} (${Math.round((duration / totalMonths) * 100)}%)`}
            onClick={() => handleSkillClick(skillTag)}
            sx={{
              bgcolor:
                selectedSkill === skillTag ? colors.primary : colors.surface,
              color: selectedSkill === skillTag ? colors.surface : colors.primary,
              border: `1px solid ${colors.primary}`,
              cursor: "pointer",
              "&:hover": {
                bgcolor:
                  selectedSkill === skillTag ? colors.primary : colors.surface,
                opacity: 0.9,
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
} 