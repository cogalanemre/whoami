import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Poppins } from "next/font/google";
import ClientLayout from "../client-layout";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Emre ÇOĞALAN",
  description: "Kıdemli Yazılım Mühendisi",
};

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.lang} className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} h-full`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
