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

import { ButtonProps, CircularProgress, Button, styled } from '@mui/material';
import { forwardRef } from 'react';

// Props interface'i
interface CustomButtonProps extends Omit<ButtonProps, 'css'> {
  loading?: boolean;
  endIcon?: React.ReactNode;
  target?: string;
  rel?: string;
}

// Styled button bileşeni
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 20px',
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  letterSpacing: '0.3px',
  transition: 'all 0.2s ease-in-out',
  boxShadow: 'none',
  background: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',

  '&:hover': {
    background: theme.palette.action.hover,
    borderColor: theme.palette.text.secondary,
  },

  '&:active': {
    background: theme.palette.action.selected,
  },

  '&.Mui-disabled': {
    background: 'transparent',
    borderColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
  },

  // Loading durumunda cursor değişimi
  '&.loading': {
    cursor: 'wait',
  },
}));

/**
 * Özel Buton Bileşeni
 *
 * @param {CustomButtonProps} props - Buton props'ları
 * @returns {JSX.Element} Özel buton
 */
const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(function CustomButton(
  { children, loading, disabled, className, endIcon, ...props },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      className={`${className || ''} ${loading ? 'loading' : ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" sx={{ mr: children ? 1 : 0 }} />
      ) : null}
      {children}
      {!loading && endIcon}
    </StyledButton>
  );
});

export default CustomButton;
