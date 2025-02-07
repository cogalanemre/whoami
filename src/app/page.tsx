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
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Email,
  BusinessCenter,
  School,
  Article,
  ContactMail,
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

// Lazy load components
const Typewriter = dynamic(() => import("@/components/Typewriter"), {
  loading: () => (
    <Typography variant="h2" color="primary">
      Yükleniyor...
    </Typography>
  ),
  ssr: false,
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <Typography>İletişim formu yükleniyor...</Typography>,
  ssr: false,
});

const MotionBox = motion(Box);

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
                backgroundColor: "rgba(100, 255, 218, 0.1)",
                transform: "translateY(-2px) scale(1.05)",
                transition: "all 0.2s ease-in-out",
                boxShadow: "0 4px 20px rgba(100, 255, 218, 0.2)",
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
                backgroundColor: "rgba(100, 255, 218, 0.1)",
                transform: "translateY(-2px) scale(1.05)",
                transition: "all 0.2s ease-in-out",
                boxShadow: "0 4px 20px rgba(100, 255, 218, 0.2)",
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
                backgroundColor: "rgba(100, 255, 218, 0.1)",
                transform: "translateY(-2px) scale(1.05)",
                transition: "all 0.2s ease-in-out",
                boxShadow: "0 4px 20px rgba(100, 255, 218, 0.2)",
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
                      `linear-gradient(90deg, transparent, ${theme.palette.primary.main}66, transparent)`,
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
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
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
                  gap: 1,
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
                    filter: "drop-shadow(0 0 8px rgba(100, 255, 218, 0.3))",
                  }}
                />
                İş Tecrübesi
                <Typography
                  component="span"
                  variant="h6"
                  sx={{
                    ml: 2,
                    color: "primary.main",
                    opacity: 0.8,
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
                  gap: 1,
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
                    filter: "drop-shadow(0 0 8px rgba(100, 255, 218, 0.3))",
                  }}
                />
                Eğitim
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
                  gap: 1,
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
                    filter: "drop-shadow(0 0 8px rgba(100, 255, 218, 0.3))",
                  }}
                />
                Blog Yazılarım
              </Typography>
              <Box>
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                  {loading ? (
                    <Grid item xs={12}>
                      <Typography align="center">
                        Yazılar yükleniyor...
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
                        Henüz blog yazısı bulunmuyor.
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
                  gap: 1,
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
                    filter: "drop-shadow(0 0 8px rgba(100, 255, 218, 0.3))",
                  }}
                />
                İletişim
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
