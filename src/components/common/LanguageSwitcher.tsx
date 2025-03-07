"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const LanguageSwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z M10 4v1M10 15v1M4 10h1M15 10h1M5.5 5.5l.7.7M13.8 13.8l.7.7M13.8 5.5l-.7.7M5.5 13.8l-.7.7"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#2497ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#003892',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z M6 10h8M10 6v8"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#2497ff',
    borderRadius: 20 / 2,
  },
}));

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
    <Box
      sx={{
        position: "fixed",
        top: { xs: 60, md: 70 },
        right: { xs: 16, md: 20 },
        zIndex: 1000,
      }}
    >
      <LanguageSwitch
        checked={locale === "en"}
        onChange={handleLanguageChange}
      />
    </Box>
  );
} 