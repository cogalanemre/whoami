import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { AccessTime, ArrowForward } from '@mui/icons-material';
import { BlogPost } from '@/data/blog';
import { formatDate } from '@/utils/dateUtils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(36, 36, 36, 0.5)',
        overflow: 'hidden',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'all 0.2s ease-in-out',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      {post.thumbnail && (
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}>
          <CardMedia
            component="img"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            image={post.thumbnail}
            alt={post.title}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
              height: '50%',
              pointerEvents: 'none'
            }}
          />
        </Box>
      )}
      <CardContent 
        sx={{ 
          p: 2,
          display: 'flex', 
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: 1.3,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '&:hover': { color: 'primary.light' }
          }}
          component="a"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {post.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <AccessTime sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            {post.readingTime}
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            fontSize: '0.9rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {post.description}
        </Typography>

        <Box sx={{ 
          mt: 'auto', 
          pt: 1,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="caption" color="text.secondary">
            {formatDate(post.pubDate)}
          </Typography>

          <Button
            variant="text"
            color="primary"
            size="small"
            endIcon={<ArrowForward />}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                transform: 'translateX(4px)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            Devamını oku
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
} 