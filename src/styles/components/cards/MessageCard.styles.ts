import { CommonCardStyles } from './CardStyles';

/**
 * Mesaj Kartı Stilleri
 */
export const MessageCardStyles = {
  card: {
    ...CommonCardStyles.base,
    "&:hover": CommonCardStyles.hover,
    bgcolor: "background.paper",
    "&&": {
      border: "1px solid",
      borderColor: "primary.main",
    },

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
        borderBottom: "2px solid",
        borderColor: "primary.main",
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