import { SxProps, Theme } from '@mui/material';

export const projectSectionStyles = {
  SECTION: {
    mb: 4,
  } as SxProps<Theme>,
  STACK: {
    gap: 2,
  } as SxProps<Theme>,
  BOX: {
    width: '100%',
  } as SxProps<Theme>,
} as const; 