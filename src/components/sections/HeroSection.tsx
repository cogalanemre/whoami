import { Box, Stack, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Hero } from "@/types";
import Typewriter from "@/components/common/Typewriter";
import SocialMediaButtons from "@/components/common/SocialMediaButtons";
import { memo } from "react";
import {
  heroContainerStyles,
  stackStyles,
  avatarStyles,
  contentBoxStyles,
  nameStyles,
  typewriterContainerStyles,
  socialButtonsContainerStyles,
} from "./HeroSection.style";

const MotionBox = motion(Box);

interface HeroSectionProps {
  hero: Hero;
  locale: "tr" | "en";
}

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
        <Stack sx={stackStyles}>
          <Avatar
            sx={avatarStyles}
            alt={hero.name}
            src={hero.avatar}
          />
          <Box sx={contentBoxStyles}>
            <Typography
              variant="h1"
              sx={nameStyles}
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