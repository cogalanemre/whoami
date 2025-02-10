import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { Experience } from "@/data/experiences";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";
import { LocationOn, AccessTime } from "@mui/icons-material";
import InfoWithIcon from "./InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const { t, locale } = useTranslation();
  const experienceTranslations = t("experiences")[experience.id];
  const commonTranslations = t("common");

  return (
    <Card
      sx={{
        background: currentColors.surface,
        position: "relative",
        transition: "all 0.3s ease-in-out",
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
          background: currentColors.background,
          borderBottom: `1px solid ${currentColors.surface}`,
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
              borderColor: currentColors.primary,
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
              sx={{ color: currentColors.primary, mb: 1, fontWeight: "bold" }}
            >
              {experienceTranslations.title}
            </Typography>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography
                variant="subtitle1"
                sx={{
                  color: currentColors.secondary,
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
                text={`${experienceTranslations.location} • ${experienceTranslations.type}`}
                currentColors={currentColors}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={AccessTime}
                text={`${formatDate(experience.startDate, locale)} - ${
                  experience.isCurrentJob
                    ? commonTranslations.experience.current
                    : formatDate(experience.endDate, locale)
                } (${calculateDuration(
                  experience.startDate,
                  experience.isCurrentJob ? new Date() : experience.endDate,
                  locale
                )}) • ${commonTranslations.experience.fullTime}`}
                currentColors={currentColors}
                fontSize="0.875rem"
              />
            </Stack>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="body1"
          sx={{ color: currentColors.secondary, mb: 3 }}
        >
          {experienceTranslations.description.map((desc, index) => (
            <span key={index}>
              <span style={{ color: currentColors.primary }}>•</span> {desc}
              <br />
            </span>
          ))}
        </Typography>

        <Divider
          sx={{
            my: 2,
            borderColor: currentColors.background,
          }}
        />

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {experience.skills.map((skill, index) => (
            <Chip
              key={index}
              size="small"
              label={skill}
              variant="outlined"
              sx={{
                mb: 1,
                bgcolor: currentColors.background,
                borderColor: currentColors.primary,
                color: currentColors.primary,
                "&:hover": {
                  bgcolor: currentColors.surface,
                },
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
