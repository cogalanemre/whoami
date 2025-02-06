import { styled } from '@mui/material/styles';
import { ANIMATION_DURATION } from '@/constants';
import type { StyledFormProps } from './types';

export const StyledForm = styled('form')<StyledFormProps>(({ theme, isSubmitting }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
  opacity: isSubmitting ? 0.7 : 1,
  pointerEvents: isSubmitting ? 'none' : 'auto',
  transition: `all ${ANIMATION_DURATION.NORMAL}s ease-in-out`,
}));

export const StyledFieldset = styled('fieldset')(({ theme }) => ({
  border: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
})); 