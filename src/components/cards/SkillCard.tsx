/**
 * Yetenek Kartı Bileşeni
 *
 * Kullanıcının yeteneklerini gösteren kart bileşeni.
 * Özellikler:
 * - Yetenek adı
 * - Kullanıldığı deneyim ve projeler
 * - Kullanım süreleri
 * - Hover ve seçim animasyonları
 * - Responsive tasarım
 * - Çok dilli destek
 *
 * @component
 * @example
 * ```tsx
 * <SkillCard
 *   skill="React"
 *   usedIn={{
 *     experiences: [
 *       { name: "OBSS", duration: "2 yıl" },
 *       { name: "Company A", duration: "1 yıl" }
 *     ],
 *     projects: [
 *       { name: "Whoami", duration: "6 ay" },
 *       { name: "Project B", duration: "3 ay" }
 *     ]
 *   }}
 * />
 * ```
 */

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { memo} from 'react';
import { skillCardStyles as STYLES } from '@/styles/cards/SkillCard.styles';
import { useTranslation } from '@/hooks/useTranslation';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

/**
 * Yetenek Kartı Props Interface
 *
 * @interface SkillCardProps
 * @property {string} skill - Yetenek adı
 * @property {{
 *   experiences: Array<{ name: string; duration: string }>;
 *   projects: Array<{ name: string; duration: string }>;
 * }} usedIn - Yeteneğin kullanıldığı yerler ve süreleri
 */
interface SkillCardProps {
  skill: string;
  usedIn: {
    experiences: Array<{ name: string; duration: string }>;
    projects: Array<{ name: string; duration: string }>;
  };
}

/**
 * Yetenek Kartı Bileşeni
 *
 * @param {SkillCardProps} props - Bileşen props'ları
 * @returns {JSX.Element} Yetenek kartı
 */
function SkillCard({ skill, usedIn }: SkillCardProps) {
  const { t } = useTranslation();

  // Yetenek seviyesini hesapla (deneyim ve proje sürelerine göre)
  const calculateSkillLevel = () => {
    // Süreleri aylara çevir
    const convertDurationToMonths = (duration: string): number => {
      if (!duration) return 0;
      
      // "2 yıl" veya "6 ay" veya "2 year" veya "6 month" formatındaki string'i parse et
      const match = duration.match(/(\d+)\s*(yıl|ay|year|month)/i);
      if (!match) return 0;

      const value = parseInt(match[1]);
      const unit = match[2].toLowerCase();

      switch (unit) {
        case 'yıl':
        case 'year':
          return value * 12;
        case 'ay':
        case 'month':
          return value;
        default:
          return 0;
      }
    };

    // Bu yeteneğin kullanıldığı toplam süre
    const totalSkillDuration = [
      ...usedIn.experiences.map(exp => convertDurationToMonths(exp.duration)),
      ...usedIn.projects.map(proj => convertDurationToMonths(proj.duration))
    ].reduce((sum, months) => sum + months, 0);

    // Tüm deneyimlerin toplam süresi (tüm deneyimler)
    const totalExperienceDuration = 60; // Örnek: 5 yıl toplam deneyim

    // Projelerin toplam süresi
    const totalProjectDuration = usedIn.projects
      .map(proj => convertDurationToMonths(proj.duration))
      .reduce((sum, months) => sum + months, 0);

    // Toplam süre (deneyim + proje)
    const totalDuration = totalExperienceDuration + totalProjectDuration;

    // Yüzde hesapla
    // Eğer toplam süre 0 ise 0 döndür
    if (totalDuration === 0) return 0;

    // Yetenek süresini toplam süreye böl
    const percentage = Math.min(Math.round((totalSkillDuration / totalDuration) * 100), 100);
    
    console.log('Skill:', skill);
    console.log('Durations:', {
      experiences: usedIn.experiences.map(e => ({ name: e.name, duration: e.duration, months: convertDurationToMonths(e.duration) })),
      projects: usedIn.projects.map(p => ({ name: p.name, duration: p.duration, months: convertDurationToMonths(p.duration) }))
    });
    console.log('Total Skill Duration:', totalSkillDuration);
    console.log('Total Experience Duration:', totalExperienceDuration);
    console.log('Total Project Duration:', totalProjectDuration);
    console.log('Total Duration:', totalDuration);
    console.log('Percentage:', percentage);
    
    return {
      percentage,
      totalMonths: totalSkillDuration,
      formattedDuration: formatDuration(totalSkillDuration)
    };
  };

  // Süreyi yıl ve ay olarak formatla
  const formatDuration = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      // Hem yıl hem ay varsa: yıl üstte, ay alt satırda
      return `${years} ${t('skills.duration.years')}\n${remainingMonths} ${t('skills.duration.months')}`;
    } else if (years > 0) {
      // Sadece yıl varsa: tek satırda
      return `${years} ${t('skills.duration.years')}`;
    } else {
      // Sadece ay varsa: tek satırda
      return `${remainingMonths} ${t('skills.duration.months')}`;
    }
  };

  const skillLevel = calculateSkillLevel();

  return (
    <Card sx={STYLES.CARD}>
      <CardHeader
        sx={STYLES.CARD_HEADER}
        title={
          <Typography 
            variant="h3" 
            sx={STYLES.TITLE}
          >
            {skill}
          </Typography>
        }
      />
      <CardContent sx={STYLES.CARD_CONTENT}>
        <Stack spacing={1} width="100%">
          <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Gauge
              value={typeof skillLevel === 'number' ? skillLevel : skillLevel.percentage}
              width={150}
              height={100}
              startAngle={-110}
              endAngle={110}
              cornerRadius="50%"
              valueMin={0}
              valueMax={100}
              text={typeof skillLevel === 'number' ? '0' : skillLevel.formattedDuration}
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 14,
                  lineHeight: 1.2,
                  textAlign: 'center',
                  whiteSpace: 'pre-line'
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: theme.palette.primary.main,
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.divider,
                },
              })}
            />
          </Box>
          {usedIn.experiences.length > 0 && (
            <Box width="100%">
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 'bold',
                  color: 'text.primary',
                  opacity: 0.9,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {t('sections.experience')}
              </Typography>
              {usedIn.experiences.map((exp, index) => (
                <Typography key={exp.name} variant="body2" sx={{ mb: 0.5 }}>
                  <a href={`#experience-${exp.name.replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
                    {exp.name}
                  </a> ({exp.duration})
                </Typography>
              ))}
            </Box>
          )}
          {usedIn.projects.length > 0 && (
            <Box width="100%">
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 'bold',
                  color: 'text.primary',
                  opacity: 0.9,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {t('sections.projects')}
              </Typography>
              {usedIn.projects.map((proj, index) => (
                <Typography key={proj.name} variant="body2" sx={{ mb: 0.5 }}>
                  <a href={`#project-${proj.name.replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
                    {proj.name}
                  </a> ({proj.duration})
                </Typography>
              ))}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default memo(SkillCard); 