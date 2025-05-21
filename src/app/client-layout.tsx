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
  return (
    <ThemeProvider>
      <AppThemeProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Box
            sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, display: 'flex', gap: 1 }}
          >
            {config.features.themeSwitcher && <ThemeSwitcher />}
            {config.features.languageSwitcher && <LanguageSwitcher />}
          </Box>
          {children}
          <SpeedInsights />
        </Box>
      </AppThemeProvider>
    </ThemeProvider>
  );
}
