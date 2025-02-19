import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Poppins } from "next/font/google";
import ClientLayout from "../client-layout";
import { metadata } from "../metadata";

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

export { metadata };

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
    <html
      lang={resolvedParams.lang}
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} h-full`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="h-full">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
