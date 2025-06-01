/**
 * Client Layout Bileşeni
 *
 * Next.js uygulamasının client-side özelliklerini yöneten ana layout bileşeni.
 * Tema yönetimi ve provider'ları içerir.
 *
 * @module ClientLayout
 */

'use client';

import { Box } from '@mui/material';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/context/ThemeContext';
import AppThemeProvider from '@/theme/ThemeProvider';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import config from '@/config/config.json';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/**
 * Client Layout Props
 *
 * @interface ClientLayoutProps
 * @property {React.ReactNode} children - Layout içinde render edilecek alt bileşenler
 */
interface ClientLayoutProps {
  children: React.ReactNode;
}

/**
 * Ana Client Layout Bileşeni
 *
 * Uygulama genelinde kullanılan provider'ları sağlar.
 * Provider Hiyerarşisi:
 * 1. ThemeProvider - Tema yönetimi
 * 2. MUIThemeProvider - Material-UI tema entegrasyonu
 *
 * @component
 * @param {ClientLayoutProps} props - Bileşen props'ları
 * @returns {JSX.Element} Layout bileşeni
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme');

  return (
    <Suspense>
      <ThemeProvider initialTheme={themeParam as 'dark' | 'light'}>
        <AppThemeProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box
              sx={{ 
                position: 'fixed', 
                top: 16, 
                right: 16, 
                zIndex: 1000, 
                display: 'flex', 
                gap: 1,
                width: '100%',
                justifyContent: 'flex-end',
                px: { xs: 2, sm: 3, md: 4 }
              }}
            >
              {config.features.themeSwitcher && <ThemeSwitcher />}
              {config.features.languageSwitcher && <LanguageSwitcher />}
            </Box>
            <Box 
              sx={{ 
                flex: 1,
                width: '100%',
                maxWidth: '1200px',
                mx: 'auto',
                mt: 8,
                '&.MuiBox-root.css-1invku5': {
                  paddingLeft: { xs: 2, sm: 3, md: 4 } + ' !important',
                  paddingRight: { xs: 2, sm: 3, md: 4 } + ' !important',
                  '@media (min-width: 1200px)': {
                    paddingLeft: '32px !important',
                    paddingRight: '32px !important'
                  },
                  '@media (min-width: 900px)': {
                    paddingLeft: '24px !important',
                    paddingRight: '24px !important'
                  },
                  '@media (min-width: 600px)': {
                    paddingLeft: '16px !important',
                    paddingRight: '16px !important'
                  },
                  '@media (min-width: 0px)': {
                    paddingLeft: '16px !important',
                    paddingRight: '16px !important'
                  }
                }
              }}
            >
              {children}
            </Box>
            <SpeedInsights />
          </Box>
        </AppThemeProvider>
      </ThemeProvider>
    </Suspense>
  );
}
