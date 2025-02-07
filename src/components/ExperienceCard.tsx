import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  Box,
} from "@mui/material";
import { Experience } from "@/data/experiences";
import { formatDate, calculateDuration } from "@/utils/dateUtils";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card
      sx={{
        background: "rgba(36, 36, 36, 0.5)",
        position: "relative",
        ml: { xs: 0, md: 4 },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start", mb: 2 }}>
          <Avatar
            src={experience.logo}
            alt={experience.company}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "transparent",
              border: "2px solid",
              borderColor: "primary.main",
              display: { xs: "none", md: "block" },
              "& img": {
                objectFit: "cover",
                borderRadius: "50%",
              },
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {experience.title}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {experience.company} • {formatDate(experience.startDate)} -{" "}
              {experience.isCurrentJob
                ? "Günümüz"
                : formatDate(experience.endDate)}{" "}
              (
              {calculateDuration(
                experience.startDate,
                experience.isCurrentJob ? new Date() : experience.endDate
              )}
              )
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", mb: 1 }}
            >
              {experience.location} • {experience.type}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {experience.description.map((desc, index) => (
            <span key={index}>
              • {desc}
              <br />
            </span>
          ))}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
          {experience.skills.map((skill, index) => (
            <Chip
              key={index}
              size="small"
              label={skill}
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
