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

// Vurgulanmış kart stilleri
export const cardHighlightedStyles: SxProps<Theme> = {
  borderColor: 'primary.main',
  boxShadow: (theme) => `0 4px 20px ${theme.palette.shadow.primary}`,
};

// Avatar stilleri
export const avatarStyles: SxProps<Theme> = {
  width: 80,
  height: 80,
  bgcolor: "transparent",
  border: "2px solid",
  borderColor: 'border.default',
  display: { xs: "none", md: "block" },
  "& img": {
    objectFit: "cover",
    borderRadius: "50%",
  },
};

// Meta bilgiler konteynır stilleri
export const metaContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  mt: 1,
};

// Açıklama konteynır stilleri
export const descriptionContainerStyles: SxProps<Theme> = {
  mt: 2,
};

// Açıklama metni stilleri
export const descriptionStyles: SxProps<Theme> = {
  fontSize: "0.95rem",
  letterSpacing: "0.3px",
  color: "text.primary",
};

// Yetenekler bölümü stilleri
export const skillSectionStyles: SxProps<Theme> = {
  width: "100%",
  p: 2,
  pt: 0,
};

// Yetenekler konteynır stilleri
export const skillContainerStyles: SxProps<Theme> = {
  direction: "row",
  spacing: 1,
  flexWrap: "wrap",
  gap: 1,
}; 