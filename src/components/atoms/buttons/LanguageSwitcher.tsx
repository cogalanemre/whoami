"use client";

import { Box, Button, CircularProgress, ButtonGroup } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

/**
 * Dil değiştirici bileşeni
 * 
 * İlaç kapsülü şeklinde tasarlanmış dil değiştirme butonu.
 * Aktif dil vurgulanır.
 * Erişilebilirlik standartlarına uygun.
 * Loading state ve hata yönetimi içerir.
 * 
 * @component
 * @returns {JSX.Element} Dil değiştirici buton
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);
  const theme = useTheme();

  const handleLanguageChange = async (newLocale: string) => {
    try {
      setIsChanging(true);
      await router.push(`/${newLocale}`);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <ButtonGroup
      variant="outlined"
      size="small"
      sx={{
        position: "fixed",
        top: 60,
        right: 20,
        zIndex: 1000,
        width: "70px",
        height: "30px",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: "15px",
        overflow: "hidden",
        padding: 0,
        "& .MuiButton-root": {
          minWidth: "35px",
          height: "100%",
          padding: 0,
          border: "none",
          borderRadius: 0,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&.active": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            border: `1px solid ${theme.palette.primary.main}`,
          },
          "&:not(:last-child)": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
          },
        },
      }}
    >
      {isChanging ? (
        <CircularProgress size={20} sx={{ m: "auto" }} />
      ) : (
        <>
          <Button
            onClick={() => handleLanguageChange("tr")}
            className={locale === "tr" ? "active" : ""}
            disabled={isChanging}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: "normal",
                userSelect: "none",
              }}
            >
              TR
            </Box>
          </Button>
          <Button
            onClick={() => handleLanguageChange("en")}
            className={locale === "en" ? "active" : ""}
            disabled={isChanging}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: "normal",
                userSelect: "none",
              }}
            >
              EN
            </Box>
          </Button>
        </>
      )}
    </ButtonGroup>
  );
} 