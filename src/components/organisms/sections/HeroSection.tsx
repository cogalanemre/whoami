import { Box, Stack, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { Hero } from "@/types";
import Typewriter from "@/components/atoms/typography/Typewriter";
import SocialMediaButtons from "@/components/molecules/buttons/SocialMediaButtons";

const MotionBox = motion.create(Box);

interface HeroSectionProps {
  hero: Hero;
  locale: "tr" | "en";
}

export default function HeroSection({ hero, locale }: HeroSectionProps) {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: {
            xs: "calc(100vh - 96px)",
            md: "calc(100vh - 128px)",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          sx={{
            position: "relative",
            pb: { xs: 8, md: 12 },
            maxWidth: "1200px",
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
          }}
        >
          <Avatar
            sx={{
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
            }}
            alt={hero.name}
            src={hero.avatar}
          />
          <Box
            sx={{
              pt: 1,
              width: "100%",
              textAlign: { xs: "center", md: "left" },
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                mb: 1,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                textAlign: { xs: "center", md: "left" },
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
                color: "primary.main",
              }}
            >
              {hero.name}
            </Typography>
            <Box
              sx={{
                minHeight: "60px",
                textAlign: { xs: "center", md: "left" },
                mb: 1,
              }}
            >
              <Typewriter
                texts={hero.titles[locale]}
                delay={150}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                position: "absolute",
                bottom: { xs: -60, md: -70 },
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
              }}
            ></Box>
          </Box>
        </Stack>
      </MotionBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: -4, md: -6 },
          mb: { xs: 4, md: 6 },
        }}
      >
        <SocialMediaButtons socialMedia={hero.socialMedia} />
      </Box>
    </>
  );
} 