"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useTranslation();
  const colors = useThemeColors();

  const handleLanguageChange = () => {
    const newLocale = locale === "tr" ? "en" : "tr";
    router.push(`/${newLocale}`);
  };

  return (
    <Box>
      <Tooltip title={locale === "tr" ? "Switch to English" : "Türkçe'ye Geç"}>
        <IconButton
          onClick={handleLanguageChange}
          sx={{
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
            borderRadius: "50%",
            width: 40,
            height: 40,
            fontSize: "1rem",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: colors.primary,
              color: colors.surface,
            },
          }}
        >
          {locale === "tr" ? "EN" : "TR"}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
