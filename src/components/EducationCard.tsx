import { Card, CardContent, Typography, Box } from "@mui/material";
import { Education } from "@/data/education";
import { formatDate } from "@/utils/dateUtils";
import { School } from "@mui/icons-material";

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <Card
      sx={{
        background: "rgba(36, 36, 36, 0.5)",
        ml: { xs: 0, md: 4 },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
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
        <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
          {education.location}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {formatDate(education.startDate)} - {formatDate(education.endDate)}
        </Typography>
      </CardContent>
    </Card>
  );
}
