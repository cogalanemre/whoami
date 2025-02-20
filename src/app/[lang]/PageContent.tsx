'use client';

import dynamic from "next/dynamic";
import {
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { BlogPost, Hero } from "@/types";
import config from "@/config/config.json";
import resumeData from "@/config/resume.json";
import { memo } from "react";

// Lazy load all sections
const DynamicHeroSection = dynamic(() => import("@/components/organisms/sections/HeroSection"), {
  loading: () => <Typography>Loading hero section...</Typography>,
  ssr: true,
});

const DynamicExperienceSection = dynamic(() => import("@/components/organisms/sections/ExperienceSection"), {
  loading: () => <Typography>Loading experience section...</Typography>,
  ssr: true,
});

const DynamicSkillsSection = dynamic(() => import("@/components/organisms/sections/SkillsSection"), {
  loading: () => <Typography>Loading skills section...</Typography>,
  ssr: true,
});

const DynamicEducationSection = dynamic(() => import("@/components/organisms/sections/EducationSection"), {
  loading: () => <Typography>Loading education section...</Typography>,
  ssr: true,
});

const DynamicBlogSection = dynamic(() => import("@/components/organisms/sections/BlogSection"), {
  loading: () => <Typography>Loading blog section...</Typography>,
  ssr: true,
});

const DynamicContactSection = dynamic(() => import("@/components/organisms/sections/ContactSection"), {
  loading: () => <Typography>Loading contact form...</Typography>,
  ssr: false,
});

interface PageContentProps {
  lang: string;
  blogPosts: BlogPost[];
  totalExperience: string;
  hero: Hero;
}

// Dil bazlı metinleri statik olarak tanımla
const translations = {
  tr: {
    experience: "Deneyim",
    skills: "Yetenekler",
    education: "Eğitim",
    blog: "Blog",
    contact: "İletişim",
    loadingBlog: "Blog yazıları yükleniyor...",
    noBlogPosts: "Henüz blog yazısı yok.",
    loading: {
      hero: "Hero bölümü yükleniyor...",
      experience: "Deneyim bölümü yükleniyor...",
      skills: "Yetenekler bölümü yükleniyor...",
      education: "Eğitim bölümü yükleniyor...",
      blog: "Blog bölümü yükleniyor...",
      contact: "İletişim formu yükleniyor..."
    }
  },
  en: {
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    blog: "Blog",
    contact: "Contact",
    loadingBlog: "Loading blog posts...",
    noBlogPosts: "No blog posts yet.",
    loading: {
      hero: "Loading hero section...",
      experience: "Loading experience section...",
      skills: "Loading skills section...",
      education: "Loading education section...",
      blog: "Loading blog section...",
      contact: "Loading contact form..."
    }
  }
};

// Client component olarak sayfa içeriği
function PageContent({
  lang,
  blogPosts,
  totalExperience,
  hero,
}: PageContentProps) {
  const t = translations[lang as keyof typeof translations];

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
            <DynamicHeroSection 
              hero={hero}
              locale={lang as "tr" | "en"} 
            />
          </Grid>

          {/* Experience Section */}
          {config.features.sections.experience && (
            <Grid item xs={12}>
              <DynamicExperienceSection
                experiences={resumeData.experiences}
                totalExperience={totalExperience}
                sectionTitle={t.experience}
              />
            </Grid>
          )}

          {/* Skills Section */}
          {config.features.sections.skills && (
            <Grid item xs={12}>
              <DynamicSkillsSection 
                experiences={resumeData.experiences}
                title={t.skills}
              />
            </Grid>
          )}

          {/* Education Section */}
          {config.features.sections.education && (
            <Grid item xs={12}>
              <DynamicEducationSection
                education={resumeData.education}
                sectionTitle={t.education}
              />
            </Grid>
          )}

          {/* Blog Section */}
          {config.features.sections.blog && (
            <Grid item xs={12}>
              <DynamicBlogSection
                blogPosts={blogPosts}
                loading={false}
                sectionTitle={t.blog}
                loadingText={t.loadingBlog}
                noPostsText={t.noBlogPosts}
              />
            </Grid>
          )}

          {/* Contact Section */}
          {(config.features.sections.contact.showContactInfo || config.features.sections.contact.showMessageForm) && (
            <Grid item xs={12}>
              <DynamicContactSection />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

// memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(PageContent); 