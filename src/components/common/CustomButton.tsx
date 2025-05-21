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

import { Button, CircularProgress } from '@mui/material';
import { forwardRef, memo } from 'react';
import { CUSTOM_BUTTON_STYLES } from '@/styles/common/CustomButton.styles';

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  function CustomButton({ children, isLoading, ...props }, ref) {
    return (
      <Button ref={ref} sx={CUSTOM_BUTTON_STYLES.BUTTON} disabled={isLoading} {...props}>
        {isLoading ? <CircularProgress size={24} /> : children}
      </Button>
    );
  }
);

export default memo(CustomButton);
