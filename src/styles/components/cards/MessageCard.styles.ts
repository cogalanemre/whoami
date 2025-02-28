import { CommonCardStyles } from './CardStyles';

/**
 * Mesaj Kartı Stilleri
 */
export const MessageCardStyles = {
  card: {
    ...CommonCardStyles.base,
    "&:hover": CommonCardStyles.hover,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: "text.secondary",
  },
  header: {
    ...CommonCardStyles.header,
  },
  title: {
    ...CommonCardStyles.title,
  },
  content: {
    padding: 4,
    paddingTop: 4,
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
        borderColor: "text.primary",
      },
      "&:hover:not(.Mui-disabled)::before": {
        borderColor: "text.primary",
      },
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary",
      "&.Mui-focused": {
        color: "text.primary",
      },
    },
    "& .MuiInput-input": {
      color: "text.primary",
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
} as const; 