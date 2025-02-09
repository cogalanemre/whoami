import { Card, CardContent, Typography, Box } from "@mui/material";
import { Education } from "@/data/education";
import { formatDate } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";
import { LocationOn, CalendarToday } from "@mui/icons-material";

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
            flexDirection: "column",
            gap: 0.5,
            m: 0,
            p: 0,
          }}
        >
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
                "& .MuiSvgIcon-root": {
                  marginRight: 0,
                  marginLeft: 0,
                },
                "& > *:first-of-type": {
                  marginLeft: 0,
                  paddingLeft: 0,
                },
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: currentColors.secondary,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  m: 0,
                  p: 0,
                }}
              >
                <CalendarToday
                  sx={{
                    color: currentColors.primary,
                    fontSize: 18,
                    m: 0,
                    p: 0,
                  }}
                />
                {formatDate(education.startDate)} -{" "}
                {formatDate(education.endDate)}
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: currentColors.secondary,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  m: 0,
                  p: 0,
                }}
              >
                <LocationOn
                  sx={{
                    color: currentColors.primary,
                    fontSize: 18,
                    m: 0,
                    p: 0,
                  }}
                />
                {education.location}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
