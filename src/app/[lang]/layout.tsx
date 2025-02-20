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
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emre ÇOĞALAN",
  description: "Kıdemli Yazılım Mühendisi",
  applicationName: "Emre ÇOĞALAN - Portfolio",
  authors: [{ name: "Emre ÇOĞALAN" }],
  generator: "Next.js",
  keywords: ["Emre ÇOĞALAN", "Portfolio", "Software Engineer", "Developer"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = await Promise.resolve(params.lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="google-site-verification" content="your-verification-code" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} h-full`}>
        <ClientLayout>{children}</ClientLayout>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
