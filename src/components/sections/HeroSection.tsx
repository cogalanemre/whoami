import { Box, Stack, Typography, Avatar } from '@mui/material';
import { Hero } from '@/types';
import Typewriter from '@/components/common/Typewriter';
import ActionButtons from '@/components/common/ActionButtons';
import { memo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { heroSectionStyles as STYLE } from '@/styles/sections/HeroSection.styles';

interface HeroSectionProps {
  hero: Hero;
}

/**
 * Hero Section Bileşeni
 *
 * Sayfanın en üst kısmında yer alan, kullanıcının profil bilgilerini ve
 * sosyal medya bağlantılarını gösteren ana bölüm.
 *
 * @param {Hero} hero - Kullanıcı profil bilgileri
 * @returns {JSX.Element} Hero section bileşeni
 */
function HeroSection({ hero }: HeroSectionProps) {
  // Context'ten lang değerini al
  const { lang } = useAppContext();

  const titles = hero.titles[lang];

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
        <ActionButtons socialMedia={hero.socialMedia} />
      </Box>
    </>
  );
}

export default memo(HeroSection);
