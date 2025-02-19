"use client";

import dynamic from "next/dynamic";
import {
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import {
  ContactMail,
  Code,
} from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import ExperienceSection from "@/components/organisms/sections/ExperienceSection";
import EducationSection from "@/components/organisms/sections/EducationSection";
import BlogSection from "@/components/organisms/sections/BlogSection";
import SkillsSection from "@/components/organisms/sections/SkillsSection";
import HeroSection from "@/components/organisms/sections/HeroSection";
import resumeData from "@/config/resume.json";
import { calculateTotalExperience } from "@/utils/dateUtils";
import { fetchBlogPosts } from "@/utils/fetchBlogPosts";
import { BlogPost, Hero } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import config from "@/config/config.json";
import SectionTitle from "@/components/atoms/typography/SectionTitle";

// Lazy load components
const LazyContactSection = dynamic(() => import("@/components/organisms/sections/ContactSection"), {
  loading: () => <Typography>Loading contact form...</Typography>,
  ssr: false,
});

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, locale } = useTranslation();
  const commonTranslations = t("common");

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
    () => calculateTotalExperience(resumeData.experiences, locale),
    [locale]
  );

  if (!currentDate) {
    return null;
  }

  const hero: Hero = resumeData.hero;

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
            <HeroSection 
              hero={hero}
              locale={locale} 
            />
          </Grid>

          {/* Experience Section */}
          {config.features.sections.experience && (
            <Grid item xs={12}>
              <ExperienceSection
                experiences={resumeData.experiences}
                totalExperience={totalExperience}
                sectionTitle={commonTranslations.sections.experience}
              />
            </Grid>
          )}

          {/* Skills Section */}
          {config.features.sections.skills && (
            <Grid item xs={12}>
              <Box sx={{ mt: 4 }}>
                <SectionTitle
                  icon={Code}
                  title={commonTranslations.sections.skills}
                />
                <SkillsSection experiences={resumeData.experiences} />
              </Box>
            </Grid>
          )}

          {/* Education Section */}
          {config.features.sections.education && (
            <Grid item xs={12}>
              <EducationSection
                education={resumeData.education}
                sectionTitle={commonTranslations.sections.education}
              />
            </Grid>
          )}

          {/* Blog Section */}
          {config.features.sections.blog && (
            <Grid item xs={12}>
              <BlogSection
                blogPosts={blogPosts}
                loading={loading}
                sectionTitle={commonTranslations.sections.blog}
                loadingText={commonTranslations.blog.loading}
                noPostsText={commonTranslations.blog.noPosts}
              />
            </Grid>
          )}

          {/* Contact Section */}
          {(config.features.sections.contact.showContactInfo || config.features.sections.contact.showMessageForm) && (
            <Grid item xs={12}>
              <Box sx={{ mt: 4 }}>
                <SectionTitle
                  icon={ContactMail}
                  title={commonTranslations.sections.contact}
                />
                <Box>
                  <LazyContactSection />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
