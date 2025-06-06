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
import { memo, useEffect, useState, useRef } from 'react';
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

  const cardRef = useRef<HTMLDivElement>(null);
  // Seçili kartı belirle
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const isThisSelected = window.location.hash === `#skill-${skill.replace(/\s+/g, '')}`;
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
        if (window.location.hash === `#skill-${skill.replace(/\s+/g, '')}`) {
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
  }, [skill]);

  // Yetenek seviyesini hesapla (deneyim ve proje sürelerine göre)
  const calculateSkillLevel = () => {
    // Süreleri aylara çevir
    const convertDurationToMonths = (duration: string): number => {
      if (!duration) return 0;
      let total = 0;
      const yearMatch = duration.match(/(\d+)\s*(yıl|year)/i);
      const monthMatch = duration.match(/(\d+)\s*(ay|month)/i);
      if (yearMatch) total += parseInt(yearMatch[1]) * 12;
      if (monthMatch) total += parseInt(monthMatch[1]);
      return total;
    };

    // Bu yeteneğin kullanıldığı toplam süre
    const totalSkillDuration = [
      ...usedIn.experiences.map(exp => convertDurationToMonths(exp.duration)),
      ...usedIn.projects.map(proj => convertDurationToMonths(proj.duration))
    ].reduce((sum, months) => sum + months, 0);

    // Yüzde hesapla
    // Eğer toplam süre 0 ise 0 döndür
    if (totalSkillDuration === 0) return 0;

    // Yetenek süresini toplam süreye böl
    const percentage = Math.min(Math.round((totalSkillDuration / 60) * 100), 100);
    
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
    <Card ref={cardRef} sx={{
      ...STYLES.CARD,
      borderColor: isSelected ? (theme => theme.palette.primary.main) : STYLES.CARD.borderColor,
      borderWidth: isSelected ? 1 : STYLES.CARD.borderWidth,
      transform: isSelected ? 'translateY(-4px)' : 'none',
      transition: 'border-color 0.2s, border-width 0.2s, box-shadow 0.2s, transform 0.2s',
    }}>
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
              {usedIn.experiences.map((exp) => (
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
              {usedIn.projects.map((proj) => (
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