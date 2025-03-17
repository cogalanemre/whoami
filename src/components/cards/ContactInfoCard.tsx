/**
 * İletişim Bilgileri Kartı Bileşeni
 * 
 * Kullanıcının iletişim bilgilerini (e-posta, telefon, konum) gösteren kart bileşeni.
 * 
 * Özellikler:
 * - Duyarlı tasarım
 * - Hover animasyonları
 * - Tema renk entegrasyonu
 * - Erişilebilirlik özellikleri
 */

import { Box, Card, CardContent, CardHeader, SxProps, Theme } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import { memo } from "react";

// Stil tanımlamaları
const cardStyles: SxProps<Theme> = {
  bgcolor: 'background.paper',
  borderRadius: '16px',
  position: "relative",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: '0.5px solid',
  borderColor: 'border.default',
  '&:hover': {
    transform: "translateY(-4px)",
    borderColor: 'border.hover',
  },
};

const cardHeaderStyles: SxProps<Theme> = {
  padding: '24px',
  backdropFilter: 'blur(4px)',
  borderBottom: '0.5px solid',
  borderColor: 'border.default',
  '& .MuiCardHeader-title': {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: 1.3,
    transition: "all 0.2s ease-in-out",
  },
};

const contactInfoContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 3,
};

const sectionStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

/**
 * İletişim Bilgileri Kartı Bileşeni
 * 
 * @returns {JSX.Element} İletişim bilgileri kartı
 */
function ContactCard() {
  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={cardStyles}
    >
      <CardHeader
        title="İletişim Bilgileri"
        sx={cardHeaderStyles}
      />
      <CardContent sx={contactInfoContentStyles}>
        <Box sx={sectionStyles}>
          <InfoWithIcon
            icon={Email}
            text="emre.cogalan@gmail.com"
            fontSize="1rem"
          />
          <InfoWithIcon
            icon={Phone}
            text="+90 (532) 162-7626"
            fontSize="1rem"
          />
          <InfoWithIcon
            icon={LocationOn}
            text="İstanbul, Türkiye"
            fontSize="1rem"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ContactCard); 