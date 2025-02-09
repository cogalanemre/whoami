import { Card, CardContent, Typography, Box } from "@mui/material";
import { Education } from "@/data/education";
import { formatDate } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";
import { LocationOn, CalendarToday } from "@mui/icons-material";
import {
  cardStyles,
  cardContentStyles,
  infoIconStyles,
  flexRowCenterStyles,
} from "@/theme/commonStyles";

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;

  return (
    <Card sx={cardStyles(currentColors)}>
      <CardContent sx={cardContentStyles}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            m: 0,
            p: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
              borderBottom: `1px solid ${currentColors.surface}`,
              pb: 0.5,
              m: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: currentColors.primary,
                fontWeight: 600,
                m: 0,
                p: 0,
              }}
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
                  m: 0,
                  p: 0,
                }}
              >
                ({education.department})
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              m: 0,
              p: 0,
            }}
          >
            <Typography
              variant="subtitle2"
              component="div"
              sx={flexRowCenterStyles}
            >
              <CalendarToday sx={infoIconStyles(currentColors)} />
              {formatDate(education.startDate)} -{" "}
              {formatDate(education.endDate)}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={flexRowCenterStyles}
            >
              <LocationOn sx={infoIconStyles(currentColors)} />
              {education.location}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
