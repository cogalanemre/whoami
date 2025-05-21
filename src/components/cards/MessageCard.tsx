/**
 * Mesaj Kartı Bileşeni
 *
 * İletişim formunu içeren kart bileşeni.
 * - Form validasyonu
 * - Responsive tasarım
 * - Tema entegrasyonu
 */

import { Card, CardContent, CardHeader, CardActions, TextField, Typography } from '@mui/material';
import { FaPaperPlane } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import { memo, useMemo } from 'react';
import CustomButton from '@/components/common/CustomButton';
import { MESSAGE_CARD_STYLES } from '@/styles/cards/MessageCard.styles';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type ContactFormKey =
  | 'contact.form.name'
  | 'contact.form.email'
  | 'contact.form.phone'
  | 'contact.form.phoneOptional'
  | 'contact.form.message'
  | 'contact.form.send'
  | 'contact.sendMessage';

interface FormField {
  name: keyof FormData;
  label: ContactFormKey;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  isOptional?: boolean;
}

interface MessageCardProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Mesaj Kartı Bileşeni
 *
 * @returns {JSX.Element} Mesaj kartı
 */
function MessageCard({ formData, onChange, onSubmit }: MessageCardProps) {
  const { t } = useTranslation();

  // Form alanları konfigürasyonunu memoize et
  const formFields = useMemo<FormField[]>(() => [
    {
      name: 'name',
      label: 'contact.form.name',
      required: true,
    },
    {
      name: 'email',
      label: 'contact.form.email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'contact.form.phone',
      isOptional: true,
    },
    {
      name: 'message',
      label: 'contact.form.message',
      required: true,
      multiline: true,
      rows: 4,
    },
  ], []);

  return (
    <Card component="form" onSubmit={onSubmit} sx={{ ...MESSAGE_CARD_STYLES.CARD, display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={
          <Typography variant="h3" sx={{ ...MESSAGE_CARD_STYLES.TITLE }}>
            {t('contact.sendMessage')}
          </Typography>
        }
        sx={MESSAGE_CARD_STYLES.CARD_HEADER}
      />

      {/* Form */}
      <CardContent sx={MESSAGE_CARD_STYLES.CARD_CONTENT}>
        {formFields.map(field => (
          <TextField
            key={field.name}
            name={field.name}
            label={
              field.isOptional
                ? `${t(field.label)} (${t('contact.form.phoneOptional')})`
                : t(field.label)
            }
            value={formData[field.name]}
            onChange={onChange}
            required={field.required}
            type={field.type}
            multiline={field.multiline}
            rows={field.rows}
            placeholder={t(field.label)}
            variant="standard"
            InputProps={{
              sx: MESSAGE_CARD_STYLES.INPUT
            }}
          />
        ))}
      </CardContent>

      {/* Submit Button */}
      <CardActions sx={MESSAGE_CARD_STYLES.CARD_ACTIONS}>
        <CustomButton
          type="submit"
          fullWidth
          endIcon={<FaPaperPlane fontSize="small" />}
        >
          {t('contact.form.send')}
        </CustomButton>
      </CardActions>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(MessageCard);
