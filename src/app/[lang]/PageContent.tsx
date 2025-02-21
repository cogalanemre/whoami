'use client';

import dynamic from "next/dynamic";
import {
  Box,
  Grid,
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import type { BlogPost, Hero } from "@/types";
import config from "@/config/config.json";
import resumeData from "@/config/resume.json";
import { memo } from "react";
import LoadingSkeleton from "@/components/atoms/feedback/LoadingSkeleton";
import { UI_CONSTANTS } from "@/constants";

/**
 * Dinamik olarak yüklenen bölümler
 * Code splitting ve lazy loading için Next.js dynamic import kullanılıyor
 * Her bölüm için özel yükleme durumu gösteriliyor
 */

/**
 * Hero bölümü
 * Kullanıcı bilgileri ve ana başlıkları içerir
 */
const DynamicHeroSection = dynamic(() => import("@/components/organisms/sections/HeroSection"), {
  loading: () => <LoadingSkeleton height={UI_CONSTANTS.COMPONENTS.SKELETON.HEIGHT.HERO} withTitle={false} />,
  ssr: true,
});

/**
 * Deneyim bölümü
 * İş deneyimleri ve toplam deneyim süresini gösterir
 */
const DynamicExperienceSection = dynamic(() => import("@/components/organisms/sections/ExperienceSection"), {
  loading: () => <LoadingSkeleton height={UI_CONSTANTS.COMPONENTS.SKELETON.HEIGHT.SECTION} title="Experience" />,
  ssr: true,
});

/**
 * Yetenekler bölümü
 * Teknik beceriler ve uzmanlık alanlarını listeler
 */
const DynamicSkillsSection = dynamic(() => import("@/components/organisms/sections/SkillsSection"), {
  loading: () => <LoadingSkeleton height={UI_CONSTANTS.COMPONENTS.SKELETON.HEIGHT.SECTION} title="Skills" />,
  ssr: true,
});

/**
 * Eğitim bölümü
 * Eğitim geçmişi ve akademik bilgileri gösterir
 */
const DynamicEducationSection = dynamic(() => import("@/components/organisms/sections/EducationSection"), {
  loading: () => <LoadingSkeleton height={UI_CONSTANTS.COMPONENTS.SKELETON.HEIGHT.SECTION} title="Education" />,
  ssr: true,
});

/**
 * Blog bölümü
 * Medium'dan çekilen blog yazılarını listeler
 */
const DynamicBlogSection = dynamic(() => import("@/components/organisms/sections/BlogSection"), {
  loading: () => <LoadingSkeleton height={UI_CONSTANTS.COMPONENTS.SKELETON.HEIGHT.SECTION} title="Blog" />,
  ssr: true,
});

/**
 * İletişim bölümü
 * İletişim formu ve bilgilerini içerir
 * Client-side rendering kullanır (ssr: false)
 */
const DynamicContactSection = dynamic(() => import("@/components/organisms/sections/ContactSection"), {
  loading: () => <LoadingSkeleton height={UI_CONSTANTS.COMPONENTS.SKELETON.HEIGHT.CONTACT} title="Contact" />,
  ssr: false,
});

/**
 * Sayfa içeriği için gerekli prop tipleri
 * 
 * @interface PageContentProps
 * @property {("tr"|"en")} lang - Aktif dil kodu
 * @property {BlogPost[]} blogPosts - Medium'dan çekilen blog yazıları
 * @property {string} totalExperience - Toplam deneyim süresi
 * @property {Hero} hero - Kullanıcı profil bilgileri
 */
interface PageContentProps {
  lang: "tr" | "en";
  blogPosts: BlogPost[];
  totalExperience: string;
  hero: Hero;
}

/**
 * Çoklu dil desteği için metinler
 * Her dil için sayfa içinde kullanılan statik metinleri içerir
 */
const translations = {
  tr: {
    experience: "Deneyim",
    skills: "Yetenekler",
    education: "Eğitim",
    blog: "Blog",
    contact: "İletişim",
    loadingBlog: "Blog yazıları yükleniyor...",
    noBlogPosts: "Henüz blog yazısı yok.",
  },
  en: {
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    blog: "Blog",
    contact: "Contact",
    loadingBlog: "Loading blog posts...",
    noBlogPosts: "No blog posts yet.",
  }
} as const;

/**
 * Translation tipi için type alias
 * Tip güvenliği için kullanılır
 */
type TranslationType = typeof translations.tr;

/**
 * Desteklenen diller için type alias
 * Tip güvenliği için kullanılır
 */
type SupportedLanguages = keyof typeof translations;

/**
 * Ana sayfa içeriği bileşeni
 * Tüm bölümleri yönetir ve responsive görünümü sağlar
 * 
 * @component
 * @param {PageContentProps} props - Bileşen props'ları
 * @returns {JSX.Element} Render edilecek sayfa içeriği
 */
function PageContent({
  lang,
  blogPosts,
  totalExperience,
  hero,
}: PageContentProps) {
  /**
   * Material-UI tema ve medya query hook'ları
   * Responsive tasarım için kullanılır
   */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  /**
   * Aktif dile göre metinleri seç
   */
  const t = translations[lang as SupportedLanguages];

  /**
   * Ekran boyutuna göre container genişliğini belirle
   */
  const containerMaxWidth = isMobile 
    ? UI_CONSTANTS.LAYOUT.CONTAINER.MAX_WIDTH.MOBILE
    : isTablet 
      ? UI_CONSTANTS.LAYOUT.CONTAINER.MAX_WIDTH.TABLET 
      : UI_CONSTANTS.LAYOUT.CONTAINER.MAX_WIDTH.DESKTOP;

  return (
    <Container
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center",
        maxWidth: containerMaxWidth,
        transition: 'max-width 0.3s ease'
      }}
    >
      <Box
        component="main"
        sx={{
          py: { xs: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.XS, md: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.SM },
          px: { xs: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.XS, sm: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.SM },
          width: "100%",
        }}
      >
        <Grid 
          container 
          spacing={{ 
            xs: UI_CONSTANTS.LAYOUT.CONTAINER.SPACING.XS, 
            md: UI_CONSTANTS.LAYOUT.CONTAINER.SPACING.MD 
          }}
        >
          {/* Hero Section */}
          <Grid item xs={12}>
            <DynamicHeroSection 
              hero={hero}
              locale={lang} 
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

export default memo(PageContent); 