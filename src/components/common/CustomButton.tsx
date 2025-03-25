/**
 * Özel Buton Bileşeni
 *
 * MUI Button bileşenini özelleştiren genel amaçlı buton.
 * Özellikler:
 * - Tema renk entegrasyonu
 * - Hover ve tıklama efektleri
 * - Responsive tasarım
 * - Erişilebilirlik özellikleri
 */

import { ButtonProps, Button, styled } from '@mui/material';
import { forwardRef } from 'react';

// Props interface'i
interface CustomButtonProps extends ButtonProps {
  // Özel prop'lar buraya eklenebilir
}

// Styled button bileşeni
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2.5),
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  letterSpacing: '0.3px',
  transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
  boxShadow: 'none',
  background: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),

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

  // Klavye odaklanması için stil
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

/**
 * Özel Buton Bileşeni
 *
 * @param {CustomButtonProps} props - Buton props'ları
 * @returns {JSX.Element} Özel buton
 */
const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(function CustomButton(
  { children, ...props },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      tabIndex={0}
      {...props}
    >
      {children}
    </StyledButton>
  );
});

export default CustomButton;
