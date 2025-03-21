'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

// Stil tanımlamaları
const containerStyles = {
  position: 'fixed',
  top: 64,
  right: 20,
  zIndex: 1000,
} as const;

const LanguageSwitch = styled(Switch)(() => ({
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
      '& .MuiSwitch-thumb': {
        '&::after': {
          content: '"EN"',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-poppins)',
    fontSize: '13px',
    fontWeight: 500,
    color: '#fff',
    '&::after': {
      content: '"TR"',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#2497ff',
    borderRadius: 20 / 2,
  },
}));

/**
 * Dil Değiştirici Bileşeni
 *
 * Diller arasında geçiş yapan modern tasarımlı switch.
 * MaterialUISwitch stilinde özel tasarlanmış bir switch bileşeni.
 *
 * @component
 * @example
 * ```tsx
 * <LanguageSwitcher />
 * ```
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useTranslation();

  const handleLanguageChange = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    router.push(`/${newLocale}`);
  };

  return (
    <Box sx={containerStyles}>
      <LanguageSwitch checked={locale === 'en'} onChange={handleLanguageChange} />
    </Box>
  );
}
