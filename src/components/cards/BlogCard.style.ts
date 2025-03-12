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
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  '& .MuiCardHeader-subheader': {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    marginTop: 1,
  },
};

// Blog içerik stilleri
export const blogContentStyles: SxProps<Theme> = {
  p: 3,
};

// Blog açıklama stilleri
export const blogDescriptionStyles: SxProps<Theme> = {
  display: '-webkit-box',
  WebkitLineClamp: 5,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  fontSize: "0.95rem",
  letterSpacing: "0.3px",
  color: "text.primary",
};

// Blog aksiyon stilleri
export const blogActionsStyles: SxProps<Theme> = {
  p: 3,
  pt: 0,
}; 