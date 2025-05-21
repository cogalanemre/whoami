'use client';

import { ChangeEvent, forwardRef } from 'react';
import { ThemeSwitch, LanguageSwitch } from '@/styles/common/MaterialUISwitch.styles';

interface MaterialUISwitchProps {
  checked: boolean;
  onChange: () => void;
  type?: 'theme' | 'language';
}

/**
 * Özelleştirilmiş Material-UI Switch Bileşeni
 *
 * Güneş/Ay ikonlu tema değiştirme veya dil değiştirme switch'i.
 * Özellikler:
 * - Özel boyutlar (62x34)
 * - Animasyonlu geçişler
 * - Güneş/Ay ikonları veya TR/EN yazıları
 * - Hover efektleri
 *
 * @component
 * @example
 * ```tsx
 * <MaterialUISwitch checked={isDarkMode} onChange={toggleTheme} type="theme" />
 * <MaterialUISwitch checked={locale === 'en'} onChange={handleLanguageChange} type="language" />
 * ```
 */
const MaterialUISwitch = forwardRef<HTMLButtonElement, MaterialUISwitchProps>(
  ({ onChange, type = 'theme', checked, ...props }, ref) => {
    const SwitchComponent = type === 'theme' ? ThemeSwitch : LanguageSwitch;

    return (
      <SwitchComponent
        ref={ref}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.stopPropagation();
          onChange();
        }}
        {...props}
      />
    );
  }
);

MaterialUISwitch.displayName = 'MaterialUISwitch';

export default MaterialUISwitch;
