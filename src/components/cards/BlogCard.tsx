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
  SxProps,
  Theme,
} from "@mui/material";
import { AccessTime, ArrowForward, CalendarToday } from "@mui/icons-material";
import { memo } from "react";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import CustomButton from "@/components/common/CustomButton";

// Stil tanımlamaları
const cardStyles: SxProps<Theme> = {
  bgcolor: 'background.paper',
  borderRadius: '16px',
  position: "relative",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: '0.5px solid',
  borderColor: 'border.default',
  '&:hover': {
    transform: "translateY(-4px)",
    borderColor: 'border.hover',
  },
};

const cardHeaderStyles: SxProps<Theme> = {
  padding: '24px',
  backdropFilter: 'blur(4px)',
  borderBottom: '0.5px solid',
  borderColor: 'border.default',
  '& .MuiCardHeader-title': {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: 1.3,
    transition: "all 0.2s ease-in-out",
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  '& .MuiCardHeader-subheader': {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    marginTop: 1,
  },
};

const blogContentStyles: SxProps<Theme> = {
  p: 3,
};

const blogDescriptionStyles: SxProps<Theme> = {
  display: '-webkit-box',
  WebkitLineClamp: 5,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  fontSize: "0.95rem",
  letterSpacing: "0.3px",
  color: "text.primary",
};

const blogActionsStyles: SxProps<Theme> = {
  p: 3,
  pt: 0,
};

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
      sx={cardStyles}
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
        sx={cardHeaderStyles}
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

      <CardContent sx={blogContentStyles}>
        {/* Açıklama */}
        <Typography
          variant="body2"
          sx={blogDescriptionStyles}
        >
          {post.description}
        </Typography>
      </CardContent>

      {/* Devamını Oku Butonu */}
      <CardActions sx={blogActionsStyles}>
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