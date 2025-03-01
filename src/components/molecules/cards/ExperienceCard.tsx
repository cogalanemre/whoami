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
  useTheme,
} from "@mui/material";
import type { Experience } from "@/types";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { LocationOn, CalendarToday, Work, AccessTime } from "@mui/icons-material";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelectedSkill } from "@/context/SelectedSkillContext";
import { forwardRef } from "react";
import { EXPERIENCE_CARD_STYLES } from "@/theme/styles";

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
    const { locale } = useTranslation();
    const theme = useTheme();
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
          ...EXPERIENCE_CARD_STYLES.card,
          ...(isHighlighted && EXPERIENCE_CARD_STYLES.cardHighlighted),
        }}
      >
        <CardHeader
          avatar={
            experience.logo && (
              <Avatar
                src={experience.logo}
                alt={`${experience.company} logo`}
                sx={EXPERIENCE_CARD_STYLES.avatar}
              />
            )
          }
          title={
            <Typography variant="h6" sx={EXPERIENCE_CARD_STYLES.position}>
              {experienceTranslations.position}
            </Typography>
          }
          subheader={
            <Box sx={EXPERIENCE_CARD_STYLES.metaContainer}>
              <Typography
                variant="subtitle1"
                color="primary.main"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {experience.company}
              </Typography>
              <InfoWithIcon
                icon={LocationOn}
                text={experienceTranslations.location}
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
                text={getEmploymentTypeText(experience.employmentType, locale)}
                fontSize="0.875rem"
              />
            </Box>
          }
        />

        <CardContent>
          <Box sx={EXPERIENCE_CARD_STYLES.descriptionContainer}>
            <Typography variant="body1" sx={EXPERIENCE_CARD_STYLES.description}>
              {experienceTranslations.description}
            </Typography>
          </Box>
        </CardContent>

        <CardActions>
          <Box sx={EXPERIENCE_CARD_STYLES.skillSection}>
            <Stack sx={EXPERIENCE_CARD_STYLES.skillContainer}>
              {experience.skillTags.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  variant="outlined"
                  size="small"
                  onClick={() => setSelectedSkill(skill === selectedSkill ? null : skill)}
                  sx={EXPERIENCE_CARD_STYLES.skillChip(skill === selectedSkill)}
                />
              ))}
            </Stack>
          </Box>
        </CardActions>
      </Card>
    );
  }
);

// Gereksiz render'ları önlemek için memo kullan
export default ExperienceCard; 