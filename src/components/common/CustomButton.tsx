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

import { ButtonProps, CircularProgress } from "@mui/material";
import { forwardRef } from "react";
import { StyledButton } from "./CustomButton.style";

// Props interface'i
interface CustomButtonProps extends Omit<ButtonProps, "css"> {
  loading?: boolean;
  endIcon?: React.ReactNode;
  target?: string;
  rel?: string;
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