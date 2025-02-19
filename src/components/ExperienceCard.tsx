import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  Box,
} from "@mui/material";
import type { Experience } from "@/types";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { LocationOn, CalendarToday, Work } from "@mui/icons-material";
import InfoWithIcon from "./InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelectedSkill } from "@/context/SelectedSkillContext";
import { forwardRef } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

interface ExperienceCardProps {
  experience: Experience;
}

enum WorkingModel {
  Hybrid = 1,
  Remote = 2,
  Office = 3,
}

enum EmploymentType {
  FullTime = 1,
  PartTime = 2,
  Contract = 3,
  Freelance = 4,
}

const getWorkingModelText = (workingModel: number, locale: string): string => {
  switch (workingModel) {
    case WorkingModel.Hybrid:
      return locale === "tr" ? "Hibrit" : "Hybrid";
    case WorkingModel.Remote:
      return locale === "tr" ? "Uzaktan" : "Remote";
    case WorkingModel.Office:
      return locale === "tr" ? "Ofisten" : "Office";
    default:
      return "";
  }
};

const getEmploymentTypeText = (
  employmentType: number,
  locale: string
): string => {
  switch (employmentType) {
    case EmploymentType.FullTime:
      return locale === "tr" ? "Tam Zamanlı" : "Full Time";
    case EmploymentType.PartTime:
      return locale === "tr" ? "Yarı Zamanlı" : "Part Time";
    case EmploymentType.Contract:
      return locale === "tr" ? "Sözleşmeli" : "Contract";
    case EmploymentType.Freelance:
      return locale === "tr" ? "Serbest" : "Freelance";
    default:
      return "";
  }
};

const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  function ExperienceCard({ experience }, ref) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const colors = useThemeColors();
    const { locale } = useTranslation();
    const { selectedSkill, setSelectedSkill } = useSelectedSkill();

    const isHighlighted =
      selectedSkill && experience.skills.includes(selectedSkill);

    const experienceTranslations =
      locale === "tr" ? experience.tr : experience.en;

    const duration = calculateDuration(
      experience.startDate,
      experience.endDate ? experience.endDate : new Date().toISOString(),
      locale
    );

    return (
      <Card
        ref={ref}
        sx={{
          background: colors.surface,
          position: "relative",
          transition: "all 0.3s ease-in-out",
          border: `1px solid ${isHighlighted ? colors.primary : "transparent"}`,
          transform: isHighlighted ? "translateY(-4px)" : "none",
          boxShadow: isHighlighted ? `0 4px 20px ${colors.primary}40` : "none",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            "& .MuiAvatar-root": {
              transform: "scale(1.05)",
              transition: "transform 0.3s ease-in-out",
            },
          },
        }}
      >
        <Box
          sx={{
            background: isDarkMode
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(0, 0, 0, 0.03)",
            backdropFilter: "blur(4px)",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
            <Avatar
              src={experience.logo}
              alt={experience.company}
              sx={{
                width: 80,
                height: 80,
                bgcolor: "transparent",
                border: "2px solid",
                borderColor: colors.primary,
                display: { xs: "none", md: "block" },
                "& img": {
                  objectFit: "cover",
                  borderRadius: "50%",
                },
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  color: colors.primary,
                  mb: 1,
                  fontWeight: "bold",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {experienceTranslations.position}
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 3 }}
                alignItems={{ xs: "flex-start", md: "center" }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: colors.secondary,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {experience.company}
                </Typography>
                <InfoWithIcon
                  icon={LocationOn}
                  text={`${
                    experienceTranslations.location
                  } • ${getWorkingModelText(experience.workingModel, locale)}`}
                  colors={colors}
                  fontSize="0.875rem"
                />
                <InfoWithIcon
                  icon={CalendarToday}
                  text={`${formatDate(experience.startDate, locale)} - ${
                    experience.endDate
                      ? formatDate(experience.endDate, locale)
                      : locale === "tr"
                      ? "Devam ediyor"
                      : "Present"
                  } (${duration})`}
                  colors={colors}
                  fontSize="0.875rem"
                />
                <InfoWithIcon
                  icon={Work}
                  text={getEmploymentTypeText(
                    experience.employmentType,
                    locale
                  )}
                  colors={colors}
                  fontSize="0.875rem"
                />
              </Stack>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ color: colors.secondary, mb: 3 }}>
            {experienceTranslations.description.map((desc, index) => (
              <span key={index}>
                <span style={{ color: colors.primary }}>•</span> {desc}
                <br />
              </span>
            ))}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "flex-start" }}
            sx={{
              gap: 1,
            }}
          >
            {experience.skills.map((skill, index) => (
              <Chip
                key={index}
                size="small"
                label={skill}
                variant="outlined"
                onClick={() =>
                  setSelectedSkill(selectedSkill === skill ? null : skill)
                }
                sx={{
                  bgcolor:
                    selectedSkill === skill
                      ? colors.primary
                      : colors.background,
                  borderColor:
                    selectedSkill === skill ? colors.primary : colors.primary,
                  color:
                    selectedSkill === skill
                      ? colors.background
                      : colors.primary,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor:
                      selectedSkill === skill ? colors.primary : colors.surface,
                    borderColor: colors.primary,
                  },
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }
);

export default ExperienceCard;
