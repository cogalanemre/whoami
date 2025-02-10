"use client";

import dynamic from "next/dynamic";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Container,
  useTheme,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Email,
  BusinessCenter,
  School,
  Article,
  ContactMail,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import EducationCard from "@/components/EducationCard";
import BlogCard from "@/components/BlogCard";
import { personalInfo } from "@/data/personalInfo";
import { experiences } from "@/data/experiences";
import { education } from "@/data/education";
import { calculateTotalExperience } from "@/utils/dateUtils";
import { fetchBlogPosts } from "@/utils/fetchBlogPosts";
import { BlogPost } from "@/data/blog";
import type { ContactFormData } from "@/types";
import { useThemeContext } from "@/context/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Lazy load components
const Typewriter = dynamic(() => import("@/components/Typewriter"), {
  loading: () => <Typography variant="h2"></Typography>,
  ssr: false,
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <Typography>Loading contact form...</Typography>,
  ssr: false,
});

const MotionBox = motion(Box);

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error("Blog yazıları yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Memoize expensive calculations
  const totalExperience = useMemo(
    () => calculateTotalExperience(experiences),
    []
  );

  const socialButtons = useMemo(
    () => (
      <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
        {personalInfo.social.github && (
          <IconButton
            color="primary"
            size="large"
            href={personalInfo.social.github}
            target="_blank"
            sx={{
              border: "2px solid",
              borderColor: "primary.main",
              backdropFilter: "blur(4px)",
              "&:hover": {
                transform: "translateY(-2px)",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <GitHub />
          </IconButton>
        )}
        {personalInfo.social.linkedin && (
          <IconButton
            color="primary"
            size="large"
            href={personalInfo.social.linkedin}
            target="_blank"
            sx={{
              border: "2px solid",
              borderColor: "primary.main",
              backdropFilter: "blur(4px)",
              "&:hover": {
                transform: "translateY(-2px)",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <LinkedIn />
          </IconButton>
        )}
        {personalInfo.social.email && (
          <IconButton
            color="primary"
            size="large"
            href={personalInfo.social.email}
            sx={{
              border: "2px solid",
              borderColor: "primary.main",
              backdropFilter: "blur(4px)",
              "&:hover": {
                transform: "translateY(-2px)",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <Email />
          </IconButton>
        )}
      </Stack>
    ),
    []
  );

  if (!currentDate) {
    return null;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <LanguageSwitcher />
      <Box
        onClick={toggleTheme}
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          width: "70px",
          height: "30px",
          borderRadius: "15px",
          backgroundColor: theme.palette.background.paper,
          border: "2px solid",
          borderColor: "primary.main",
          display: "flex",
          alignItems: "center",
          padding: "2px",
          cursor: "pointer",
          zIndex: 1000,
          transition: "all 0.3s ease-in-out",
          justifyContent: "space-between",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: isDarkMode ? "primary.main" : "text.secondary",
            ml: 0.8,
            userSelect: "none",
            opacity: isDarkMode ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {t("theme.dark")}
        </Typography>
        <Box
          sx={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            backgroundColor: "primary.main",
            transform: isDarkMode ? "translateX(23px)" : "translateX(-20px)",
            transition: "transform 0.3s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.background.paper,
            position: "absolute",
            left: "18px",
          }}
        >
          {isDarkMode ? (
            <LightMode sx={{ fontSize: 16 }} />
          ) : (
            <DarkMode sx={{ fontSize: 16 }} />
          )}
        </Box>
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: !isDarkMode ? "primary.main" : "text.secondary",
            mr: 0.8,
            userSelect: "none",
            opacity: !isDarkMode ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {t("theme.light")}
        </Typography>
      </Box>
      <Box
        component="main"
        sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 3, sm: 4 },
          width: "100%",
        }}
      >
        <Grid container spacing={{ xs: 8, md: 12 }}>
          {/* Hero Section */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: {
                  xs: "calc(100vh - 96px)",
                  md: "calc(100vh - 128px)",
                },
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 4, md: 8 }}
                alignItems="center"
                sx={{
                  position: "relative",
                  pb: { xs: 8, md: 12 },
                  maxWidth: "1200px",
                  width: "100%",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    height: "2px",
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 200, sm: 250, md: 300 },
                    height: { xs: 200, sm: 250, md: 300 },
                    mx: { xs: "auto", md: 0 },
                    mb: { xs: 4, md: 0 },
                    bgcolor: "transparent",
                    alignSelf: "center",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                  alt={personalInfo.name}
                  src="/profile.png"
                />
                <Box
                  sx={{
                    pt: 1,
                    width: "100%",
                    textAlign: { xs: "center", md: "left" },
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h1"
                    gutterBottom
                    sx={{
                      mb: 1,
                      fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                      textAlign: { xs: "center", md: "left" },
                      fontWeight: "normal",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      justifyContent: { xs: "center", md: "flex-start" },
                      color: "primary.main",
                    }}
                  >
                    {personalInfo.name}
                  </Typography>
                  <Box
                    sx={{
                      minHeight: "60px",
                      textAlign: { xs: "center", md: "left" },
                      mb: 1,
                    }}
                  >
                    <Typewriter texts={personalInfo.titles} delay={150} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", md: "flex-start" },
                      position: "absolute",
                      bottom: { xs: -60, md: -70 },
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "100%",
                    }}
                  ></Box>
                </Box>
              </Stack>
            </MotionBox>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: -4, md: -6 },
                mb: { xs: 4, md: 6 },
              }}
            >
              {socialButtons}
            </Box>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 4,
                position: "relative",
              }}
            >
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
                    background:
                      "linear-gradient(90deg, primary.main, transparent)",
                    borderRadius: "4px",
                  },
                }}
              >
                <BusinessCenter
                  sx={{
                    color: "primary.main",
                    fontSize: "2rem",
                  }}
                />
                {t("sections.experience")}
                <Typography
                  component="span"
                  variant="h6"
                  sx={{
                    ml: 2,
                    color: "primary.main",
                    fontStyle: "italic",
                  }}
                >
                  ({totalExperience})
                </Typography>
              </Typography>
              <Box>
                <Stack spacing={6}>
                  {experiences.map((experience, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ExperienceCard experience={experience} />
                    </MotionBox>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Education Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
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
                    background:
                      "linear-gradient(90deg, primary.main, transparent)",
                    borderRadius: "4px",
                  },
                }}
              >
                <School
                  sx={{
                    color: "primary.main",
                    fontSize: "2rem",
                  }}
                />
                {t("sections.education")}
              </Typography>
              <Box>
                <Stack spacing={4}>
                  {education.map((edu, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EducationCard education={edu} />
                    </MotionBox>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Blog Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
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
                    background:
                      "linear-gradient(90deg, primary.main, transparent)",
                    borderRadius: "4px",
                  },
                }}
              >
                <Article
                  sx={{
                    color: "primary.main",
                    fontSize: "2rem",
                  }}
                />
                {t("sections.blog")}
              </Typography>
              <Box>
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                  {loading ? (
                    <Grid item xs={12}>
                      <Typography align="center">
                        {t("blog.loading")}
                      </Typography>
                    </Grid>
                  ) : blogPosts.length > 0 ? (
                    blogPosts.map((post) => (
                      <Grid item xs={12} sm={6} md={4} key={post.link}>
                        <MotionBox
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <BlogCard post={post} />
                        </MotionBox>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography align="center">
                        {t("blog.noPosts")}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
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
                    background:
                      "linear-gradient(90deg, primary.main, transparent)",
                    borderRadius: "4px",
                  },
                }}
              >
                <ContactMail
                  sx={{
                    color: "primary.main",
                    fontSize: "2rem",
                  }}
                />
                {t("sections.contact")}
              </Typography>
              <Box>
                <ContactSection
                  onSubmit={async (data: ContactFormData) => {
                    console.log("Form data:", data);
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
