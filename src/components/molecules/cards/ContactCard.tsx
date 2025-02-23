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

/**
 * Stil sabitleri
 */
const STYLES = {
  CARD: {
    background: "background.paper",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    height: "100%",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
  },
  HEADER: {
    p: 3,
  },
  TITLE: {
    color: "primary.main",
    fontWeight: "bold",
  },
  CONTENT: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  SECTION: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
} as const;

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
    <Card sx={STYLES.CARD}>
      {/* Başlık Bölümü */}
      <Box sx={{
        ...STYLES.HEADER,
        background: isDarkMode
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(0, 0, 0, 0.03)",
        backdropFilter: "blur(4px)",
      }}>
        {/* Başlık */}
        <Typography variant="h6" sx={STYLES.TITLE}>
          {locale === "tr" ? "İletişim Bilgileri" : "Contact Information"}
        </Typography>
      </Box>

      {/* İletişim Bilgileri */}
      <CardContent sx={{ p: 3 }}>
        <Box sx={STYLES.CONTENT}>
          {/* İletişim Bilgileri */}
          <Box sx={STYLES.SECTION}>
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