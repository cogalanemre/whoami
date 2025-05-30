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
} from '@mui/material';
import { memo, useMemo, useEffect, useState, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Experience } from '@/types/experience';
import InfoWithIcon from '@/components/common/InfoWithIcon';
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaClock, FaHistory } from 'react-icons/fa';
import { WorkingModel, EmploymentType } from '@/types/experience';
import { formatDate, calculateDuration } from '@/utils/dateUtils';
import { forwardRef } from 'react';
import { EXPERIENCE_CARD_STYLES } from '@/styles/cards/ExperienceCard.styles';

/**
 * Deneyim Kartı Props Interface
 *
 * @interface ExperienceCardProps
 * @property {Experience} experience - Deneyim bilgileri
 */
interface ExperienceCardProps {
  experience: Experience;
  sx?: SxProps<Theme>;
  locale?: 'tr' | 'en';
}

/**
 * Deneyim Kartı Bileşeni
 *
 * @param {ExperienceCardProps} props - Bileşen props'ları
 * @returns {JSX.Element} Deneyim kartı
 */
const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(({ experience, locale, sx }, ref) => {
  const { t, locale: defaultLocale } = useTranslation();
  const actualLocale = locale || defaultLocale;

  // Çalışma modeli ve istihdam türü çevirilerini memoize et
  const { workingModelText, employmentTypeText } = useMemo(() => ({
    workingModelText: (() => {
      switch (experience.workingModel) {
        case WorkingModel.Hybrid:
          return t('experience.workingModel.hybrid');
        case WorkingModel.Remote:
          return t('experience.workingModel.remote');
        case WorkingModel.Office:
          return t('experience.workingModel.office');
        default:
          return '';
      }
    })(),
    employmentTypeText: (() => {
      switch (experience.employmentType) {
        case EmploymentType.FullTime:
          return t('experience.employmentType.fullTime');
        case EmploymentType.PartTime:
          return t('experience.employmentType.partTime');
        case EmploymentType.Contract:
          return t('experience.employmentType.contract');
        case EmploymentType.Freelance:
          return t('experience.employmentType.freelance');
        default:
          return '';
      }
    })()
  }), [experience.workingModel, experience.employmentType, t]);

  // Deneyim çevirilerini ve süreyi memoize et
  const { experienceTranslations, duration } = useMemo(() => ({
    experienceTranslations: actualLocale === 'tr' ? experience.tr : experience.en,
    duration: calculateDuration(
      experience.startDate,
      experience.endDate ? experience.endDate : new Date().toISOString(),
      actualLocale
    )
  }), [experience.tr, experience.en, experience.startDate, experience.endDate, actualLocale]);

  // Tarih formatlamasını memoize et
  const dateRange = useMemo(() => 
    `${formatDate(experience.startDate)} - ${
      experience.endDate ? formatDate(experience.endDate) : 'Present'
    }`,
    [experience.startDate, experience.endDate]
  );

  // Seçili kartı belirle
  const [isSelected, setIsSelected] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkHash = () => {
      const isThisSelected = window.location.hash === `#experience-${experience.company.replace(/\s+/g, '')}`;
      setIsSelected(isThisSelected);
      if (isThisSelected && cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Dışarı tıklanınca seçimi kaldır
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        if (window.location.hash === `#experience-${experience.company.replace(/\s+/g, '')}`) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
          setIsSelected(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [experience.company]);

  return (
    <Card
      ref={ref}
      sx={{
        ...EXPERIENCE_CARD_STYLES.CARD,
        ...sx,
        borderColor: isSelected ? (theme => theme.palette.primary.main) : EXPERIENCE_CARD_STYLES.CARD.borderColor,
        borderWidth: isSelected ? 1 : 0.5,
        transform: isSelected ? 'translateY(-4px)' : 'none',
        transition: 'border-color 0.2s, border-width 0.2s, box-shadow 0.2s, transform 0.2s',
      }}
    >
      <CardHeader
        sx={EXPERIENCE_CARD_STYLES.CARD_HEADER}
        avatar={
          experience.logo && (
            <Avatar
              src={experience.logo}
              alt={`${experience.company} logo`}
              sx={{ ...EXPERIENCE_CARD_STYLES.AVATAR }}
            />
          )
        }
        title={
          <Typography variant="h3" sx={{ ...EXPERIENCE_CARD_STYLES.TITLE }}>
            {experienceTranslations.position}
          </Typography>
        }
        subheader={
          <Box sx={{ ...EXPERIENCE_CARD_STYLES.META }}>
            <Typography variant="h4" sx={{ ...EXPERIENCE_CARD_STYLES.SUBTITLE }}>
              {experience.company}
            </Typography>
            <InfoWithIcon
              icon={FaMapMarkerAlt}
              text={experienceTranslations.location}
              fontSize="0.875rem"
            />
            <InfoWithIcon icon={FaBriefcase} text={workingModelText} fontSize="0.875rem" />
            <InfoWithIcon
              icon={FaCalendarAlt}
              text={dateRange}
              fontSize="0.875rem"
            />
            <InfoWithIcon icon={FaClock} text={duration} fontSize="0.875rem" />
            <InfoWithIcon icon={FaHistory} text={employmentTypeText} fontSize="0.875rem" />
          </Box>
        }
      />

      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box component="ul" sx={EXPERIENCE_CARD_STYLES.LIST}>
          {experienceTranslations.description.map((desc, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                ...EXPERIENCE_CARD_STYLES.CARDCONTENT
              }}
            >
              {desc}
            </Box>
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ ...EXPERIENCE_CARD_STYLES.CARDACTIONS }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} justifyContent="flex-start" width="100%">
          {experience.skillTags.map(skill => (
            <a
              key={skill}
              href={`#skill-${skill.replace(/\s+/g, '')}`}
              style={{ textDecoration: 'none' }}
            >
              <Chip
                label={skill}
                data-skill={skill}
                sx={{ ...EXPERIENCE_CARD_STYLES.CHIP }}
              />
            </a>
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

// Gereksiz render'ları önlemek için memo kullan
export default memo(ExperienceCard);
