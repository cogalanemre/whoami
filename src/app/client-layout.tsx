/**
 * Client Layout Bileşeni
 * 
 * Next.js uygulamasının client-side özelliklerini yöneten ana layout bileşeni.
 * Tema yönetimi, hata sınırları, suspense ve provider'ları içerir.
 * 
 * @module ClientLayout
 */

"use client";

import { Box } from "@mui/material";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemeProvider } from "@/context/ThemeContext";
import { SelectedSkillProvider } from "@/context/SelectedSkillContext";
import MUIThemeProvider from "@/theme/MUIThemeProvider";
import ThemeSwitcher from "@/components/atoms/buttons/ThemeSwitcher";
import LanguageSwitcher from "@/components/atoms/buttons/LanguageSwitcher";
import ErrorFallback from "@/components/atoms/feedback/ErrorFallback";
import LoadingSpinner from "@/components/atoms/feedback/LoadingSpinner";
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
        <MUIThemeProvider>
          <SelectedSkillProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <ClientContent>{children}</ClientContent>
            </Suspense>
          </SelectedSkillProvider>
        </MUIThemeProvider>
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
  /**
   * Tema renklerini memoize et
   * Gereksiz hesaplamaları ve re-render'ları önler
   */
  const colors = useMemo(() => useThemeColors(), []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.secondary,
        // Smooth tema geçişleri için transition ekle
        transition: `
          background-color ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s ease,
          color ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s ease
        `,
      }}
    >
      {/* UI Kontrolleri (Tema ve Dil Değiştirici) */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 1000,
          // UI kontrolleri için fade-in animasyonu
          opacity: 1,
          animation: `fadeIn ${UI_CONSTANTS.ANIMATION.DURATION.SLOW}s ease-in`,
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        {/* Konfigürasyona göre tema değiştiriciyi göster */}
        {config.features.themeSwitcher && <ThemeSwitcher />}
        
        {/* Konfigürasyona göre dil değiştiriciyi göster */}
        {config.features.languageSwitcher && <LanguageSwitcher />}
      </Box>

      {/* Ana İçerik */}
      <Box
        sx={{
          // İçerik için smooth transition
          transition: `opacity ${UI_CONSTANTS.ANIMATION.DURATION.NORMAL}s ease`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
