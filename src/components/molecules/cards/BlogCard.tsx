/**
 * Blog Kartı Bileşeni
 * 
 * Medium blog yazılarını gösteren kart bileşeni.
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

import { Card, CardContent, Typography, Box, Link, Button } from "@mui/material";
import { AccessTime, CalendarToday, OpenInNew } from "@mui/icons-material";
import Image from "next/image";
import { memo } from "react";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { useTranslation } from "@/hooks/useTranslation";
import { useThemeColors } from "@/hooks/useThemeColors";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";

/**
 * Blog kartı için stil sabitleri
 */
const STYLES = {
  CARD: {
    transition: "all 0.3s ease-in-out",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
  },
  IMAGE_CONTAINER: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  CONTENT: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  TRUNCATED_TEXT: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  },
  TITLE: {
    mb: 0.5,
    fontWeight: "bold",
    WebkitLineClamp: 2,
  },
  META: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    mb: 2,
  },
  DESCRIPTION: {
    WebkitLineClamp: 3,
    mb: 3,
  },
  BUTTON: {
    mt: "auto",
    display: "flex",
    alignItems: "center",
    gap: 0.5,
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
  // Hook'ları çağır
  const { locale } = useTranslation();
  const colors = useThemeColors();

  // Meta bilgileri oluştur
  const readingTimeText = `${post.readingTime.minutes} ${locale === "tr" ? "dakika" : "minutes"}`;
  const publishDateText = formatDate(post.pubDate, locale);
  const buttonText = locale === "tr" ? "Devamını Oku" : "Read More";

  return (
    <Card
      sx={{
        ...STYLES.CARD,
        background: colors.surface,
      }}
    >
      {/* Kapak Resmi */}
      {post.thumbnail && (
        <Box sx={STYLES.IMAGE_CONTAINER}>
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
      )}

      <CardContent sx={STYLES.CONTENT}>
        {/* Başlık */}
        <Typography
          variant="h6"
          sx={{
            ...STYLES.TRUNCATED_TEXT,
            ...STYLES.TITLE,
            color: colors.primary,
          }}
        >
          {post.title}
        </Typography>

        {/* Meta Bilgiler */}
        <Box sx={{ ...STYLES.META, color: colors.secondary }}>
          <InfoWithIcon
            icon={AccessTime}
            text={readingTimeText}
            colors={colors}
            fontSize="0.875rem"
          />
          <InfoWithIcon
            icon={CalendarToday}
            text={publishDateText}
            colors={colors}
            fontSize="0.875rem"
          />
        </Box>

        {/* Açıklama */}
        <Typography
          variant="body2"
          sx={{
            ...STYLES.TRUNCATED_TEXT,
            ...STYLES.DESCRIPTION,
            color: colors.secondary,
          }}
        >
          {post.description}
        </Typography>

        {/* Devamını Oku Butonu */}
        <Button
          variant="outlined"
          color="primary"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={STYLES.BUTTON}
          endIcon={<OpenInNew />}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(BlogCard); 