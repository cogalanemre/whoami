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

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card
      sx={{
        background: "rgba(36, 36, 36, 0.5)",
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
          background: "rgba(0, 0, 0, 0.2)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {experience.location} • {experience.type}
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          {experience.description.map((desc, index) => (
            <span key={index}>
              • {desc}
              <br />
            </span>
          ))}
        </Typography>

        <Divider
          sx={{
            my: 2,
            borderColor: "rgba(255, 255, 255, 0.1)",
            "&::before, &::after": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
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
                bgcolor: "rgba(0, 0, 0, 0.2)",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(100, 255, 218, 0.1)",
                },
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
