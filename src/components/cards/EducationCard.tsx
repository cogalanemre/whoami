/**
 * Eğitim Kartı Bileşeni
 *
 * Kullanıcının eğitim geçmişini gösteren kart bileşeni.
 * Özellikler:
 * - Okul logosu ve bilgileri
 * - Çok dilli destek (TR/EN)
 * - Responsive tasarım
 * - Hover animasyonları
 * - Tema renk entegrasyonu
 * - Erişilebilirlik özellikleri
 *
 * @component
 * @example
 * ```tsx
 * <EducationCard
 *   education={{
 *     logo: "/school-logo.png",
 *     startDate: "2020-09-01",
 *     endDate: "2024-06-01",
 *     tr: {
 *       school: "Üniversite Adı",
 *       department: "Bölüm Adı",
 *       location: "Şehir, Ülke"
 *     },
 *     en: {
 *       school: "University Name",
 *       department: "Department Name",
 *       location: "City, Country"
 *     }
 *   }}
 * />
 * ```
 */

import { Card, CardHeader, Typography, Box, Avatar } from '@mui/material';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaGraduationCap } from 'react-icons/fa';
import { memo } from 'react';
import { Education } from '@/types';
import { formatDate, calculateDuration } from '@/utils/dateUtils';
import { useTranslation } from '@/hooks/useTranslation';
import InfoWithIcon from '@/components/common/InfoWithIcon';
import { getTranslation } from '@/i18n/utils';
import { THEME_STYLE } from '@/theme/theme';

const STYLE = {
  CARD: {
    ...THEME_STYLE.CARD,
  },
  AVATAR: {
    ...THEME_STYLE.AVATAR,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
  SUBTITLE: {
    ...THEME_STYLE.SUBTITLE,
  },
  META: {
    ...THEME_STYLE.META,
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
    border: 'none',
  },
} as const;

/**
 * Eğitim Kartı Props Interface
 *
 * @interface EducationCardProps
 * @property {Education} education - Eğitim bilgileri
 */
interface EducationCardProps {
  education: Education;
}

/**
 * Eğitim Kartı Bileşeni
 *
 * @param {EducationCardProps} props - Bileşen props'ları
 * @returns {JSX.Element} Eğitim kartı
 */
function EducationCard({ education }: EducationCardProps) {
  const { locale } = useTranslation();

  // Çevirileri al
  const t = {
    aria: {
      card: getTranslation('education.aria.card', locale),
      logo: getTranslation('education.aria.logo', locale),
      duration: getTranslation('education.aria.duration', locale),
      dates: getTranslation('education.aria.dates', locale),
    },
  };

  // Eğitim bilgilerini dile göre al
  const educationTranslations = locale === 'tr' ? education.tr : education.en;
  const duration = calculateDuration(education.startDate, education.endDate, locale);
  const dateRange = `${formatDate(education.startDate, locale)} - ${formatDate(education.endDate, locale)}`;

  return (
    <Card
      sx={STYLE.CARD}
      component="article"
      role="article"
      aria-label={`${educationTranslations.school} - ${t.aria.card}`}
    >
      <CardHeader
        sx={STYLE.CARD_HEADER}
        avatar={
          <Avatar
            src={education.logo}
            alt={`${educationTranslations.school} ${t.aria.logo}`}
            sx={STYLE.AVATAR}
          >
            {!education.logo && <FaGraduationCap size={40} color="primary" />}
          </Avatar>
        }
        title={
          <Typography variant="h3" sx={STYLE.TITLE}>
            {educationTranslations.department}
          </Typography>
        }
        subheader={
          <Box sx={STYLE.META}>
            <Typography variant="h4" sx={STYLE.SUBTITLE}>
              {educationTranslations.school}
            </Typography>
            <InfoWithIcon
              icon={FaMapMarkerAlt}
              text={educationTranslations.location}
              fontSize="0.875rem"
            />
            <InfoWithIcon
              icon={FaCalendarAlt}
              text={dateRange}
              fontSize="0.875rem"
              aria-label={t.aria.dates}
            />
            <InfoWithIcon
              icon={FaClock}
              text={duration}
              fontSize="0.875rem"
              aria-label={t.aria.duration}
            />
          </Box>
        }
      />
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(EducationCard);
