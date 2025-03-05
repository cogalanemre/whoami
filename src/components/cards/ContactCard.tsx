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
 * - Çoklu dil desteği
 */

import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import { memo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import resumeData from "@/config/resume.json";

interface Location {
  tr: string;
  en: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  location: Location;
}

/**
 * İletişim Bilgileri Kartı Bileşeni
 * 
 * @returns {JSX.Element} İletişim bilgileri kartı
 */
function ContactCard() {
  const { t, locale } = useTranslation();
  const contactInfo: ContactInfo = {
    email: resumeData.contact.email,
    phone: resumeData.contact.phone,
    location: resumeData.contact.location
  };

  return (
    <Card>
      <CardHeader
        title={t("sections.contact")}
      />
      <CardContent>
        <Box className="contact-info">
          <InfoWithIcon
            icon={Email}
            text={contactInfo.email}
            fontSize="1rem"
            aria-label={t("contact.form.email")}
          />
          <InfoWithIcon
            icon={Phone}
            text={contactInfo.phone}
            fontSize="1rem"
            aria-label={t("contact.form.phone")}
          />
          <InfoWithIcon
            icon={LocationOn}
            text={contactInfo.location[locale]}
            fontSize="1rem"
            aria-label={t("contact.info")}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ContactCard); 