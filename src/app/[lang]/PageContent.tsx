'use client';

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
import ExperienceSection from "@/components/organisms/sections/ExperienceSection";
import EducationSection from "@/components/organisms/sections/EducationSection";
import BlogSection from "@/components/organisms/sections/BlogSection";
import SkillsSection from "@/components/organisms/sections/SkillsSection";
import HeroSection from "@/components/organisms/sections/HeroSection";
import resumeData from "@/config/resume.json";
import { BlogPost, Hero } from "@/types";
import config from "@/config/config.json";
import SectionTitle from "@/components/atoms/typography/SectionTitle";

// Lazy load components
const LazyContactSection = dynamic(() => import("@/components/organisms/sections/ContactSection"), {
  loading: () => <Typography>Loading contact form...</Typography>,
  ssr: false,
});

interface PageContentProps {
  lang: string;
  blogPosts: BlogPost[];
  totalExperience: string;
  hero: Hero;
}

// Client component olarak sayfa içeriği
export default function PageContent({
  lang,
  blogPosts,
  totalExperience,
  hero,
}: PageContentProps) {
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
              locale={lang as "tr" | "en"} 
            />
          </Grid>

          {/* Experience Section */}
          {config.features.sections.experience && (
            <Grid item xs={12}>
              <ExperienceSection
                experiences={resumeData.experiences}
                totalExperience={totalExperience}
                sectionTitle={lang === "tr" ? "Deneyim" : "Experience"}
              />
            </Grid>
          )}

          {/* Skills Section */}
          {config.features.sections.skills && (
            <Grid item xs={12}>
              <Box sx={{ mt: 4 }}>
                <SectionTitle
                  icon={Code}
                  title={lang === "tr" ? "Yetenekler" : "Skills"}
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
                sectionTitle={lang === "tr" ? "Eğitim" : "Education"}
              />
            </Grid>
          )}

          {/* Blog Section */}
          {config.features.sections.blog && (
            <Grid item xs={12}>
              <BlogSection
                blogPosts={blogPosts}
                loading={false}
                sectionTitle={lang === "tr" ? "Blog" : "Blog"}
                loadingText={lang === "tr" ? "Blog yazıları yükleniyor..." : "Loading blog posts..."}
                noPostsText={lang === "tr" ? "Henüz blog yazısı yok." : "No blog posts yet."}
              />
            </Grid>
          )}

          {/* Contact Section */}
          {(config.features.sections.contact.showContactInfo || config.features.sections.contact.showMessageForm) && (
            <Grid item xs={12}>
              <Box sx={{ mt: 4 }}>
                <SectionTitle
                  icon={ContactMail}
                  title={lang === "tr" ? "İletişim" : "Contact"}
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