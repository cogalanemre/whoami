/**
 * Özel Buton Bileşeni
 * 
 * MUI Button bileşenini özelleştiren genel amaçlı buton.
 * Özellikler:
 * - Tema renk entegrasyonu
 * - Hover ve tıklama efektleri
 * - Responsive tasarım
 * - Erişilebilirlik özellikleri
 * - Loading durumu
 */

import { Button, ButtonProps, CircularProgress, styled } from "@mui/material";
import { forwardRef } from "react";

// Styled button bileşeni
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "10px 24px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 500,
  letterSpacing: "0.5px",
  transition: "all 0.3s ease-in-out",
  boxShadow: "none",
  background: "transparent",
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: "8px",

  "&:hover": {
    background: theme.palette.primary.main,
    color: theme.palette.mode === "dark" ? "#000" : "#fff",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-2px)",
    borderColor: theme.palette.primary.main,
  },

  "&:active": {
    transform: "translateY(0)",
  },

  "&.Mui-disabled": {
    background: "transparent",
    borderColor: theme.palette.mode === "dark" 
      ? "rgba(255, 255, 255, 0.12)" 
      : "rgba(0, 0, 0, 0.12)",
    color: theme.palette.mode === "dark" 
      ? "rgba(255, 255, 255, 0.3)" 
      : "rgba(0, 0, 0, 0.26)",
  },

  // Loading durumunda cursor değişimi
  "&.loading": {
    cursor: "wait",
  }
}));

// Props interface'i
interface CustomButtonProps extends Omit<ButtonProps, "css"> {
  loading?: boolean;
  endIcon?: React.ReactNode;
}

/**
 * Özel Buton Bileşeni
 * 
 * @param {CustomButtonProps} props - Buton props'ları
 * @returns {JSX.Element} Özel buton
 */
const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  function CustomButton({ children, loading, disabled, className, endIcon, ...props }, ref) {
    return (
      <StyledButton
        ref={ref}
        className={`${className || ""} ${loading ? "loading" : ""}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <CircularProgress
            size={24}
            color="inherit"
            sx={{ mr: children ? 1 : 0 }}
          />
        ) : null}
        {children}
        {!loading && endIcon}
      </StyledButton>
    );
  }
);

export default CustomButton; 