import { SxProps, Theme } from "@mui/material";

// Kart stilleri
export const cardStyles: SxProps<Theme> = {
  bgcolor: 'background.paper',
  borderRadius: '16px',
  position: "relative",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: '0.5px solid',
  borderColor: 'border.default',
  '&:hover': {
    transform: "translateY(-4px)",
    boxShadow: (theme) => `0 4px 20px ${theme.palette.shadow.default}`,
    borderColor: 'border.hover',
  },
};

// Kart başlık stilleri
export const cardHeaderStyles: SxProps<Theme> = {
  padding: '24px',
  backdropFilter: 'blur(4px)',
  borderBottom: '0.5px solid',
  borderColor: 'border.default',
  '& .MuiCardHeader-title': {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: 1.3,
    transition: "all 0.2s ease-in-out",
  },
};

// İletişim bilgileri içerik konteynır stilleri
export const contactInfoContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 3,
};

// Bölüm stilleri
export const sectionStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}; 