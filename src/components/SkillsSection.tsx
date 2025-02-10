import { Box, Typography, CircularProgress, Grid, Paper } from "@mui/material";
import {
  calculateSkillDuration,
  formatDuration,
  calculateTotalMonths,
} from "@/utils/dateUtils";
import { Experience } from "@/types";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";
import { Code } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelectedSkill } from "@/context/SelectedSkillContext";
import { useEffect, useRef, useState } from "react";

interface SkillsSectionProps {
  experiences: Experience[];
}

const MotionPaper = motion(Paper);

export default function SkillsSection({ experiences }: SkillsSectionProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const { t, locale } = useTranslation();
  const commonTranslations = t("common");
  const { selectedSkill, setSelectedSkill } = useSelectedSkill();
  const skillRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleSkillClick = (skill: string) => {
    // Eğer aynı yeteneğe tıklandıysa sadece seçimi kaldır
    if (selectedSkill === skill) {
      setSelectedSkill(null);
      return;
    }

    // Yeni yeteneği seç
    setSelectedSkill(skill);

    // İlk eşleşen iş deneyimini bul
    const firstMatchingExperience = experiences.find((exp) =>
      exp.skills.includes(skill)
    );

    if (firstMatchingExperience) {
      setTimeout(() => {
        const experienceElement = document.getElementById(
          `experience-${firstMatchingExperience.id}`
        );
        if (experienceElement) {
          const yOffset = -100;
          const y =
            experienceElement.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 100); // Küçük bir gecikme ekleyerek state'in güncellenmesini bekle
    }
  };

  useEffect(() => {
    if (selectedSkill && skillRefs.current[selectedSkill]) {
      const yOffset = -100;
      const element = skillRefs.current[selectedSkill];
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [selectedSkill]);

  // Yeni useEffect: selectedSkill değiştiğinde showAllSkills'i güncelle
  useEffect(() => {
    setShowAllSkills(selectedSkill !== null);
  }, [selectedSkill]);

  const skillDurations = calculateSkillDuration(experiences);
  const totalMonths = calculateTotalMonths(experiences);

  const handleShowAllSkills = () => {
    setShowAllSkills(!showAllSkills);

    // Eğer yetenekleri gizliyorsak (Daha Az Göster'e tıklandıysa)
    if (showAllSkills) {
      const skillsSection = document.getElementById("skills-section");
      if (skillsSection) {
        const yOffset = -100; // Üst menü için boşluk
        const y =
          skillsSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }} id="skills-section">
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 6,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "1.75rem" },
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: "40px",
            height: "3px",
            background: "linear-gradient(90deg, primary.main, transparent)",
            borderRadius: "4px",
          },
        }}
      >
        <Code
          sx={{
            color: "primary.main",
            fontSize: "2rem",
          }}
        />
        {commonTranslations.sections.skills}
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          maxHeight: showAllSkills ? "2000px" : "424px",
          overflow: "hidden",
          transition: "all 0.5s ease", // Smooth scroll ile uyumlu hız
          position: "relative",
          "&::after": !showAllSkills
            ? {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50px",
                background: `linear-gradient(to bottom, transparent, ${currentColors.background})`,
                pointerEvents: "none",
                transition: "opacity 0.5s ease", // Gradient için de aynı hız
              }
            : {},
        }}
      >
        {Array.from(skillDurations.entries()).map(
          ([skill, duration], index) => (
            <Grid item xs={12} sm={6} md={4} key={skill}>
              <MotionPaper
                ref={(el) => (skillRefs.current[skill] = el)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleSkillClick(skill)}
                sx={{
                  p: 3,
                  background: currentColors.surface,
                  border: `1px solid ${
                    selectedSkill === skill
                      ? currentColors.primary
                      : currentColors.surface
                  }`,
                  transition: "all 0.3s ease-in-out",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: currentColors.primary,
                    transform: "translateY(-4px)",
                    boxShadow: `0 4px 20px ${currentColors.primary}20`,
                    "& .MuiCircularProgress-root": {
                      transform: "scale(1.05)",
                    },
                  },
                  ...(selectedSkill === skill && {
                    transform: "translateY(-4px)",
                    boxShadow: `0 4px 20px ${currentColors.primary}40`,
                  }),
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={(duration / totalMonths) * 100}
                    size={120}
                    thickness={4}
                    sx={{
                      color: currentColors.primary,
                      transition: "all 0.3s ease-in-out",
                      "& .MuiCircularProgress-circle": {
                        strokeLinecap: "round",
                        transition: "stroke-dashoffset 0.8s ease-in-out",
                      },
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={120}
                    thickness={4}
                    sx={{
                      color: `${currentColors.primary}20`,
                      position: "absolute",
                      left: 0,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    {duration >= 12 && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: currentColors.secondary,
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {Math.floor(duration / 12)}{" "}
                        {locale === "tr" ? "yıl" : "year"}
                        {Math.floor(duration / 12) > 1 && locale === "en"
                          ? "s"
                          : ""}
                      </Typography>
                    )}
                    {duration % 12 > 0 && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: currentColors.secondary,
                          textAlign: "center",
                          lineHeight: 1,
                        }}
                      >
                        {duration % 12} {locale === "tr" ? "ay" : "month"}
                        {duration % 12 > 1 && locale === "en" ? "s" : ""}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: currentColors.secondary,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  {skill}
                </Typography>
              </MotionPaper>
            </Grid>
          )
        )}
      </Grid>
      {skillDurations.size > 6 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Typography
            variant="body1"
            onClick={handleShowAllSkills}
            sx={{
              color: currentColors.primary,
              cursor: "pointer",
              fontWeight: "medium",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {showAllSkills
              ? commonTranslations.skills.showLess
              : commonTranslations.skills.showAll}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
