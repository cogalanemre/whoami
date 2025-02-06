import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { ANIMATION_DURATION } from '@/constants';
import type { StyledExperienceCardProps } from './types';

export const StyledExperienceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  position: 'relative',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(3)
  }
}));

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isCurrentJob',
})<StyledExperienceCardProps>(({ theme, isCurrentJob }) => ({
  flex: 1,
  marginLeft: theme.spacing(6),
  padding: theme.spacing(2),
  background: 'rgba(36, 36, 36, 0.5)',
  transition: `all ${ANIMATION_DURATION.NORMAL}s ease-in-out`,

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(10),
    padding: theme.spacing(3),
  },

  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(12),
  },

  ...(isCurrentJob && {
    border: `2px solid ${theme.palette.primary.main}`,
  }),
})); 