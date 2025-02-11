"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, ButtonGroup, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";

export default function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const currentLang = (params?.lang as string) || "tr";

  const changeLanguage = (locale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(tr|en)/, `/${locale}`);
    router.push(newPath);
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
        width: "60px",
        height: "30px",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: "15px",
        overflow: "hidden",
        padding: 0,
        "& .MuiButton-root": {
          minWidth: "30px",
          width: "30px",
          height: "100%",
          padding: 0,
          border: "none",
          borderRadius: 0,
          color: currentColors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: `${currentColors.primary}10`,
            border: "none",
          },
          "&.active": {
            backgroundColor: currentColors.primary,
            color: currentColors.background,
            border: `1px solid ${currentColors.primary}`,
            "&:hover": {
              backgroundColor: currentColors.primary,
            },
          },
          "&:not(:last-child)": {
            borderRight: `2px solid ${currentColors.primary}`,
          },
        },
      }}
    >
      <Button
        onClick={() => changeLanguage("tr")}
        className={currentLang === "tr" ? "active" : ""}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.6rem",
            fontWeight: "bold",
            userSelect: "none",
            ml: 0.5,
          }}
        >
          TR
        </Box>
      </Button>
      <Button
        onClick={() => changeLanguage("en")}
        className={currentLang === "en" ? "active" : ""}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.6rem",
            fontWeight: "bold",
            userSelect: "none",
            mr: 0.5,
          }}
        >
          EN
        </Box>
      </Button>
    </ButtonGroup>
  );
}
