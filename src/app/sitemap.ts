import { MetadataRoute } from 'next';
import config from '@/config/config.json';

/**
 * Sitemap oluşturucu
 *
 * SEO için sitemap.xml dosyası oluşturur.
 * Sadece dil bazlı sayfaları içerir çünkü ana sayfa middleware ile yönlendiriliyor.
 * Priority değerleri varsayılan dile göre belirlenir.
 * Domain bilgisi config.json'dan alınır.
 *
 * @returns {MetadataRoute.Sitemap} Sitemap konfigürasyonu
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NODE_ENV === 'production' ? config.domain.production : config.domain.development;
  const defaultLang = config.language.default;

  return [
    {
      url: `${baseUrl}/tr`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: defaultLang === 'tr' ? 1 : 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: defaultLang === 'en' ? 1 : 0.9,
    },
  ];
}
