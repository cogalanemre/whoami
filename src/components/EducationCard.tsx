import { Card, Typography, Box, Avatar } from "@mui/material";
import { Education } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { LocationOn, CalendarToday } from "@mui/icons-material";
import InfoWithIcon from "./InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { useThemeColors } from "@/hooks/useThemeColors";

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  const colors = useThemeColors();
  const { locale } = useTranslation();

  const educationTranslations = locale === "tr" ? education.tr : education.en;

  return (
    <Card
      sx={{
        background: colors.surface,
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
          p: 3,
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Avatar
          src={education.logo}
          alt={educationTranslations.school}
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
            {educationTranslations.school}
          </Typography>
          {educationTranslations.department && (
            <Typography
              variant="subtitle1"
              sx={{
                color: colors.secondary,
                mb: 1,
                fontWeight: "bold",
              }}
            >
              {educationTranslations.department}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 1, md: 3 },
              alignItems: { xs: "flex-start", md: "center" },
            }}
          >
            <InfoWithIcon
              icon={LocationOn}
              text={educationTranslations.location}
              colors={colors}
              fontSize="0.875rem"
            />
            <InfoWithIcon
              icon={CalendarToday}
              text={`${formatDate(education.startDate, locale)} - ${formatDate(
                education.endDate,
                locale
              )}`}
              colors={colors}
              fontSize="0.875rem"
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
