/**
 * Deneyim Kartı Bileşeni
 * 
 * Kullanıcının iş deneyimlerini gösteren kart bileşeni.
 * Özellikler:
 * - Şirket logosu ve bilgileri
 * - Çalışma modeli (Uzaktan/Hibrit/Ofis)
 * - İstihdam türü (Tam/Yarı Zamanlı vb.)
 * - Yetenek etiketleri
 * - Seçilebilir/filtrelenebilir yetenekler
 * - Responsive tasarım
 * - Hover ve seçim animasyonları
 * - Çok dilli destek
 * 
 * @component
 * @example
 * ```tsx
 * <ExperienceCard
 *   experience={{
 *     company: "Şirket Adı",
 *     logo: "/logo.png",
 *     startDate: "2020-01",
 *     endDate: "2023-01",
 *     workingModel: WorkingModel.Remote,
 *     employmentType: EmploymentType.FullTime,
 *     skillTags: ["React", "TypeScript"],
 *     tr: { position: "Yazılım Geliştirici", location: "İstanbul" },
 *     en: { position: "Software Developer", location: "Istanbul" }
 *   }}
 * />
 * ```
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Stack,
  Chip,
  Avatar,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
import type { Experience } from "@/types";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { LocationOn, CalendarToday, Work, AccessTime } from "@mui/icons-material";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { forwardRef } from "react";

const STYLE = {
  CARD: {
    bgcolor: 'background.paper',
    borderRadius: '16px',
    position: "relative",
    height: "100%",
    transition: "all 0.3s ease-in-out",
    border: '0.5px solid',
    borderColor: 'border.default',
    '&:hover': {
      transform: "translateY(-4px)",
      boxShadow: (theme: Theme) => `0 4px 20px ${theme.palette.shadow?.default}`,
      borderColor: 'border.hover',
    },
  },
} as const;

// Avatar stilleri
const avatarStyles: SxProps<Theme> = {
  width: 80,
  height: 80,
  bgcolor: "transparent",
  border: "2px solid",
  borderColor: 'border.default',
  display: { xs: "none", md: "block" },
  "& img": {
    objectFit: "cover",
    borderRadius: "50%",
  },
};

// Meta bilgiler konteynır stilleri
const metaContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  mt: 1,
};

// Açıklama konteynır stilleri
const descriptionContainerStyles: SxProps<Theme> = {
  mt: 2,
};

// Açıklama metni stilleri
const descriptionStyles: SxProps<Theme> = {
  fontSize: "0.95rem",
  letterSpacing: "0.3px",
  color: "text.primary",
};

// Yetenekler bölümü stilleri
const skillSectionStyles: SxProps<Theme> = {
  width: "100%",
  p: 2,
  pt: 0,
};

// Yetenekler konteynır stilleri
const skillContainerStyles: SxProps<Theme> = {
  direction: "row",
  spacing: 1,
  flexWrap: "wrap",
  gap: 1,
};

/**
 * Çalışma Modeli Enum
 */
enum WorkingModel {
  Hybrid = 1,
  Remote = 2,
  Office = 3,
}

/**
 * İstihdam Türü Enum
 */
enum EmploymentType {
  FullTime = 1,
  PartTime = 2,
  Contract = 3,
  Freelance = 4,
}

/**
 * Deneyim Kartı Props Interface
 * 
 * @interface ExperienceCardProps
 * @property {Experience} experience - Deneyim bilgileri
 */
interface ExperienceCardProps {
  experience: Experience;
  sx?: SxProps<Theme>;
  locale?: "tr" | "en";
}

/**
 * Deneyim Kartı Bileşeni
 * 
 * @param {ExperienceCardProps} props - Bileşen props'ları
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref
 * @returns {JSX.Element} Deneyim kartı
 */
const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  function ExperienceCard({ experience, sx, locale }, ref) {
    const { t, locale: defaultLocale } = useTranslation();
    const actualLocale = locale || defaultLocale;

    // Çalışma modeli ve istihdam türü çevirilerini burada alıyoruz
    const workingModelText = (() => {
      switch (experience.workingModel) {
        case WorkingModel.Hybrid:
          return t("experience.workingModel.hybrid");
        case WorkingModel.Remote:
          return t("experience.workingModel.remote");
        case WorkingModel.Office:
          return t("experience.workingModel.office");
        default:
          return "";
      }
    })();

    const employmentTypeText = (() => {
      switch (experience.employmentType) {
        case EmploymentType.FullTime:
          return t("experience.employmentType.fullTime");
        case EmploymentType.PartTime:
          return t("experience.employmentType.partTime");
        case EmploymentType.Contract:
          return t("experience.employmentType.contract");
        case EmploymentType.Freelance:
          return t("experience.employmentType.freelance");
        default:
          return "";
      }
    })();

    const experienceTranslations = actualLocale === "tr" ? experience.tr : experience.en;
    const duration = calculateDuration(
      experience.startDate,
      experience.endDate ? experience.endDate : new Date().toISOString(),
      actualLocale
    );

    return (
      <Card
        ref={ref}
        id={`experience-${experience.company.toLowerCase().replace(/\s+/g, "-")}`}
        sx={{
          ...STYLE.CARD,
          ...sx,
        }}
      >
        <CardHeader
          avatar={
            experience.logo && (
              <Avatar
                src={experience.logo}
                alt={`${experience.company} logo`}
                sx={avatarStyles}
              />
            )
          }
          title={
            <Typography variant="h3">
              {experienceTranslations.position}
            </Typography>
          }
          subheader={
            <Box sx={metaContainerStyles}>
              <Typography
                variant="h4"
                sx={{ color: 'primary.main' }}
              >
                {experience.company}
              </Typography>
              <InfoWithIcon
                icon={LocationOn}
                text={experienceTranslations.location}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={Work}
                text={workingModelText}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={CalendarToday}
                text={`${formatDate(experience.startDate)} - ${
                  experience.endDate ? formatDate(experience.endDate) : "Present"
                }`}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={AccessTime}
                text={duration}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={Work}
                text={employmentTypeText}
                fontSize="0.875rem"
              />
            </Box>
          }
        />

        <CardContent>
          <Box sx={descriptionContainerStyles}>
            {experienceTranslations.description.map((desc, index) => (
              <Typography 
                key={index} 
                variant="body1" 
                sx={{
                  ...descriptionStyles,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  '&:not(:last-child)': {
                    mb: 1
                  },
                  '& > span': {
                    color: 'primary.main'
                  }
                }}
              >
                <span>•</span>
                {desc}
              </Typography>
            ))}
          </Box>
        </CardContent>

        <CardActions sx={skillSectionStyles}>
          <Stack sx={skillContainerStyles}>
            {experience.skillTags.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
              />
            ))}
          </Stack>
        </CardActions>
      </Card>
    );
  }
);

// Gereksiz render'ları önlemek için memo kullan
export default ExperienceCard; 