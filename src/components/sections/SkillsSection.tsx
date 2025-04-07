import { Box, Typography, Stack } from '@mui/material';
import { Experience } from '@/types';
import { calculateSkillDuration, calculateTotalMonths } from '@/utils/dateUtils';
import { FaCode } from 'react-icons/fa';
import SectionTitle from '@/components/common/SectionTitle';
import { memo } from 'react';
import SkillCard from '../cards/SkillCard';
import { THEME_STYLE } from '@/theme/theme';

/**
 * Stil sabitleri
 * Material-UI theme sistem ile uyumlu stil tanımlamaları
 */
const STYLES = {
  SECTION: {
    ...THEME_STYLE.SECTION,
  },
  CONTAINER: {
    width: '100%',
    gap: 2,
  },
  ITEM: {
    width: {
      xs: 'calc(100% - 16px)',
      sm: 'calc(50% - 16px)',
      md: 'calc(25% - 16px)',
    },
    mb: 2,
  },
  MESSAGE: {
    width: '100%',
    textAlign: 'center',
  },
} as const;

interface SkillsSectionProps {
  experiences: Experience[];
  title: string;
}

/**
 * Yetenekler Section Bileşeni
 *
 * Kullanıcının sahip olduğu yetenekleri ve bu yeteneklerdeki deneyim sürelerini
 * yüzdelik olarak gösteren bölüm.
 *
 * @param {Experience[]} experiences - Deneyim listesi
 * @param {string} title - Bölüm başlığı
 * @returns {JSX.Element} Skills section bileşeni
 */
function SkillsSection({ experiences, title }: SkillsSectionProps) {

  // Tüm yetenekleri ve sürelerini hesapla
  const skillDurationsMap = calculateSkillDuration(experiences);
  const totalMonths = calculateTotalMonths(experiences);

  // Map'i array'e çevir ve sürelerine göre sırala
  const sortedSkills = Array.from(skillDurationsMap.entries()).sort(
    ([, durationA], [, durationB]) => durationB - durationA
  );

  return (
    <Box sx={STYLES.SECTION}>
      <SectionTitle icon={FaCode} title={title} />

      <Stack 
        direction="row" 
        flexWrap="wrap" 
        sx={STYLES.CONTAINER}
      >
        {sortedSkills.length > 0 ? (
          // Yetenek Kartları
          sortedSkills.map(([skillTag, duration]) => (
            <Box sx={STYLES.ITEM} key={skillTag}>
              <SkillCard 
                skillName={skillTag} 
                duration={duration} 
                totalMonths={totalMonths} 
              />
            </Box>
          ))
        ) : (
          // Boş Durum
          <Box sx={STYLES.MESSAGE}>
            <Typography>Henüz yetenek bilgisi bulunmuyor</Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

// Bileşeni memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(SkillsSection);
