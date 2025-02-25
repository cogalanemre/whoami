/**
 * Blog Kartı Bileşeni
 * 
 * Medium'dan çekilen blog yazılarını gösteren kart bileşeni.
 * Her kart için:
 * - Kapak resmi (varsa)
 * - Başlık (2 satırla sınırlı)
 * - Açıklama (3 satırla sınırlı)
 * - Yayın tarihi ve okuma süresi
 * - Hover efektleri
 * - Responsive tasarım
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

import { Card, CardContent, Typography, Box, Button, useTheme } from "@mui/material";
import { AccessTime, ArrowForward, CalendarToday } from "@mui/icons-material";
import Image from "next/image";
import { memo } from "react";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import { getTranslation } from "@/i18n/utils";

/**
 * Blog kartı için stil sabitleri
 */
const STYLES = {
  CARD: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  IMAGE_CONTAINER: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
    overflow: "hidden",
  },
  IMAGE_OVERLAY: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
    height: "70%",
    pointerEvents: "none",
  },
  CONTENT: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  TITLE: {
    color: "primary.main",
    fontWeight: 600,
    fontSize: "1.1rem",
    lineHeight: 1.3,
    mb: 1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textDecoration: "none",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: theme => theme.palette.text.primary,
    },
  },
  META: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },
  DESCRIPTION: {
    mb: 2,
    fontSize: "0.9rem",
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  FOOTER: {
    mt: "auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  BUTTON: {
    minWidth: "auto",
    p: 1,
    "&:hover": {
      backgroundColor: "transparent",
      color: "primary.main",
    },
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
  const { locale } = useTranslation();
  const theme = useTheme();

  // Çevirileri al
  const t = {
    readingTime: {
      minutes: getTranslation("blog.readingTime.minutes", locale),
      minute: getTranslation("blog.readingTime.minute", locale),
    },
    button: getTranslation("blog.readMore", locale),
    aria: {
      coverImage: getTranslation("blog.aria.coverImage", locale),
      readPost: getTranslation("blog.aria.readPost", locale),
    }
  };

  // Meta bilgileri oluştur
  const readingTimeText = `${post.readingTime.minutes} ${
    post.readingTime.minutes > 1 ? t.readingTime.minutes : t.readingTime.minute
  }`;
  const publishDateText = formatDate(post.pubDate, locale);

  return (
    <Card
      sx={{
        ...STYLES.CARD,
        background: theme.palette.background.paper,
      }}
      component="article"
      role="article"
      aria-label={post.title}
    >
      {/* Kapak Resmi */}
      {post.thumbnail && (
        <Box sx={STYLES.IMAGE_CONTAINER}>
          <Image
            src={post.thumbnail}
            alt={`${post.title} ${t.aria.coverImage}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />
          <Box sx={STYLES.IMAGE_OVERLAY} aria-hidden="true" />
        </Box>
      )}

      <CardContent sx={STYLES.CONTENT}>
        {/* Başlık */}
        <Typography
          variant="h6"
          component="a"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={STYLES.TITLE}
          aria-label={`${post.title} - ${t.aria.readPost}`}
        >
          {post.title}
        </Typography>

        {/* Meta Bilgiler */}
        <Box sx={STYLES.META}>
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
        </Box>

        {/* Açıklama */}
        <Typography
          variant="body2"
          sx={{
            ...STYLES.DESCRIPTION,
            color: theme.palette.text.primary,
          }}
        >
          {post.description}
        </Typography>

        {/* Devamını Oku Butonu */}
        <Box sx={STYLES.FOOTER}>
          <Button
            variant="text"
            size="small"
            endIcon={<ArrowForward />}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              ...STYLES.BUTTON,
              color: theme.palette.text.primary,
            }}
            aria-label={`${post.title} - ${t.button}`}
          >
            {t.button}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(BlogCard); 