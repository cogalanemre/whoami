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

import {
  Card,
  CardHeader,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { LocationOn, CalendarToday, AccessTime, School } from "@mui/icons-material";
import { memo } from "react";
import { Education } from "@/types";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import { getTranslation } from "@/i18n/utils";
import { EDUCATION_CARD_STYLES } from "@/theme/MUIThemeProvider";

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
      card: getTranslation("education.aria.card", locale),
      logo: getTranslation("education.aria.logo", locale),
      duration: getTranslation("education.aria.duration", locale),
      dates: getTranslation("education.aria.dates", locale),
    },
  };

  // Eğitim bilgilerini dile göre al
  const educationTranslations = locale === "tr" ? education.tr : education.en;
  const duration = calculateDuration(education.startDate, education.endDate, locale);
  const dateRange = `${formatDate(education.startDate, locale)} - ${formatDate(education.endDate, locale)}`;

  return (
    <Card
      sx={EDUCATION_CARD_STYLES.card}
      component="article"
      role="article"
      aria-label={`${educationTranslations.school} - ${t.aria.card}`}
    >
      <CardHeader
        avatar={
          <Avatar
            src={education.logo}
            alt={`${educationTranslations.school} ${t.aria.logo}`}
            sx={EDUCATION_CARD_STYLES.avatar}
          >
            {!education.logo && <School sx={{ fontSize: 40, color: "primary.main" }} />}
          </Avatar>
        }
        title={
          <Typography variant="h6" component="h3" sx={EDUCATION_CARD_STYLES.schoolName}>
            {educationTranslations.school}
          </Typography>
        }
        subheader={
          <Box>
            {educationTranslations.department && (
              <Typography
                variant="subtitle1"
                component="h4"
                sx={EDUCATION_CARD_STYLES.department}
              >
                {educationTranslations.department}
              </Typography>
            )}
            <Box sx={EDUCATION_CARD_STYLES.metaContainer}>
              <InfoWithIcon
                icon={LocationOn}
                text={educationTranslations.location}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={CalendarToday}
                text={dateRange}
                fontSize="0.875rem"
                aria-label={t.aria.dates}
              />
              <InfoWithIcon
                icon={AccessTime}
                text={duration}
                fontSize="0.875rem"
                aria-label={t.aria.duration}
              />
            </Box>
          </Box>
        }
      />
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(EducationCard); 