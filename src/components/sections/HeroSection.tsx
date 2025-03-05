import { Box, Stack, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Hero } from "@/types";
import Typewriter from "@/components/common/Typewriter";
import SocialMediaButtons from "@/components/common/SocialMediaButtons";
import { memo } from "react";

const MotionBox = motion(Box);

interface HeroSectionProps {
  hero: Hero;
  locale: "tr" | "en";
}

const heroContainerStyles = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: {
    xs: "calc(100vh - 96px)",
    md: "calc(100vh - 128px)",
  },
};

const stackStyles = {
  position: "relative",
  pb: { xs: 8, md: 12 },
  width: "100%",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    height: "2px",
    background: (theme) =>
      `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
  },
};

const avatarStyles = {
  width: { xs: 200, sm: 250, md: 300 },
  height: { xs: 200, sm: 250, md: 300 },
  mx: { xs: "auto", md: 0 },
  mb: { xs: 4, md: 0 },
  bgcolor: "transparent",
  alignSelf: "center",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
};

const contentBoxStyles = {
  pt: 1,
  width: "100%",
  flex: 1,
  textAlign: { xs: "center", md: "left" },
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const titleStyles = {
  mb: 1,
  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
  textAlign: { xs: "center", md: "left" },
  fontWeight: "normal",
  display: "flex",
  alignItems: "center",
  gap: 2,
  justifyContent: { xs: "center", md: "flex-start" },
  color: "primary.main",
};

const typewriterContainerStyles = {
  minHeight: "60px",
  textAlign: { xs: "center", md: "left" },
  mb: 1,
};

const socialButtonsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  mt: { xs: -4, md: -6 },
  mb: { xs: 4, md: 6 },
};

/**
 * Hero Section Bileşeni
 * 
 * Sayfanın en üst kısmında yer alan, kullanıcının profil bilgilerini ve
 * sosyal medya bağlantılarını gösteren ana bölüm.
 * 
 * @param {Hero} hero - Kullanıcı profil bilgileri
 * @param {string} locale - Aktif dil (tr/en)
 * @returns {JSX.Element} Hero section bileşeni
 */
function HeroSection({ hero, locale }: HeroSectionProps) {
  const titles = hero.titles[locale];

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={heroContainerStyles}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          sx={stackStyles}
        >
          <Avatar
            sx={avatarStyles}
            alt={hero.name}
            src={hero.avatar}
          />
          <Box sx={contentBoxStyles}>
            <Typography
              variant="h1"
              gutterBottom
              sx={titleStyles}
            >
              {hero.name}
            </Typography>
            <Box sx={typewriterContainerStyles}>
              <Typewriter
                texts={titles}
                delay={150}
              />
            </Box>
          </Box>
        </Stack>
      </MotionBox>
      <Box sx={socialButtonsContainerStyles}>
        <SocialMediaButtons socialMedia={hero.socialMedia} />
      </Box>
    </>
  );
}

export default memo(HeroSection); 