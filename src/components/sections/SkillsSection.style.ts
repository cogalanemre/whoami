import { Theme } from "@mui/material";

export const sectionStyles = {
  mt: 4,
} as const;

export const stackStyles = {
  gap: 1,
  direction: "row",
  flexWrap: "wrap",
} as const;

// Chip stilleri için yardımcı fonksiyon
export const getChipStyles = (isSelected: boolean, theme: Theme) => ({
  bgcolor: isSelected ? theme.palette.primary.main : theme.palette.background.paper,
  color: isSelected ? theme.palette.background.paper : theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
  "&:hover": {
    bgcolor: isSelected ? theme.palette.primary.main : theme.palette.background.paper,
    opacity: 0.9,
  },
}); 