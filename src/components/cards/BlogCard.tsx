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
import { BLOG_CARD_STYLES } from '@/styles/cards/BlogCard.styles';

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

  // Meta bilgilerini memoize et
  const { readingTimeText, publishDateText } = useMemo(() => ({
    readingTimeText: `${post.readingTime.minutes} ${
      post.readingTime.minutes > 1 ? t('blog.readingTime.minutes') : t('blog.readingTime.minute')
    }`,
    publishDateText: formatDate(post.pubDate)
  }), [post.readingTime.minutes, post.pubDate, t]);

  return (
    <Card component="article" role="article" aria-label={post.title} sx={{ ...BLOG_CARD_STYLES.CARD, display: 'flex', flexDirection: 'column' }}>
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
        sx={BLOG_CARD_STYLES.CARD_HEADER}
        title={
          <Typography variant="h3" sx={{ ...BLOG_CARD_STYLES.TITLE }}>
            {post.title}
          </Typography>
        }
        subheader={
          <Box sx={BLOG_CARD_STYLES.META}>
            <InfoWithIcon icon={FaClock} text={readingTimeText} fontSize="0.875rem" />
            <InfoWithIcon icon={FaCalendarAlt} text={publishDateText} fontSize="0.875rem" />
          </Box>
        }
      />

      <CardContent sx={BLOG_CARD_STYLES.CARD_CONTENT}>
        {/* Açıklama */}
        <Typography variant="body2" sx={{ ...BLOG_CARD_STYLES.DESCRIPTION }}>
          {post.description}
        </Typography>
      </CardContent>

      {/* Devamını Oku Butonu */}
      <CardActions sx={BLOG_CARD_STYLES.CARD_ACTIONS}>
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
