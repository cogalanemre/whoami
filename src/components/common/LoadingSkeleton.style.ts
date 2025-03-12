import { Theme } from "@mui/material";

export const titleContainerStyles = {
  mb: 2,
} as const;

export const getTitleSkeletonStyles = (theme: Theme) => ({
  bgcolor: theme.palette.background.paper,
});

export const getMainSkeletonStyles = (theme: Theme) => ({
  borderRadius: 2,
  bgcolor: theme.palette.background.paper,
  // Dalga animasyonu için gradient efekti
  '&::after': {
    background: `linear-gradient(
      90deg, 
      transparent, 
      ${theme.palette.primary.main}10, 
      transparent
    )`
  }
}); 