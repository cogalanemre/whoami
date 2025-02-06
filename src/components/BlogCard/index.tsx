'use client';

import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { BlogCardProps } from './types';
import { StyledCard, StyledCardMedia } from './styles';

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const {
    title,
    link,
    pubDate,
    description,
    thumbnail,
    categories,
    readingTime,
  } = post;

  const formattedDate = pubDate 
    ? format(new Date(pubDate), 'd MMMM yyyy', { locale: tr })
    : '';

  return (
    <StyledCard index={index}>
      {thumbnail && (
        <StyledCardMedia
          image={thumbnail}
          title={title}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          {formattedDate} · {readingTime}
        </Typography>

        <Typography variant="body2" paragraph>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
        </Box>
      </CardContent>

      <CardActions>
        <Button 
          size="small" 
          color="primary"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Devamını Oku
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default BlogCard; 