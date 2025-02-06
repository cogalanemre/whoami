import { styled, keyframes } from '@mui/material/styles';
import { ANIMATION_DURATION } from '@/constants';
import type { StyledCursorProps } from './types';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const StyledTypewriter = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
});

export const StyledCursor = styled('span')<StyledCursorProps>(({ isBlinking }) => ({
  display: 'inline-block',
  width: '2px',
  height: '1em',
  backgroundColor: 'currentColor',
  marginLeft: '2px',
  animation: isBlinking ? `${blink} ${ANIMATION_DURATION.SLOW}s infinite` : 'none',
})); 