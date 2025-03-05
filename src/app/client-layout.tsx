/**
 * Client Layout Bileşeni
 * 
 * Next.js uygulamasının client-side özelliklerini yöneten ana layout bileşeni.
 * Tema yönetimi, hata sınırları, suspense ve provider'ları içerir.
 * 
 * @module ClientLayout
 */

"use client";

import { Box, useTheme } from "@mui/material";
import { Suspense, useMemo, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@/context/ThemeContext";
import { SelectedSkillProvider } from "@/context/SelectedSkillContext";
import AppThemeProvider from "@/theme/ThemeProvider";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ErrorFallback from "@/components/common/ErrorFallback";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import config from "@/config/config.json";
import { UI_CONSTANTS } from "@/constants";

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
 * Uygulama genelinde kullanılan provider'ları ve hata yönetimini sağlar.
 * Provider Hiyerarşisi:
 * 1. ErrorBoundary - Hata sınırları
 * 2. ThemeProvider - Tema yönetimi
 * 3. MUIThemeProvider - Material-UI tema entegrasyonu
 * 4. SelectedSkillProvider - Seçili yetenekler state yönetimi
 * 5. Suspense - Asenkron yükleme durumları
 * 
 * @component
 * @param {ClientLayoutProps} props - Bileşen props'ları
 * @returns {JSX.Element} Layout bileşeni
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <AppThemeProvider>
          <SelectedSkillProvider>
            <Suspense fallback={
              <LoadingSkeleton 
                height={UI_CONSTANTS.COMPONENTS.SKELETON.HEIGHT.HERO} 
                withTitle={false}
              />
            }>
              <ClientContent>{children}</ClientContent>
            </Suspense>
          </SelectedSkillProvider>
        </AppThemeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

/**
 * İçerik Bileşeni
 * 
 * Tema renklerini ve kullanıcı arayüzü kontrollerini yönetir.
 * Sayfanın ana içeriğini ve tema/dil değiştirme düğmelerini render eder.
 * 
 * Özellikler:
 * - Responsive tasarım
 * - Tema renkleri entegrasyonu
 * - Konfigürasyon bazlı özellik kontrolü
 * - Sabit konumlu UI kontrolleri
 * - Memoized tema renkleri
 * - Smooth tema geçişleri
 * 
 * @component
 * @param {{ children: React.ReactNode }} props - Alt bileşenler
 * @returns {JSX.Element} İçerik bileşeni
 */
function ClientContent({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  // Sayfa yüklendiğinde body'e loaded class'ını ekle
  useEffect(() => {
    // requestAnimationFrame kullanarak hydration sonrasına ertele
    if (typeof window !== 'undefined') {
      const frame = requestAnimationFrame(() => {
        document.body.classList.add('loaded');
      });

      return () => {
        cancelAnimationFrame(frame);
        document.body.classList.remove('loaded');
      };
    }
  }, []);

  /**
   * Memoize edilmiş stiller
   */
  const styles = useMemo(() => ({
    root: {
      minHeight: "100vh",
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      transition: `
        background-color ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s ease,
        color ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s ease
      `,
    },
    controls: {
      position: "fixed",
      top: 20,
      right: 20,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      zIndex: 1000,
      opacity: 1,
      animation: `fadeIn ${UI_CONSTANTS.ANIMATION.DURATION.SLOW}s ease-in`,
      "@keyframes fadeIn": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
    content: {
      transition: `opacity ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s ease`,
    }
  }), [theme]);

  return (
    <Box sx={styles.root}>
      {/* UI Kontrolleri (Tema ve Dil Değiştirici) */}
      <Box sx={styles.controls}>
        {/* Konfigürasyona göre tema değiştiriciyi göster */}
        {config.features.themeSwitcher && <ThemeSwitcher />}
        
        {/* Konfigürasyona göre dil değiştiriciyi göster */}
        {config.features.languageSwitcher && <LanguageSwitcher />}
      </Box>

      {/* Ana İçerik */}
      <Box sx={styles.content}>
        {children}
      </Box>
    </Box>
  );
}
