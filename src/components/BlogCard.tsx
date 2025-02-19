import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import Image from "next/image";
import { BlogPost } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { useTranslation } from "@/hooks/useTranslation";
import { useThemeColors } from "@/hooks/useThemeColors";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { locale } = useTranslation();
  const colors = useThemeColors();

  return (
    <Link
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          background: colors.surface,
          transition: "all 0.3s ease-in-out",
          height: "100%",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        {post.thumbnail && (
          <Box
            sx={{
              width: "100%",
              height: 200,
              position: "relative",
            }}
          >
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: colors.primary,
              mb: 1,
              fontWeight: "bold",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: colors.secondary,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: colors.secondary,
              fontSize: "0.875rem",
            }}
          >
            <Typography variant="caption">
              {formatDate(post.pubDate, locale)}
            </Typography>
            <Typography variant="caption">
              {post.readingTime.minutes} {locale === "tr" ? "dakika" : "minutes"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
