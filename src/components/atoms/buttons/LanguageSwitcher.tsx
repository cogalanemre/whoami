"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import ToggleButton from "./ToggleButton";

/**
 * Dil Değiştirici Bileşeni
 * 
 * İki dil arasında geçiş yapan toggle buton.
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
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async () => {
    try {
      setIsChanging(true);
      const newLocale = locale === "tr" ? "en" : "tr";
      await router.push(`/${newLocale}`);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  if (isChanging) {
    return null; // veya loading spinner
  }

  return (
    <ToggleButton
      buttons={[
        { Icon: "TR", isActive: locale === "tr" },
        { Icon: "EN", isActive: locale === "en" }
      ]}
      onClick={handleLanguageChange}
      position={{ top: 60, right: 20 }}
    />
  );
} 