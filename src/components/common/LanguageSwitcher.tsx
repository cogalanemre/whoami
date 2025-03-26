'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Box } from '@mui/material';
import MaterialUISwitch from './MaterialUISwitch';

// Stil tanımlamaları
const containerStyles = {
  position: 'fixed',
  top: 64,
  right: 20,
  zIndex: 1000,
} as const;

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
      <MaterialUISwitch checked={locale === 'en'} onChange={handleLanguageChange} type="language" />
    </Box>
  );
}
