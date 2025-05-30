'use client';

import dynamic from 'next/dynamic';
import { Grid, Container, useTheme, useMediaQuery } from '@mui/material';
import type { BlogPost, Hero } from '@/types';
import config from '@/config/config.json';
import resumeData from '@/config/resume.json';
import { memo, useMemo } from 'react';
import { THEME_CONSTANTS } from '@/theme/theme';
import { getTranslation } from '@/i18n/utils';
import type { CvFile } from '@/utils/getCvFiles';
import { AppProvider } from '@/context/AppContext';

/**
 * Bölüm Grid bileşeni
 * Koşullu render için yardımcı bileşen
 */
const SectionGrid = ({ children, condition = true }) => 
  condition ? <Grid item xs={12}>{children}</Grid> : null;

/**
 * Dinamik olarak yüklenen bölümler
 * Code splitting ve lazy loading için Next.js dynamic import kullanılıyor
 *
 * SSR (Server Side Rendering) Stratejisi:
 * - ssr: true -> Bileşen sunucu tarafında render edilir, SEO için önemlidir
 * - ssr: false -> Bileşen sadece client tarafında render edilir, form gibi interaktif öğeler için uygundur
 */

/**
 * Hero bölümü
 * Kullanıcı bilgileri ve ana başlıkları içerir
 * SSR aktif: SEO için önemli içerik
 */
const DynamicHeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: true, // SEO için kritik içerik
});

/**
 * Deneyim bölümü
 * İş deneyimleri ve toplam deneyim süresini gösterir
 * SSR aktif: SEO için önemli içerik
 */
const DynamicExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), {
  ssr: true, // SEO için kritik içerik
});

/**
 * Eğitim bölümü
 * Eğitim geçmişi ve akademik bilgileri gösterir
 * SSR aktif: SEO için önemli içerik
 */
const DynamicEducationSection = dynamic(() => import('@/components/sections/EducationSection'), {
  ssr: true, // SEO için kritik içerik
});

/**
 * Blog bölümü
 * Medium'dan çekilen blog yazılarını listeler
 * SSR aktif: SEO için önemli içerik
 */
const DynamicBlogSection = dynamic(() => import('@/components/sections/BlogSection'), {
  ssr: true, // SEO için kritik içerik
});

/**
 * Proje bölümü
 * Projeleri grid yapısında gösterir
 * SSR aktif: SEO için önemli içerik
 */
const DynamicProjectSection = dynamic(() => import('@/components/sections/ProjectSection'), {
  ssr: true, // SEO için kritik içerik
});

/**
 * Yetenekler bölümü
 * Kullanıcının yeteneklerini kategorilere göre gösterir
 * SSR aktif: SEO için önemli içerik
 */
const DynamicSkillSection = dynamic(() => import('@/components/sections/SkillSection'), {
  ssr: true, // SEO için kritik içerik
});

/**
 * Tavsiye bölümü
 * Kullanıcının aldığı tavsiyeleri gösterir
 * SSR aktif: SEO için önemli içerik
 */
const DynamicRecommendationSection = dynamic(() => import('@/components/sections/RecommendationSection'), {
  ssr: true, // SEO için kritik içerik
});

/**
 * İletişim bölümü
 * İletişim formu ve bilgilerini içerir
 * SSR devre dışı çünkü:
 * 1. Form elemanları client-side JavaScript gerektiriyor
 * 2. SEO için kritik içerik değil
 * 3. Kullanıcı etkileşimi odaklı bir bölüm
 * 4. EmailJS gibi client-side servisleri kullanıyor
 */
const DynamicContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  ssr: false, // Client-side only rendering
});

/**
 * Sayfa içeriği için gerekli prop tipleri
 *
 * @interface PageContentProps
 * @property {("tr"|"en")} lang - Aktif dil kodu
 * @property {BlogPost[]} blogPosts - Medium'dan çekilen blog yazıları
 * @property {string} totalExperience - Toplam deneyim süresi
 * @property {Hero} hero - Kullanıcı profil bilgileri
 * @property {CvFile[]} cvFiles - Context için gerekli CV dosyaları
 */
interface PageContentProps {
  lang: 'tr' | 'en';
  blogPosts: BlogPost[];
  totalExperience: string;
  hero: Hero;
  cvFiles: CvFile[]; // Context için gerekli
}

/**
 * Ana sayfa içeriği bileşeni
 * Tüm bölümleri yönetir ve responsive görünümü sağlar
 *
 * @component
 * @param {PageContentProps} props - Bileşen props'ları
 * @returns {JSX.Element} Render edilecek sayfa içeriği
 */
function PageContent({ lang, blogPosts, totalExperience, hero, cvFiles }: PageContentProps) {
  /**
   * Material-UI tema ve medya query hook'ları
   * Responsive tasarım için kullanılır
   */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  /**
   * i18n çevirilerini al ve önbelleğe al
   * Sadece lang değiştiğinde yeniden hesaplanır
   */
  const t = useMemo(() => ({
    sections: {
      experience: getTranslation('sections.experience', lang),
      skills: getTranslation('sections.skills', lang),
      education: getTranslation('sections.education', lang),
      blog: getTranslation('sections.blog', lang),
      projects: getTranslation('sections.projects', lang),
      recommendations: getTranslation('sections.recommendations', lang),
    },
    blog: {
      noPosts: getTranslation('blog.noPosts', lang),
    },
  }), [lang]);

  /**
   * Ekran boyutuna göre container genişliğini belirle
   */
  const containerMaxWidth = isMobile
    ? THEME_CONSTANTS.layout.container.maxWidth.mobile
    : isTablet
    ? THEME_CONSTANTS.layout.container.maxWidth.tablet
    : THEME_CONSTANTS.layout.container.maxWidth.desktop;

  /**
   * İletişim bölümünün gösterilip gösterilmeyeceğini belirler
   */
  const shouldShowContactSection = () => 
    config.features.sections.contact.contactInfo || 
    config.features.sections.contact.messageForm;

  const STYLE = {
    CONTAINER: {
      minHeight: '100vh',
      maxWidth: containerMaxWidth,
      py: {
        xs: THEME_CONSTANTS.layout.container.padding.xs,
        md: THEME_CONSTANTS.layout.container.padding.sm,
      },
      px: {
        xs: THEME_CONSTANTS.layout.container.padding.xs,
        sm: THEME_CONSTANTS.layout.container.padding.sm,
      },
      mt: {
        xs: THEME_CONSTANTS.layout.container.spacing.xs,
        md: THEME_CONSTANTS.layout.container.spacing.md,
      },
    },
    SPACING: {
      xs: THEME_CONSTANTS.layout.container.spacing.xs,
      md: THEME_CONSTANTS.layout.container.spacing.md,
    }
  } as const;

  return (
    <AppProvider lang={lang} cvFiles={cvFiles}>
      <Container
        component="main"
        sx={STYLE.CONTAINER}
      >
        <Grid
          container
          spacing={STYLE.SPACING}
        >
          {/* Hero Section */}
          <SectionGrid>
            <DynamicHeroSection hero={hero} />
          </SectionGrid>

          {/* Experience Section */}
          <SectionGrid condition={config.features.sections.experience}>
            <DynamicExperienceSection
              experiences={resumeData.experiences}
              totalExperience={totalExperience}
              sectionTitle={t.sections.experience}
            />
          </SectionGrid>

          {/* Project Section */}
          <SectionGrid condition={config.features.sections.projects}>
            <DynamicProjectSection
              projects={resumeData.projects}
              sectionTitle={t.sections.projects}
            />
          </SectionGrid>

          {/* Skills Section */}
          <SectionGrid condition={config.features.sections.skills}>
            <DynamicSkillSection
              experiences={resumeData.experiences}
              projects={resumeData.projects}
              sectionTitle={t.sections.skills}
            />
          </SectionGrid>

          {/* Education Section */}
          <SectionGrid condition={config.features.sections.education}>
            <DynamicEducationSection
              education={resumeData.education}
              sectionTitle={t.sections.education}
            />
          </SectionGrid>

          {/* Blog Section */}
          <SectionGrid condition={config.features.sections.blog}>
            <DynamicBlogSection
              blogPosts={blogPosts}
              sectionTitle={t.sections.blog}
              noPostsText={t.blog.noPosts}
            />
          </SectionGrid>

          {/* Recommendation Section */}
          <SectionGrid condition={config.features.sections.recommendations}>
            <DynamicRecommendationSection
              recommendations={resumeData.recommendations}
              sectionTitle={t.sections.recommendations}
            />
          </SectionGrid>

          {/* Contact Section */}
          <SectionGrid condition={shouldShowContactSection()}>
            <DynamicContactSection />
          </SectionGrid>
        </Grid>
      </Container>
    </AppProvider>
  );
}

export default memo(PageContent);
