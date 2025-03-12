import { Button, styled } from "@mui/material";

// Styled button bileşeni
export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 20px",
  textTransform: "none",
  fontSize: "0.95rem",
  fontWeight: 500,
  letterSpacing: "0.3px",
  transition: "all 0.2s ease-in-out",
  boxShadow: "none",
  background: "transparent",
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: "6px",

  "&:hover": {
    background: theme.palette.action.hover,
    borderColor: theme.palette.text.secondary,
  },

  "&:active": {
    background: theme.palette.action.selected,
  },

  "&.Mui-disabled": {
    background: "transparent",
    borderColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
  },

  // Loading durumunda cursor değişimi
  "&.loading": {
    cursor: "wait",
  }
})); 