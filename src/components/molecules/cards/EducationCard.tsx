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

import { Card, Typography, Box, Avatar } from "@mui/material";
import { LocationOn, CalendarToday, AccessTime, School } from "@mui/icons-material";
import { memo } from "react";
import { Education } from "@/types";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import { getTranslation } from "@/i18n/utils";

/**
 * Stil sabitleri
 */
const STYLES = {
  CARD: {
    background: "background.paper",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      "& .MuiAvatar-root": {
        transform: "scale(1.05)",
        transition: "transform 0.3s ease-in-out",
      },
    },
  },
  HEADER: {
    p: 3,
  },
  CONTENT: {
    display: "flex",
    gap: 4,
    alignItems: "flex-start",
  },
  AVATAR: {
    width: 80,
    height: 80,
    bgcolor: "background.paper",
    border: "2px solid",
    borderColor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
  INFO_CONTAINER: {
    flex: 1,
    width: "100%",
  },
  SCHOOL_NAME: {
    color: "primary.main",
    mb: 1,
    fontWeight: "bold",
    textAlign: { xs: "center", md: "left" },
  },
  DEPARTMENT: {
    color: "text.secondary",
    mb: 2,
    textAlign: { xs: "center", md: "left" },
  },
  META_CONTAINER: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 3 },
    alignItems: { xs: "flex-start", md: "center" },
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
      sx={STYLES.CARD}
      component="article"
      role="article"
      aria-label={`${educationTranslations.school} - ${t.aria.card}`}
    >
      <Box sx={STYLES.HEADER}>
        <Box sx={STYLES.CONTENT}>
          <Avatar
            src={education.logo}
            alt={`${educationTranslations.school} ${t.aria.logo}`}
            sx={STYLES.AVATAR}
          >
            {!education.logo && <School sx={{ fontSize: 40, color: "primary.main" }} />}
          </Avatar>
          <Box sx={{
            ...STYLES.INFO_CONTAINER,
            ml: 0,
          }}>
            <Typography
              variant="h6"
              component="h3"
              sx={STYLES.SCHOOL_NAME}
            >
              {educationTranslations.school}
            </Typography>
            {educationTranslations.department && (
              <Typography
                variant="subtitle1"
                component="h4"
                sx={STYLES.DEPARTMENT}
              >
                {educationTranslations.department}
              </Typography>
            )}
            <Box sx={STYLES.META_CONTAINER}>
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
        </Box>
      </Box>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(EducationCard); 