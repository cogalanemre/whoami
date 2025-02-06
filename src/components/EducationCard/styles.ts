import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { ANIMATION_DURATION } from '@/constants';
import type { StyledEducationCardProps } from './types';

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'index',
})<StyledEducationCardProps>(({ theme, index }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  transition: `all ${ANIMATION_DURATION.NORMAL}s ease-in-out`,
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `fadeInUp ${ANIMATION_DURATION.NORMAL}s ease-in-out ${index * 0.1}s forwards`,
  
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
})); 