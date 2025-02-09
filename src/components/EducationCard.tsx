import { Card, CardContent, Typography, Box } from "@mui/material";
import { Education } from "@/data/education";
import { formatDate } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;

  return (
    <Card
      sx={{
        background: currentColors.surface,
        transition: "all 0.3s ease-in-out",
        borderRadius: 2,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            mb: 2,
            pb: 2,
            borderBottom: `1px solid ${currentColors.surface}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: currentColors.primary, fontWeight: 600 }}
          >
            {education.school}
          </Typography>
          {education.department && (
            <Typography
              variant="body2"
              sx={{
                color: currentColors.secondary,
                fontSize: "0.9rem",
                fontStyle: "italic",
              }}
            >
              ({education.department})
            </Typography>
          )}
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: currentColors.secondary,
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: currentColors.primary,
              opacity: 0.7,
            }}
          />
          {education.location}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: currentColors.secondary,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: currentColors.primary,
              opacity: 0.7,
            }}
          />
          {formatDate(education.startDate)} - {formatDate(education.endDate)}
        </Typography>
      </CardContent>
    </Card>
  );
}
