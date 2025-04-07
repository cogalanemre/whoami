/**
 * Blog Kartı Bileşeni
 *
 * Medium'dan çekilen blog yazılarını gösteren kart bileşeni.
 * Her kart için:
 * - Kapak resmi (varsa)
 * - Başlık (2 satırla sınırlı, WebkitLineClamp ile sınırlandırılmış)
 * - Açıklama (5 satırla sınırlı, WebkitLineClamp ile sınırlandırılmış)
 * - Yayın tarihi ve okuma süresi
 * - Hover efektleri
 * - Responsive tasarım
 *
 * Erişilebilirlik:
 * - ARIA etiketleri
 * - Semantik HTML yapısı (article)
 * - Klavye navigasyonu desteği
 *
 * @component
 * @example
 * ```tsx
 * <BlogCard
 *   post={{
 *     title: "Blog Başlığı",
 *     description: "Blog açıklaması...",
 *     link: "https://medium.com/...",
 *     thumbnail: "https://...",
 *     pubDate: "2024-01-01",
 *     readingTime: { minutes: 5 }
 *   }}
 * />
 * ```
 */

import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography
} from '@mui/material';
import { memo } from 'react';
import { THEME_STYLE } from '@/theme/theme';
import { Gauge } from '@mui/x-charts';

const STYLE = {
  CARD: {
    ...THEME_STYLE.CARD,
    p: 0,
  },
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
    p: 2,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
} as const;

/**
 * Blog Kartı Props Interface
 *
 * @interface BlogCardProps
 * @property {number} duration - Beceri süresi (ay)
 * @property {number} totalMonths - Toplam deneyim süresi (ay)
 * @property {string} skillTag - Beceri etiketi
 */

interface SkillCardProps {
  skillName: string;
  duration: number;
  totalMonths: number;
}

/**
 * Blog Kartı Bileşeni
 *
 * @param {BlogCardProps} props - Bileşen props'ları
 * @returns {JSX.Element} Blog kartı
 */
export const SkillCard = ({ skillName, }: SkillCardProps) => {


  return (
    <Card sx={STYLE.CARD}>
      <CardHeader
        sx={STYLE.CARD_HEADER}
        title={
          <Typography variant="h3" sx={{ ...STYLE.TITLE }}>
            {skillName}
          </Typography>
        }
      />
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Gauge 
            width={150} 
            height={150} 
            value={60}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

// Gereksiz render'ları önlemek için memo kullan
export default memo(SkillCard);
