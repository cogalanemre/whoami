import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { AccessTime, ArrowForward } from "@mui/icons-material";
import { BlogPost } from "@/data/blog";
import { formatDate } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";
import {
  cardStyles,
  cardContentStyles,
  truncatedTextStyles,
  linkButtonStyles,
} from "@/theme/commonStyles";
import InfoWithIcon from "./InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const { t, locale } = useTranslation();
  const commonTranslations = t("common");

  const formatReadingTime = (readingTime: BlogPost["readingTime"]): string => {
    const minutes = readingTime?.minutes || 1;
    return locale === "tr"
      ? `${minutes} dakika`
      : `${minutes} minute${minutes > 1 ? "s" : ""}`;
  };

  return (
    <Card sx={cardStyles(currentColors)}>
      {post.thumbnail && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            backgroundColor: currentColors.background,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            className="blog-image"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.3s ease-in-out",
            }}
            image={post.thumbnail}
            alt={post.title}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
              height: "70%",
              pointerEvents: "none",
            }}
          />
        </Box>
      )}
      <CardContent sx={cardContentStyles}>
        <Typography
          variant="h6"
          sx={{
            color: currentColors.primary,
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            mb: 1,
            ...truncatedTextStyles,
            textDecoration: "none",
            "&:hover": { color: currentColors.secondary },
          }}
          component="a"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {post.title}
        </Typography>

        <InfoWithIcon
          icon={AccessTime}
          text={formatReadingTime(post.readingTime)}
          currentColors={currentColors}
        />

        <Typography
          variant="body2"
          color={currentColors.secondary}
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            ...truncatedTextStyles,
          }}
        >
          {post.description}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            pt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${currentColors.background}`,
          }}
        >
          <Typography variant="caption" color={currentColors.secondary}>
            {formatDate(post.pubDate, locale)}
          </Typography>

          <Button
            variant="text"
            sx={linkButtonStyles(currentColors)}
            size="small"
            endIcon={<ArrowForward />}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {commonTranslations.blog.readMore}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
