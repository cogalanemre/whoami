/**
 * Tavsiye Bölümü Bileşeni
 *
 * Kullanıcının aldığı tavsiyeleri gösteren bölüm.
 * Her tavsiye için ayrı bir kart oluşturur.
 *
 * Özellikler:
 * - Responsive tasarım (xs, sm, md, lg breakpoint'leri için özel spacing)
 * - Material-UI tema entegrasyonu
 *
 * @component
 * @example
 * ```tsx
 * <RecommendationSection
 *   recommendations={[{
 *     recommender: "Kişi Adı",
 *     position: "Pozisyon",
 *     company: "Şirket",
 *     content: "Tavsiye içeriği",
 *     date: "2024-01"
 *   }]}
 *   sectionTitle="Tavsiyeler"
 * />
 * ```
 */

import { Box, Stack } from '@mui/material';
import { FaQuoteLeft } from 'react-icons/fa';
import { Recommendation } from '@/types/recommendation';
import RecommendationCard from '@/components/cards/RecommendationCard';
import SectionTitle from '@/components/common/SectionTitle';
import { memo } from 'react';
import { recommendationSectionStyles as STYLES } from '@/styles/sections/RecommendationSection.styles';

/**
 * Tavsiye Bölümü Props Interface
 *
 * @interface RecommendationSectionProps
 * @property {Recommendation[]} recommendations - Tavsiye bilgileri listesi
 * @property {string} sectionTitle - Bölüm başlığı
 */
interface RecommendationSectionProps {
  recommendations: Recommendation[];
  sectionTitle: string;
}

/**
 * Tavsiye Bölümü Bileşeni
 *
 * @param {RecommendationSectionProps} props - Bileşen props'ları
 * @returns {JSX.Element} Tavsiye bölümü
 */
function RecommendationSection({ recommendations, sectionTitle }: RecommendationSectionProps) {
  return (
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle icon={FaQuoteLeft} title={sectionTitle} />

      {/* Tavsiye Kartları Konteyneri */}
      <Box>
        <Stack sx={STYLES.STACK}>
          {/* Tavsiye Kartları */}
          {recommendations.map(recommendation => (
            <Box key={`${recommendation.recommender}-${recommendation.date}`} sx={STYLES.BOX}>
              <RecommendationCard recommendation={recommendation} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(RecommendationSection); 