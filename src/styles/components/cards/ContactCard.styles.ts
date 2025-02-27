import { CommonCardStyles } from './CardStyles';

/**
 * İletişim Kartı Stilleri
 */
export const ContactCardStyles = {
  card: {
    ...CommonCardStyles.base,
    "&:hover": CommonCardStyles.hover,
  },
  header: {
    ...CommonCardStyles.header,
  },
  title: {
    ...CommonCardStyles.title,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  field: {
    position: "relative",
    "& .MuiInputBase-root": {
      transition: "all 0.2s ease-in-out",
      "&::before": {
        borderBottom: "1px solid",
        borderColor: theme => theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.2)"
          : "rgba(0,0,0,0.2)",
      },
      "&::after": {
        borderBottom: "2px solid",
        borderColor: "primary.main",
      },
      "&:hover:not(.Mui-disabled)::before": {
        borderColor: "primary.main",
      },
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary",
      "&.Mui-focused": {
        color: "primary.main",
      },
    },
    "& .MuiInput-input": {
      padding: "8px 0",
      fontSize: "1rem",
      "&::placeholder": {
        color: "text.secondary",
        opacity: 0.5,
      },
    },
    "& .MuiInputBase-multiline": {
      padding: "8px 0",
    },
  },
  submit: {
    mt: 3,
    alignSelf: "stretch",
    borderRadius: "12px",
    py: 2,
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 500,
    letterSpacing: "0.5px",
    boxShadow: "none",
    background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 4px 15px rgba(36, 151, 255, 0.2)",
      transform: "translateY(-2px)",
    },
  },
} as const; 