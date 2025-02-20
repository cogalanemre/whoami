import { calculateTotalExperience } from "@/utils/dateUtils";
import { fetchBlogPosts } from "@/utils/fetchBlogPosts";
import type { Hero } from "@/types";
import config from "@/config/config.json";
import resumeData from "@/config/resume.json";
import PageContent from "./PageContent";
import { Metadata } from "next";

// Build esnasında hangi dil sayfalarının oluşturulacağını belirt
export async function generateStaticParams() {
  return config.language.supported.map((lang) => ({
    lang: lang as "tr" | "en",
  }));
}

// Metadata tanımla
export const metadata: Metadata = {
  title: "Emre ÇOĞALAN",
  description: "Kıdemli Yazılım Mühendisi",
};

// Server component olarak ana sayfa
export default async function Page({
  params,
}: {
  params: Promise<{ lang: "tr" | "en" }>;
}) {
  const { lang } = await params;
  const blogPosts = await fetchBlogPosts();
  const totalExperience = calculateTotalExperience(resumeData.experiences, lang);
  const hero: Hero = resumeData.hero;

  return (
    <PageContent
      lang={lang}
      blogPosts={blogPosts}
      totalExperience={totalExperience}
      hero={hero}
    />
  );
}
