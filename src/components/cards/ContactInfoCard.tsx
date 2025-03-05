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

import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import { memo } from "react";

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
    >
      <CardHeader
        title="İletişim Bilgileri"
      />
      <CardContent className="contact-info-content">
        <Box className="section">
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