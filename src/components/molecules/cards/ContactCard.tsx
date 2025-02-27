/**
 * İletişim Kartı Bileşeni
 * 
 * Kullanıcının iletişim bilgilerini gösteren kart bileşeni.
 * Özellikler:
 * - İletişim bilgileri (e-posta, telefon, konum)
 * - Responsive tasarım
 * - Hover animasyonları
 * - Tema renk entegrasyonu
 * - Erişilebilirlik özellikleri
 * 
 * @component
 */

import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { 
  Email, 
  Phone, 
  LocationOn,
} from "@mui/icons-material";
import { useTranslation } from "@/hooks/useTranslation";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import resumeData from "@/config/resume.json";
import { memo } from "react";
import { useTheme } from "@mui/material/styles";
import { ContactInfoCardStyles } from "@/styles/components/cards/ContactInfoCard.styles";

/**
 * İletişim Kartı Bileşeni
 * 
 * @returns {JSX.Element} İletişim kartı
 */
function ContactCard() {
  const { locale } = useTranslation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // İletişim bilgilerini al
  const contact = resumeData.contact;

  return (
    <Card sx={ContactInfoCardStyles.card}>
      {/* Başlık Bölümü */}
      <Box sx={ContactInfoCardStyles.header}>
        {/* Başlık */}
        <Typography variant="h6" sx={ContactInfoCardStyles.title}>
          {locale === "tr" ? "İletişim Bilgileri" : "Contact Information"}
        </Typography>
      </Box>

      {/* İletişim Bilgileri */}
      <CardContent sx={{ p: 3 }}>
        <Box sx={ContactInfoCardStyles.content}>
          {/* İletişim Bilgileri */}
          <Box sx={ContactInfoCardStyles.section}>
            {/* E-posta */}
            <InfoWithIcon
              icon={Email}
              text={contact.email}
              fontSize="1rem"
            />

            {/* Telefon */}
            <InfoWithIcon
              icon={Phone}
              text={contact.phone}
              fontSize="1rem"
            />

            {/* Konum */}
            <InfoWithIcon
              icon={LocationOn}
              text={locale === "tr" ? contact.location.tr : contact.location.en}
              fontSize="1rem"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ContactCard); 