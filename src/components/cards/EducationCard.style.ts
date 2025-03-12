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

// Okul adı stilleri
export const schoolNameStyles: SxProps<Theme> = {
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "primary.main",
  lineHeight: 1.3,
  marginBottom: 1,
};

// Bölüm adı stilleri
export const departmentStyles: SxProps<Theme> = {
  fontSize: "1rem",
  fontWeight: 500,
  color: "text.primary",
  marginBottom: 1,
};

// Meta bilgiler konteynır stilleri
export const metaContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  mt: 1,
}; 