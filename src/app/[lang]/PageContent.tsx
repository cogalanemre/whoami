'use client';

import dynamic from 'next/dynamic';
import { Grid } from '@mui/material';
import type { BlogPost, Hero } from '@/types';
import config from '@/config/config.json';
import resumeData from '@/config/resume.json';
import { memo, useMemo, useEffect, useState } from 'react';
import { getTranslation } from '@/i18n/utils';
import type { CvFile } from '@/utils/getCvFiles';
import { AppProvider } from '@/context/AppContext';
import NavigationCard from '@/components/cards/NavigationCard';
import { FaHome, FaBriefcase, FaCodeBranch, FaCode, FaGraduationCap, FaNewspaper, FaAddressCard, FaQuoteLeft } from 'react-icons/fa';
import { Box } from '@mui/material';

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
   * i18n çevirilerini al ve önbelleğe al
   * Sadece lang değiştiğinde yeniden hesaplanır
   */
  const t = useMemo(() => ({
    sections: {
      hero: getTranslation('sections.hero', lang),
      experience: getTranslation('sections.experience', lang),
      skills: getTranslation('sections.skills', lang),
      education: getTranslation('sections.education', lang),
      blog: getTranslation('sections.blog', lang),
      projects: getTranslation('sections.projects', lang),
      recommendations: getTranslation('sections.recommendations', lang),
      contact: getTranslation('sections.contact', lang),
    },
    blog: {
      noPosts: getTranslation('blog.noPosts', lang),
    },
  }), [lang]);

  /**
   * İletişim bölümünün gösterilip gösterilmeyeceğini belirler
   */
  const shouldShowContactSection = () => 
    config.features.sections.contact.contactInfo || 
    config.features.sections.contact.messageForm;

  const STYLE = {
    CONTAINER: {
      position: 'relative',
      minHeight: '100vh',
      py: 4,
      px: { xs: 2, sm: 3, md: 4 },
      pl: { xs: 2, sm: 3, md: 4, lg: 12 }, // Reduced left padding for smaller navigation card
    },
    SPACING: { xs: 2, sm: 3, md: 4 },
  } as const;

  const navigationSections = [
    {
      id: 'hero',
      title: t.sections.hero,
      icon: <FaHome />,
    },
    {
      id: 'experience',
      title: t.sections.experience,
      icon: <FaBriefcase />,
    },
    {
      id: 'projects',
      title: t.sections.projects,
      icon: <FaCodeBranch />,
    },
    {
      id: 'skills',
      title: t.sections.skills,
      icon: <FaCode />,
    },
    {
      id: 'education',
      title: t.sections.education,
      icon: <FaGraduationCap />,
    },
    {
      id: 'blog',
      title: t.sections.blog,
      icon: <FaNewspaper />,
    },
    {
      id: 'recommendations',
      title: t.sections.recommendations,
      icon: <FaQuoteLeft />,
    },
    {
      id: 'contact',
      title: t.sections.contact,
      icon: <FaAddressCard />,
    },
  ];

  const sectionIds = useMemo(() => [
    'hero',
    'experience',
    'projects',
    'skills',
    'education',
    'blog',
    'recommendations',
    'contact',
  ], []);

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return (
    <AppProvider lang={lang} cvFiles={cvFiles}>
      <Box sx={STYLE.CONTAINER}>
        <NavigationCard sections={navigationSections} activeSection={activeSection} />
        <Grid
          container
          spacing={STYLE.SPACING}
          sx={{
            '& > .MuiGrid-item': {
              paddingLeft: '0 !important',
              paddingRight: '0 !important'
            }
          }}
        >
          {/* Hero Section */}
          <SectionGrid>
            <div id="hero">
              <DynamicHeroSection hero={hero} />
            </div>
          </SectionGrid>

          {/* Experience Section */}
          <SectionGrid condition={config.features.sections.experience}>
            <div id="experience">
              <DynamicExperienceSection
                experiences={resumeData.experiences}
                totalExperience={totalExperience}
                sectionTitle={t.sections.experience}
              />
            </div>
          </SectionGrid>

          {/* Project Section */}
          <SectionGrid condition={config.features.sections.projects}>
            <div id="projects">
              <DynamicProjectSection
                projects={resumeData.projects}
                sectionTitle={t.sections.projects}
              />
            </div>
          </SectionGrid>

          {/* Skills Section */}
          <SectionGrid condition={config.features.sections.skills}>
            <div id="skills">
              <DynamicSkillSection
                experiences={resumeData.experiences}
                projects={resumeData.projects}
                sectionTitle={t.sections.skills}
              />
            </div>
          </SectionGrid>

          {/* Education Section */}
          <SectionGrid condition={config.features.sections.education}>
            <div id="education">
              <DynamicEducationSection
                education={resumeData.education}
                sectionTitle={t.sections.education}
              />
            </div>
          </SectionGrid>

          {/* Blog Section */}
          <SectionGrid condition={config.features.sections.blog}>
            <div id="blog">
              <DynamicBlogSection
                blogPosts={blogPosts}
                sectionTitle={t.sections.blog}
                noPostsText={t.blog.noPosts}
              />
            </div>
          </SectionGrid>

          {/* Recommendation Section */}
          <SectionGrid condition={config.features.sections.recommendations}>
            <div id="recommendations">
              <DynamicRecommendationSection
                recommendations={resumeData.recommendations.map(r => ({
                  date: (r as any).date || '',
                  recommender: r.recommender,
                  position: r.position,
                  company: r.company,
                  avatar: r.avatar,
                  tr: r.tr,
                  en: r.en
                }))}
                sectionTitle={t.sections.recommendations}
              />
            </div>
          </SectionGrid>

          {/* Contact Section */}
          <SectionGrid condition={shouldShowContactSection()}>
            <div id="contact">
              <DynamicContactSection />
            </div>
          </SectionGrid>
        </Grid>
      </Box>
    </AppProvider>
  );
}

export default memo(PageContent);
