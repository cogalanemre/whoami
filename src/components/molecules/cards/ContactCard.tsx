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

import { Box, Card, Typography } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import { ContactInfoCardStyles } from "@/styles/components/cards/ContactInfoCard.styles";
import { memo } from "react";

/**
 * İletişim Bilgileri Kartı Bileşeni
 * 
 * @returns {JSX.Element} İletişim bilgileri kartı
 */
function ContactCard() {
  return (
    <Card sx={ContactInfoCardStyles.card}>
      <Box sx={ContactInfoCardStyles.header}>
        <Typography variant="h6" sx={ContactInfoCardStyles.title}>
          İletişim Bilgileri
        </Typography>
      </Box>
      <Box sx={ContactInfoCardStyles.content}>
        <Box sx={ContactInfoCardStyles.section}>
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
      </Box>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ContactCard); 