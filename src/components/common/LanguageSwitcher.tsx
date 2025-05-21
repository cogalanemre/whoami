'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Box } from '@mui/material';
import MaterialUISwitch from './MaterialUISwitch';
import { STYLE } from '@/styles/common/LanguageSwitcher.styles';

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
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    router.push(`/${newLocale}?theme=${currentTheme}`);
  };

  return (
    <Box sx={STYLE.CONTAINER}>
      <MaterialUISwitch checked={locale === 'en'} onChange={handleLanguageChange} type="language" />
    </Box>
  );
}
