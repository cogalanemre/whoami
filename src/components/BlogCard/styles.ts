import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ANIMATION_DURATION } from '@/constants';
import type { StyledBlogCardProps } from './types';

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'index',
})<StyledBlogCardProps>(({ theme, index }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: `all ${ANIMATION_DURATION.NORMAL}s ease-in-out`,
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `fadeInUp ${ANIMATION_DURATION.NORMAL}s ease-in-out ${index * 0.1}s forwards`,
  
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

export const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
}); 