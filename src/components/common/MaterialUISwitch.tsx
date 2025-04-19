'use client';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { ChangeEvent, forwardRef } from 'react';

interface MaterialUISwitchProps {
  checked: boolean;
  onChange: () => void;
  type?: 'theme' | 'language';
}

const BaseSwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#2497ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#003892',
    width: 32,
    height: 32,
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#2497ff',
    borderRadius: 20 / 2,
  },
}));

const ThemeSwitch = styled(BaseSwitch)({
  '& .MuiSwitch-thumb': {
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& .MuiSwitch-thumb::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
    },
    '& .MuiSwitch-thumb::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
});

const LanguageSwitch = styled(BaseSwitch)({
  '& .MuiSwitch-thumb': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: '#fff',
    '&::before': {
      content: '"TR"',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& .MuiSwitch-thumb::before': {
        content: '"EN"',
      },
    },
  },
});

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
