import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useTranslation();

  const handleLanguageChange = () => {
    const newLocale = locale === "tr" ? "en" : "tr";
    router.push(`/${newLocale}`);
  };

  return (
    <IconButton
      onClick={handleLanguageChange}
      sx={{
        border: "2px solid",
        borderColor: "primary.main",
        color: "primary.main",
        backdropFilter: "blur(4px)",
        "&:hover": {
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      {locale === "tr" ? "EN" : "TR"}
    </IconButton>
  );
} 