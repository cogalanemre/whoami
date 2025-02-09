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

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        background: currentColors.surface,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease-in-out",
        borderRadius: 2,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
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
      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          "&:last-child": {
            paddingBottom: 2,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: currentColors.primary,
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "&:hover": { color: currentColors.secondary },
          }}
          component="a"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {post.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <AccessTime sx={{ fontSize: "1rem", color: currentColors.primary }} />
          <Typography
            variant="caption"
            color={currentColors.secondary}
            sx={{ fontSize: "0.85rem" }}
          >
            {post.readingTime}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color={currentColors.secondary}
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
            {formatDate(post.pubDate)}
          </Typography>

          <Button
            variant="text"
            sx={{
              color: currentColors.primary,
              "&:hover": {
                backgroundColor: "transparent",
                transform: "translateX(4px)",
                transition: "all 0.2s ease-in-out",
              },
            }}
            size="small"
            endIcon={<ArrowForward />}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Devamını oku
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
