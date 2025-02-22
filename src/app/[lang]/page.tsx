/**
 * Next.js Ana Sayfa Bileşeni
 * 
 * Bu dosya, portfolyo web sitesinin ana sayfa içeriğini ve meta verilerini yönetir.
 * Çoklu dil desteği, SEO optimizasyonları ve dinamik içerik yönetimi burada yapılır.
 * 
 * @module Page
 */

import { calculateTotalExperience } from "@/utils/dateUtils";
import { fetchBlogPosts } from "@/utils/fetchBlogPosts";
import type { Hero } from "@/types";
import config from "@/config/config.json";
import resumeData from "@/config/resume.json";
import PageContent from "./PageContent";
import { Metadata } from "next";

/**
 * Build zamanında oluşturulan statik veriler
 * Her dil için ayrı başlık, açıklama ve toplam deneyim bilgilerini içerir
 * 
 * @type {Record<'tr' | 'en', {
 *   totalExperience: string,
 *   title: string,
 *   description: string
 * }>}
 */
const staticData = {
  tr: {
    totalExperience: calculateTotalExperience(resumeData.experiences, "tr"),
    title: `${resumeData.hero.name} - ${resumeData.hero.titles.tr[0]}`,
    description: `${resumeData.hero.titles.tr.join(" | ")} | ${calculateTotalExperience(resumeData.experiences, "tr")} deneyim`,
  },
  en: {
    totalExperience: calculateTotalExperience(resumeData.experiences, "en"),
    title: `${resumeData.hero.name} - ${resumeData.hero.titles.en[0]}`,
    description: `${resumeData.hero.titles.en.join(" | ")} | ${calculateTotalExperience(resumeData.experiences, "en")} experience`,
  },
} as const;

/**
 * Next.js tarafından build zamanında çağrılır
 * Desteklenen tüm diller için statik sayfalar oluşturur
 * 
 * @returns {Promise<Array<{lang: "tr" | "en"}>>} Desteklenen diller için route parametreleri
 * @see {@link config.language.supported} Desteklenen diller listesi
 */
export async function generateStaticParams() {
  return config.language.supported.map((lang) => ({
    lang: lang as "tr" | "en",
  }));
}

/**
 * Sayfa meta verilerini dinamik olarak oluşturur
 * SEO optimizasyonları, Open Graph ve Twitter Cards için gerekli meta verileri sağlar
 * 
 * @param {Object} props - Fonksiyon parametreleri
 * @param {Object} props.params - Route parametreleri
 * @param {("tr"|"en")} props.params.lang - Aktif dil kodu
 * @returns {Promise<Metadata>} Next.js metadata objesi
 */
export async function generateMetadata({ 
  params 
}: { 
  params: { lang: "tr" | "en" } 
}): Promise<Metadata> {
  // Tüm params objesini bekle
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  
  // Ortama göre base URL belirle
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? config.security.cors.origins.production[0]
    : config.security.cors.origins.development[0];
  
  // Tüm dillerdeki title'ları keywords olarak kullan ve duplicate'leri kaldır
  const keywords = Array.from(new Set([
    ...resumeData.hero.titles.tr,
    ...resumeData.hero.titles.en,
    resumeData.hero.name
  ]));
  
  return {
    title: staticData[lang].title,
    description: staticData[lang].description,
    keywords,
    authors: [{ name: resumeData.hero.name }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: staticData[lang].title,
      description: staticData[lang].description,
      images: [
        {
          url: resumeData.hero.avatar,
          width: 300,
          height: 300,
          alt: resumeData.hero.name,
        },
      ],
      locale: lang,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: staticData[lang].title,
      description: staticData[lang].description,
      images: [resumeData.hero.avatar],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        tr: "/tr",
        en: "/en",
      },
    },
  };
}

/**
 * Ana Sayfa Server Component'i
 * 
 * Blog yazılarını çeker, dil bazlı içeriği hazırlar ve
 * PageContent bileşenine gerekli props'ları ileterek render eder.
 * 
 * @param {Object} props - Bileşen props'ları
 * @param {Object} props.params - Route parametreleri
 * @param {("tr"|"en")} props.params.lang - Aktif dil kodu
 * @returns {Promise<JSX.Element>} Render edilecek sayfa içeriği
 * @see {@link PageContent} Asıl içeriği render eden client component
 */
export default async function Page({
  params,
}: {
  params: { lang: "tr" | "en" };
}) {
  // Tüm params objesini bekle
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  
  const blogPosts = await fetchBlogPosts();
  const hero: Hero = resumeData.hero;

  return (
    <PageContent
      lang={lang}
      blogPosts={blogPosts}
      totalExperience={staticData[lang].totalExperience}
      hero={hero}
    />
  );
}
