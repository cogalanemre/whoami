import type { Metadata } from "next";

const title = "Emre ÇOĞALAN - Bilgisayar Mühendisi";
const description = "Kıdemli Yazılım Mühendisi | Full Stack Geliştirici | Yapay Zeka Araştırmacısı";
const url = "https://cogalanemre.com";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: `${url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: url,
    languages: {
      "tr-TR": `${url}/tr`,
      "en-US": `${url}/en`,
    },
  },
}; 