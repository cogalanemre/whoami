"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { Box } from "@mui/material";
import { containerStyles, LanguageSwitch } from "./LanguageSwitcher.style";

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
    const newLocale = locale === "tr" ? "en" : "tr";
    router.push(`/${newLocale}`);
  };

  return (
    <Box sx={containerStyles}>
      <LanguageSwitch
        checked={locale === "en"}
        onChange={handleLanguageChange}
      />
    </Box>
  );
} 