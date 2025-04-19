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
  CardMedia,
  CardActions,
  CardHeader,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { FaClock, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { memo, useMemo } from 'react';
import { BlogPost } from '@/types';
import { formatDate } from '@/utils/dateUtils';
import { useTranslation } from '@/hooks/useTranslation';
import InfoWithIcon from '@/components/common/InfoWithIcon';
import CustomButton from '@/components/common/CustomButton';
import { THEME_STYLE } from '@/theme/theme';

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
  META: {
    ...THEME_STYLE.META,
  },
  CARD_CONTENT: {
    p: 2,
  },
  DESCRIPTION: {
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
    color: 'text.primary',
    textAlign: 'justify',
  },
  CARD_ACTIONS: {
    p: 3,
    pt: 0,
    mt: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
} as const;

/**
 * Blog Kartı Props Interface
 *
 * @interface BlogCardProps
 * @property {BlogPost} post - Blog yazısı verisi
 */
interface BlogCardProps {
  post: BlogPost;
}

/**
 * Blog Kartı Bileşeni
 *
 * @param {BlogCardProps} props - Bileşen props'ları
 * @returns {JSX.Element} Blog kartı
 */
function BlogCard({ post }: BlogCardProps) {
  const { t } = useTranslation();
  const styles = useMemo(() => STYLE, []);

  // Meta bilgileri oluştur
  const readingTimeText = `${post.readingTime.minutes} ${
    post.readingTime.minutes > 1 ? t('blog.readingTime.minutes') : t('blog.readingTime.minute')
  }`;
  const publishDateText = formatDate(post.pubDate);

  return (
    <Card component="article" role="article" aria-label={post.title} sx={{ ...styles.CARD, display: 'flex', flexDirection: 'column' }}>
      {/* Kapak Resmi */}
      {post.thumbnail && (
        <CardMedia
          component="img"
          image={post.thumbnail}
          alt={`${post.title} ${t('blog.aria.coverImage')}`}
          loading="lazy"
        />
      )}

      <CardHeader
        sx={styles.CARD_HEADER}
        title={
          <Typography variant="h3" sx={{ ...styles.TITLE }}>
            {post.title}
          </Typography>
        }
        subheader={
          <Box sx={styles.META}>
            <InfoWithIcon icon={FaClock} text={readingTimeText} fontSize="0.875rem" />
            <InfoWithIcon icon={FaCalendarAlt} text={publishDateText} fontSize="0.875rem" />
          </Box>
        }
      />

      <CardContent sx={styles.CARD_CONTENT}>
        {/* Açıklama */}
        <Typography variant="body2" sx={{ ...styles.DESCRIPTION }}>
          {post.description}
        </Typography>
      </CardContent>

      {/* Devamını Oku Butonu */}
      <CardActions sx={styles.CARD_ACTIONS}>
        <Link 
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', width: '100%' }}
        >
          <CustomButton
            fullWidth
            endIcon={<FaArrowRight fontSize="small" />}
            aria-label={`${post.title} - ${t('blog.readMore')}`}
          >
            {t('blog.readMore')}
          </CustomButton>
        </Link>
      </CardActions>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(BlogCard);
