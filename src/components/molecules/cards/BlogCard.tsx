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
} from "@mui/material";
import { AccessTime, ArrowForward, CalendarToday } from "@mui/icons-material";
import { memo } from "react";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import CustomButton from "@/components/atoms/buttons/CustomButton";

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

  // Meta bilgileri oluştur
  const readingTimeText = `${post.readingTime.minutes} ${
    post.readingTime.minutes > 1 ? t("blog.readingTime.minutes") : t("blog.readingTime.minute")
  }`;
  const publishDateText = formatDate(post.pubDate);

  return (
    <Card
      component="article"
      role="article"
      aria-label={post.title}
    >
      {/* Kapak Resmi */}
      {post.thumbnail && (
        <CardMedia
          component="img"
          image={post.thumbnail}
          alt={`${post.title} ${t("blog.aria.coverImage")}`}
        />
      )}

      <CardHeader
        title={post.title}
        subheader={
          <>
            <InfoWithIcon
              icon={AccessTime}
              text={readingTimeText}
              fontSize="0.875rem"
            />
            <InfoWithIcon
              icon={CalendarToday}
              text={publishDateText}
              fontSize="0.875rem"
            />
          </>
        }
      />

      <CardContent className="blog-content">
        {/* Açıklama */}
        <Typography
          variant="body2"
          className="blog-description"
        >
          {post.description}
        </Typography>
      </CardContent>

      {/* Devamını Oku Butonu */}
      <CardActions className="blog-actions">
        <CustomButton
          fullWidth
          endIcon={<ArrowForward fontSize="small" />}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${post.title} - ${t("blog.readMore")}`}
        >
          {t("blog.readMore")}
        </CustomButton>
      </CardActions>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(BlogCard); 