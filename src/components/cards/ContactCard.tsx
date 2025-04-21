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

import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import InfoWithIcon from '@/components/common/InfoWithIcon';
import { memo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import resumeData from '@/config/resume.json';
import { CONTACT_CARD_STYLES } from '@/styles/cards/contactCard.styles';

interface Location {
  tr: string;
  en: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: Location;
}

const contactInfo: ContactInfo = {
  email: resumeData.contact?.email || '',
  phone: resumeData.contact?.phone || '',
  location: resumeData.contact?.location || { tr: '', en: '' },
};

/**
 * İletişim Bilgileri Kartı Bileşeni
 *
 * @returns {JSX.Element} İletişim bilgileri kartı
 */
function ContactCard() {
  const { t, locale } = useTranslation();

  return (
    <Card sx={CONTACT_CARD_STYLES.CARD}>
      <CardHeader
        title={
          <Typography variant="h3" sx={{ ...CONTACT_CARD_STYLES.TITLE }}>
            {t('contact.info')}
          </Typography>
        }
        sx={CONTACT_CARD_STYLES.CARD_HEADER}
      />
      <CardContent>
        <Box sx={CONTACT_CARD_STYLES.CARD_CONTENT}>
          <InfoWithIcon
            icon={FaEnvelope}
            text={contactInfo.email}
            fontSize="1rem"
            aria-label={t('contact.form.email')}
          />
          <InfoWithIcon
            icon={FaPhone}
            text={contactInfo.phone}
            fontSize="1rem"
            aria-label={t('contact.form.phone')}
          />
          <InfoWithIcon
            icon={FaMapMarkerAlt}
            text={contactInfo.location[locale]}
            fontSize="1rem"
            aria-label={t('contact.info')}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(ContactCard);
