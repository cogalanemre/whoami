'use client';

import dynamic from 'next/dynamic';
import { Grid, Container, useTheme, useMediaQuery } from '@mui/material';
import type { BlogPost, Hero } from '@/types';
import config from '@/config/config.json';
import resumeData from '@/config/resume.json';
import { memo } from 'react';
import { UI_CONSTANTS } from '@/constants';
import { getTranslation } from '@/i18n/utils';

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
 * Yetenekler bölümü
 * Teknik beceriler ve uzmanlık alanlarını listeler
 * SSR aktif: SEO için önemli içerik
 */
const DynamicSkillsSection = dynamic(() => import('@/components/sections/SkillsSection'), {
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
 */
interface PageContentProps {
  lang: 'tr' | 'en';
  blogPosts: BlogPost[];
  totalExperience: string;
  hero: Hero;
}

/**
 * Ana sayfa içeriği bileşeni
 * Tüm bölümleri yönetir ve responsive görünümü sağlar
 *
 * @component
 * @param {PageContentProps} props - Bileşen props'ları
 * @returns {JSX.Element} Render edilecek sayfa içeriği
 */
function PageContent({ lang, blogPosts, totalExperience, hero }: PageContentProps) {
  /**
   * Material-UI tema ve medya query hook'ları
   * Responsive tasarım için kullanılır
   */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  /**
   * i18n çevirilerini al
   */
  const t = {
    sections: {
      experience: getTranslation('sections.experience', lang),
      skills: getTranslation('sections.skills', lang),
      education: getTranslation('sections.education', lang),
      blog: getTranslation('sections.blog', lang),
    },
    blog: {
      loading: getTranslation('blog.loading', lang),
      noPosts: getTranslation('blog.noPosts', lang),
    },
  };

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
      component="main"
      sx={{
        minHeight: '100vh',
        maxWidth: containerMaxWidth,
        transition: 'max-width 0.3s ease',
        py: {
          xs: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.XS,
          md: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.SM,
        },
        px: {
          xs: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.XS,
          sm: UI_CONSTANTS.LAYOUT.CONTAINER.PADDING.SM,
        },
      }}
    >
      <Grid
        container
        spacing={{
          xs: UI_CONSTANTS.LAYOUT.CONTAINER.SPACING.XS,
          md: UI_CONSTANTS.LAYOUT.CONTAINER.SPACING.MD,
        }}
      >
        {/* Hero Section */}
        <Grid item xs={12}>
          <DynamicHeroSection hero={hero} locale={lang} />
        </Grid>

        {/* Experience Section */}
        {config.features.sections.experience && (
          <Grid item xs={12}>
            <DynamicExperienceSection
              experiences={resumeData.experiences}
              totalExperience={totalExperience}
              sectionTitle={t.sections.experience}
            />
          </Grid>
        )}

        {/* Skills Section */}
        {config.features.sections.skills && (
          <Grid item xs={12}>
            <DynamicSkillsSection experiences={resumeData.experiences} title={t.sections.skills} />
          </Grid>
        )}

        {/* Education Section */}
        {config.features.sections.education && (
          <Grid item xs={12}>
            <DynamicEducationSection
              education={resumeData.education}
              sectionTitle={t.sections.education}
            />
          </Grid>
        )}

        {/* Blog Section */}
        {config.features.sections.blog && (
          <Grid item xs={12}>
            <DynamicBlogSection
              blogPosts={blogPosts}
              loading={false}
              sectionTitle={t.sections.blog}
              loadingText={t.blog.loading}
              noPostsText={t.blog.noPosts}
            />
          </Grid>
        )}

        {/* Contact Section */}
        {(config.features.sections.contact.showContactInfo ||
          config.features.sections.contact.showMessageForm) && (
          <Grid item xs={12}>
            <DynamicContactSection />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default memo(PageContent);
