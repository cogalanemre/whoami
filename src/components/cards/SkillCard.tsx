/**
 * Yetenek Kartı Bileşeni
 *
 * Kullanıcının yeteneklerini gösteren kart bileşeni.
 * Özellikler:
 * - Yetenek adı
 * - Yetenek etiketi
 * - Hover ve seçim animasyonları
 * - Responsive tasarım
 *
 * @component
 * @example
 * ```tsx
 * <SkillCard
 *   skill="React"
 * />
 * ```
 */

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { memo } from 'react';
import { skillCardStyles as STYLES } from '@/styles/cards/SkillCard.styles';

/**
 * Yetenek Kartı Props Interface
 *
 * @interface SkillCardProps
 * @property {string} skill - Yetenek adı
 */
interface SkillCardProps {
  skill: string;
}

/**
 * Yetenek Kartı Bileşeni
 *
 * @param {SkillCardProps} props - Bileşen props'ları
 * @returns {JSX.Element} Yetenek kartı
 */
function SkillCard({ skill }: SkillCardProps) {
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
        <Box sx={STYLES.CHIP_CONTAINER}>
          <Chip
            label={skill}
            sx={STYLES.CHIP}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default memo(SkillCard); 