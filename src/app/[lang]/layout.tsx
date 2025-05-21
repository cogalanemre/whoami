/**
 * Next.js App Router Layout Dosyası
 *
 * Bu dosya, tüm sayfalar için ortak layout'u tanımlar.
 * Font yüklemeleri, viewport ayarları ve dil desteği burada yapılandırılır.
 *
 * @module Layout
 */

import { Nunito } from 'next/font/google';
import ClientLayout from '../client-layout';
import type { Viewport, Metadata } from 'next';

type SupportedLanguages = 'tr' | 'en';
type LayoutParams = {
  lang: SupportedLanguages;
};

/**
 * Nunito font konfigürasyonu
 * Tüm site için tek font olarak kullanılır
 */
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

/**
 * Metadata tanımlamaları
 * SEO, favicon ve tema rengi ayarlarını içerir
 */
export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
};

/**
 * Viewport meta etiketleri
 * Tema rengi için light/dark mode desteği sağlar
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

/**
 * Root Layout Bileşeni
 * Tüm sayfalar için temel HTML yapısını ve ortak özellikleri sağlar
 *
 * @param {Object} props - Bileşen props'ları
 * @param {React.ReactNode} props.children - Alt bileşenler
 * @param {LayoutParams} props.params - Route parametreleri
 * @returns {Promise<JSX.Element>} Layout bileşeni
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LayoutParams;
}) {
  // params nesnesini await et
  const { lang } = await Promise.resolve(params);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${nunito.className} h-full`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
