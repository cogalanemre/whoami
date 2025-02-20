import { calculateTotalExperience } from "@/utils/dateUtils";
import { fetchBlogPosts } from "@/utils/fetchBlogPosts";
import type { Hero } from "@/types";
import config from "@/config/config.json";
import resumeData from "@/config/resume.json";
import PageContent from "./PageContent";
import { Metadata } from "next";

// Build zamanında hesaplanacak veriler
const staticData = {
  tr: {
    totalExperience: calculateTotalExperience(resumeData.experiences, "tr"),
    title: "Emre ÇOĞALAN - Kıdemli Yazılım Mühendisi",
    description: `${resumeData.hero.titles.tr.join(" | ")} | ${calculateTotalExperience(resumeData.experiences, "tr")} deneyim`,
  },
  en: {
    totalExperience: calculateTotalExperience(resumeData.experiences, "en"),
    title: "Emre ÇOĞALAN - Senior Software Engineer",
    description: `${resumeData.hero.titles.en.join(" | ")} | ${calculateTotalExperience(resumeData.experiences, "en")} experience`,
  },
};

// Build esnasında hangi dil sayfalarının oluşturulacağını belirt
export async function generateStaticParams() {
  return config.language.supported.map((lang) => ({
    lang: lang as "tr" | "en",
  }));
}

// Dinamik metadata
export async function generateMetadata({ params }: { params: { lang: "tr" | "en" } }): Promise<Metadata> {
  const lang = await Promise.resolve(params.lang);
  
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? config.security.cors.origins.production[0]
    : config.security.cors.origins.development[0];
  
  return {
    title: staticData[lang].title,
    description: staticData[lang].description,
    keywords: ["software engineer", "full stack developer", "senior developer", "yazılım mühendisi", "kıdemli geliştirici"],
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

export default async function Page({
  params,
}: {
  params: { lang: "tr" | "en" };
}) {
  const lang = await Promise.resolve(params.lang);
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
