import { Card, CardContent, Typography, Box } from "@mui/material";
import { Education } from "@/data/education";
import { formatDate } from "@/utils/dateUtils";

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <Card
      sx={{
        background: "rgba(36, 36, 36, 0.5)",
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
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            {education.school}
          </Typography>
          {education.department && (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
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
            color: "text.secondary",
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
              bgcolor: "primary.main",
              opacity: 0.7,
            }}
          />
          {education.location}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
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
              bgcolor: "primary.main",
              opacity: 0.7,
            }}
          />
          {formatDate(education.startDate)} - {formatDate(education.endDate)}
        </Typography>
      </CardContent>
    </Card>
  );
}
