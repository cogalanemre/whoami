import { Box, Typography, Chip, Stack } from "@mui/material";
import { Experience } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelectedSkill } from "@/context/SelectedSkillContext";
import {
  calculateSkillDuration,
  calculateTotalMonths,
} from "@/utils/dateUtils";
import { useThemeColors } from "@/hooks/useThemeColors";

interface SkillsSectionProps {
  experiences: Experience[];
}

export default function SkillsSection({ experiences }: SkillsSectionProps) {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const commonTranslations = t("common");
  const { selectedSkill, setSelectedSkill } = useSelectedSkill();

  const handleSkillClick = (skill: string) => {
    if (selectedSkill === skill) {
      setSelectedSkill(null);
      return;
    }

    setSelectedSkill(skill);
    const firstMatchingExperience = experiences.find((exp) =>
      exp.skills.includes(skill)
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
      <Typography
        variant="h5"
        sx={{
          color: colors.primary,
          mb: 3,
          fontWeight: "bold",
        }}
      >
        {commonTranslations.sections.skills}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        sx={{
          gap: 1,
        }}
      >
        {sortedSkills.map(([skill, duration]) => (
          <Chip
            key={skill}
            label={`${skill} (${Math.round((duration / totalMonths) * 100)}%)`}
            onClick={() => handleSkillClick(skill)}
            sx={{
              bgcolor:
                selectedSkill === skill ? colors.primary : colors.surface,
              color: selectedSkill === skill ? colors.surface : colors.primary,
              border: `1px solid ${colors.primary}`,
              cursor: "pointer",
              "&:hover": {
                bgcolor:
                  selectedSkill === skill ? colors.primary : colors.surface,
                opacity: 0.9,
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
} 