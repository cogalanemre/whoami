/**
 * Tavsiye Kartı Bileşeni
 *
 * Kullanıcının aldığı tavsiyeleri gösteren kart bileşeni.
 * Özellikler:
 * - Tavsiye veren kişinin bilgileri
 * - Tavsiye içeriği
 * - Responsive tasarım
 * - Hover ve seçim animasyonları
 * - Çok dilli destek
 *
 * @component
 * @example
 * ```tsx
 * <RecommendationCard
 *   recommendation={{
 *     recommender: "Kişi Adı",
 *     position: "Pozisyon",
 *     company: "Şirket",
 *     content: "Tavsiye içeriği",
 *     date: "2024-01"
 *   }}
 * />
 * ```
 */

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  SxProps,
  Theme,
} from '@mui/material';
import { memo, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Recommendation } from '@/types/recommendation';
import { forwardRef } from 'react';
import { RECOMMENDATION_CARD_STYLES } from '@/styles/cards/RecommendationCard.styles';
import resumeData from '@/config/resume.json';
import { FaLinkedinIn } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

/**
 * Tavsiye Kartı Props Interface
 *
 * @interface RecommendationCardProps
 * @property {Recommendation} recommendation - Tavsiye bilgileri
 */
interface RecommendationCardProps {
  recommendation: Recommendation;
  sx?: SxProps<Theme>;
  locale?: 'tr' | 'en';
}

/**
 * Tavsiye Kartı Bileşeni
 *
 * @param {RecommendationCardProps} props - Bileşen props'ları
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref
 * @returns {JSX.Element} Tavsiye kartı
 */
const RecommendationCard = forwardRef<HTMLDivElement, RecommendationCardProps>(function RecommendationCard(
  { recommendation, locale },
  ref
) {
  const { locale: defaultLocale } = useTranslation();
  const actualLocale = locale || defaultLocale;
  const theme = useTheme();

  // Tavsiye çevirilerini memoize et
  const recommendationTranslations = useMemo(() => 
    actualLocale === 'tr' ? recommendation.tr : recommendation.en,
    [recommendation.tr, recommendation.en, actualLocale]
  );

  // LinkedIn tavsiyeler sayfası URL'sini oluştur
  const linkedinUrl = useMemo(() => {
    const baseUrl = resumeData.hero.socialMedia.linkedin;
    return `${baseUrl}/details/recommendations/`;
  }, []);

  return (
    <Card
      ref={ref}
      sx={{
        ...RECOMMENDATION_CARD_STYLES.CARD,
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 2,
          '& .linkedin-icon': {
            transform: 'scale(1.1)',
          },
        },
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      }}
      onClick={() => window.open(linkedinUrl, '_blank', 'noopener,noreferrer')}
    >
      <CardContent sx={RECOMMENDATION_CARD_STYLES.CARD_CONTENT}>
        {/* Tavsiye İçeriği */}
        <Box sx={RECOMMENDATION_CARD_STYLES.CONTENT}>
          {recommendationTranslations.content}
        </Box>

        {/* Tavsiye Veren Kişi Bilgileri */}
        <Box sx={RECOMMENDATION_CARD_STYLES.META}>
          {/* Avatar */}
          {recommendation.avatar && (
            <Box sx={RECOMMENDATION_CARD_STYLES.AVATAR_CONTAINER}>
              <Avatar
                src={recommendation.avatar}
                alt={`${recommendation.recommender} avatar`}
                sx={{ ...RECOMMENDATION_CARD_STYLES.AVATAR }}
              />
            </Box>
          )}

          {/* İsim ve Şirket Bilgisi */}
          <Box sx={RECOMMENDATION_CARD_STYLES.INFO}>
            <Typography variant="h3" sx={{ ...RECOMMENDATION_CARD_STYLES.TITLE }}>
              {recommendation.recommender}
            </Typography>
            <Typography variant="h4" sx={{ ...RECOMMENDATION_CARD_STYLES.SUBTITLE }}>
              {recommendation.position} • {recommendation.company}
            </Typography>
          </Box>
        </Box>

        {/* LinkedIn İkonu */}
        <Box
          className="linkedin-icon"
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            opacity: 0.25,
            transition: 'transform 0.2s ease-in-out',
            '& svg': {
              width: 72,
              height: 72,
              color: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
              filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))',
            },
          }}
        >
          <FaLinkedinIn />
        </Box>
      </CardContent>
    </Card>
  );
});

// Gereksiz render'ları önlemek için memo kullan
export default memo(RecommendationCard); 