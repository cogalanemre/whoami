import { Box, Stack, Typography, Avatar } from '@mui/material';
import { Hero } from '@/types';
import Typewriter from '@/components/common/Typewriter';
import SocialMediaButtons from '@/components/common/SocialMediaButtons';
import { memo } from 'react';

const ALIGNMENT = {
  xs: 'center',
  md: 'left',
} as const;

const AVATAR_SIZES = {
  xs: 200,
  sm: 250,
  md: 300,
} as const;

const HEADER_HEIGHTS = {
  xs: 96,
  md: 128,
} as const;

const STYLE = {
  HERO_CONTAINER: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: {
      xs: `calc(100vh - ${HEADER_HEIGHTS.xs}px)`,
      md: `calc(100vh - ${HEADER_HEIGHTS.md}px)`,
    },
  },
  AVATAR: {
    width: AVATAR_SIZES,
    height: AVATAR_SIZES,
    bgcolor: 'transparent',
    alignSelf: 'center',
    ml: { md: 8 },
  },
  STACK: {
    position: 'relative',
    pb: { xs: 8, md: 12 },
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { xs: 'center', md: 'flex-start' },
    alignItems: 'center',
    gap: { xs: 4, md: 8 },
    px: { xs: 2, md: 4 },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: '0.5px',
      background: theme =>
        `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    },
  },
  CONTENT_BOX: {
    textAlign: ALIGNMENT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', md: 'flex-start' },
    gap: 2,
  },
  NAME: {
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
    textAlign: ALIGNMENT,
    fontWeight: 'normal',
    fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    justifyContent: { xs: 'center', md: 'flex-start' },
    color: 'primary.main',
  },
  TYPEWRITER_CONTAINER: {
    minHeight: '60px',
    textAlign: ALIGNMENT,
    width: '100%',
  },
  SOCIAL_BUTTONS_CONTAINER: {
    display: 'flex',
    justifyContent: 'center',
    mt: { xs: -4, md: -6 },
    mb: { xs: 4, md: 6 },
  },
} as const;

interface HeroSectionProps {
  hero: Hero;
  locale: 'tr' | 'en';
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
      <Box sx={STYLE.HERO_CONTAINER}>
        <Stack sx={STYLE.STACK}>
          <Avatar sx={STYLE.AVATAR} alt={hero.name} src={hero.avatar} />
          <Box sx={STYLE.CONTENT_BOX}>
            <Typography variant="h1" sx={STYLE.NAME}>
              {hero.name}
            </Typography>
            <Box sx={STYLE.TYPEWRITER_CONTAINER}>
              <Typewriter texts={titles} delay={150} />
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box sx={STYLE.SOCIAL_BUTTONS_CONTAINER}>
        <SocialMediaButtons socialMedia={hero.socialMedia} />
      </Box>
    </>
  );
}

export default memo(HeroSection);
