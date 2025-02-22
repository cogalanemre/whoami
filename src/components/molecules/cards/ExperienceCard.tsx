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
  Typography,
  Stack,
  Chip,
  Avatar,
  Box,
} from "@mui/material";
import type { Experience } from "@/types";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { LocationOn, CalendarToday, Work, AccessTime, WorkOutline, Business, Apartment } from "@mui/icons-material";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelectedSkill } from "@/context/SelectedSkillContext";
import { forwardRef } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

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
 * Çalışma modelini metne çevirir
 */
const getWorkingModelText = (workingModel: number, locale: string): string => {
  switch (workingModel) {
    case WorkingModel.Hybrid:
      return locale === "tr" ? "Hibrit" : "Hybrid";
    case WorkingModel.Remote:
      return locale === "tr" ? "Uzaktan" : "Remote";
    case WorkingModel.Office:
      return locale === "tr" ? "Ofisten" : "Office";
    default:
      return "";
  }
};

/**
 * İstihdam türünü metne çevirir
 */
const getEmploymentTypeText = (employmentType: number, locale: string): string => {
  switch (employmentType) {
    case EmploymentType.FullTime:
      return locale === "tr" ? "Tam Zamanlı" : "Full Time";
    case EmploymentType.PartTime:
      return locale === "tr" ? "Yarı Zamanlı" : "Part Time";
    case EmploymentType.Contract:
      return locale === "tr" ? "Sözleşmeli" : "Contract";
    case EmploymentType.Freelance:
      return locale === "tr" ? "Serbest" : "Freelance";
    default:
      return "";
  }
};

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
      },
    },
  },
  CARD_HIGHLIGHTED: {
    border: "1px solid",
    borderColor: "primary.main",
    transform: "translateY(-4px)",
    boxShadow: (colors) => `0 4px 20px ${colors.primary}40`,
  },
  HEADER: {
    background: (isDarkMode) =>
      isDarkMode
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(0, 0, 0, 0.03)",
    backdropFilter: "blur(4px)",
    p: 3,
  },
  HEADER_CONTENT: {
    display: "flex",
    gap: 4,
    alignItems: "flex-start",
  },
  AVATAR: {
    width: 80,
    height: 80,
    bgcolor: "transparent",
    border: "2px solid",
    borderColor: "primary.main",
    display: { xs: "none", md: "block" },
    "& img": {
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
  CONTENT: {
    flex: 1,
  },
  POSITION: {
    color: "primary.main",
    mb: 1,
    fontWeight: "bold",
    textAlign: { xs: "center", md: "left" },
  },
  COMPANY: {
    color: "text.secondary",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },
  DESCRIPTION: {
    color: "text.secondary",
    mb: 3,
  },
  DESCRIPTION_CONTAINER: {
    width: "100%",
    mb: 3,
  },
  SKILL_SECTION: {
    width: "100%",
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
  },
  SKILL_CONTAINER: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    maxWidth: "fit-content",
  },
  SKILL_CHIP: (isSelected: boolean, colors: any) => ({
    bgcolor: isSelected ? "primary.main" : "background.default",
    borderColor: "primary.main",
    color: isSelected ? "background.paper" : "primary.main",
    cursor: "pointer",
    "&:hover": {
      bgcolor: isSelected ? "primary.main" : "background.paper",
      borderColor: "primary.main",
    },
  }),
} as const;

/**
 * Deneyim Kartı Props Interface
 * 
 * @interface ExperienceCardProps
 * @property {Experience} experience - Deneyim bilgileri
 */
interface ExperienceCardProps {
  experience: Experience;
}

/**
 * Deneyim Kartı Bileşeni
 * 
 * @param {ExperienceCardProps} props - Bileşen props'ları
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref
 * @returns {JSX.Element} Deneyim kartı
 */
const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  function ExperienceCard({ experience }, ref) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const colors = useThemeColors();
    const { locale } = useTranslation();
    const { selectedSkill, setSelectedSkill } = useSelectedSkill();

    const isHighlighted = selectedSkill && experience.skillTags.includes(selectedSkill);
    const experienceTranslations = locale === "tr" ? experience.tr : experience.en;
    const duration = calculateDuration(
      experience.startDate,
      experience.endDate ? experience.endDate : new Date().toISOString(),
      locale
    );

    return (
      <Card
        ref={ref}
        id={`experience-${experience.company.toLowerCase().replace(/\s+/g, "-")}`}
        sx={{
          ...STYLES.CARD,
          ...(isHighlighted && STYLES.CARD_HIGHLIGHTED),
        }}
      >
        {/* Kart Başlığı */}
        <Box sx={STYLES.HEADER}>
          <Box sx={STYLES.HEADER_CONTENT}>
            {/* Şirket Logosu */}
            <Avatar
              src={experience.logo}
              alt={experience.company}
              sx={STYLES.AVATAR}
            />

            {/* Pozisyon ve Şirket Bilgileri */}
            <Box sx={STYLES.CONTENT}>
              <Typography variant="h6" sx={STYLES.POSITION}>
                {experienceTranslations.position}
              </Typography>

              {/* Meta Bilgiler */}
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 3 }}
                alignItems={{ xs: "flex-start", md: "center" }}
              >
                <Typography variant="subtitle1" sx={STYLES.COMPANY}>
                  {experience.company}
                </Typography>

                {/* Konum */}
                <InfoWithIcon
                  icon={LocationOn}
                  text={experienceTranslations.location}
                  fontSize="0.875rem"
                />

                {/* Çalışma Modeli */}
                <InfoWithIcon
                  icon={Apartment}
                  text={getWorkingModelText(experience.workingModel, locale)}
                  fontSize="0.875rem"
                />

                {/* Tarih Aralığı */}
                <InfoWithIcon
                  icon={CalendarToday}
                  text={`${formatDate(experience.startDate, locale)} - ${
                    experience.endDate
                      ? formatDate(experience.endDate, locale)
                      : locale === "tr"
                      ? "Devam ediyor"
                      : "Present"
                  }`}
                  fontSize="0.875rem"
                />

                {/* Süre */}
                <InfoWithIcon
                  icon={AccessTime}
                  text={duration}
                  fontSize="0.875rem"
                />

                {/* İstihdam Türü */}
                <InfoWithIcon
                  icon={Work}
                  text={getEmploymentTypeText(experience.employmentType, locale)}
                  fontSize="0.875rem"
                />
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Kart İçeriği */}
        <CardContent sx={{ p: 3 }}>
          {/* Deneyim Açıklaması */}
          <Box sx={STYLES.DESCRIPTION_CONTAINER}>
            <Typography variant="body1" sx={STYLES.DESCRIPTION}>
              {experienceTranslations.description.map((desc, index) => (
                <span key={index}>
                  <span style={{ color: colors.primary }}>•</span> {desc}
                  <br />
                </span>
              ))}
            </Typography>
          </Box>

          {/* Yetenek Etiketleri */}
          <Box sx={STYLES.SKILL_SECTION}>
            <Stack 
              direction="row"
              sx={STYLES.SKILL_CONTAINER}
            >
              {experience.skillTags.map((skillTag: string, index: number) => (
                <Chip
                  key={index}
                  size="small"
                  label={skillTag}
                  variant="outlined"
                  onClick={() =>
                    setSelectedSkill(selectedSkill === skillTag ? null : skillTag)
                  }
                  sx={STYLES.SKILL_CHIP(selectedSkill === skillTag, colors)}
                />
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

// Gereksiz render'ları önlemek için memo kullan
export default ExperienceCard; 