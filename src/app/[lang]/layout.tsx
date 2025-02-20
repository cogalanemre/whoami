import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Poppins } from "next/font/google";
import ClientLayout from "../client-layout";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F5F5" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" }
  ]
};

export const metadata: Metadata = {
  title: "Emre ÇOĞALAN",
  description: "Kıdemli Yazılım Mühendisi",
  applicationName: "Emre ÇOĞALAN - Portfolio",
  authors: [{ name: "Emre ÇOĞALAN" }],
  keywords: ["software engineer", "full stack developer", "senior developer", "yazılım mühendisi", "kıdemli geliştirici"],
  robots: "index, follow",
  manifest: "/manifest.json"
};

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.lang} className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="google-site-verification" content="your-verification-code" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} h-full`}>
        <ClientLayout>{children}</ClientLayout>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-MEASUREMENT-ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR-MEASUREMENT-ID');
          `}
        </Script>
      </body>
    </html>
  );
}
