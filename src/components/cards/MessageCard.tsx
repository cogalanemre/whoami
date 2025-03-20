/**
 * Mesaj Kartı Bileşeni
 * 
 * İletişim formunu içeren kart bileşeni.
 * - Form validasyonu
 * - Responsive tasarım
 * - Tema entegrasyonu
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useTranslation } from "@/hooks/useTranslation";
import { memo } from "react";
import CustomButton from "@/components/common/CustomButton";
import { THEME_STYLE } from "@/theme/theme";

const STYLE = {
  CARD: {
    ...THEME_STYLE.CARD,
    p: 0,
  },  
  CARD_HEADER: {
    ...THEME_STYLE.CARD_HEADER,
  },
  TITLE: {
    ...THEME_STYLE.TITLE,
  },
  CARD_CONTENT: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
  },
  CARD_ACTIONS: {
    p: 3,
    pt: 0,
  },
} as const;

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type ContactFormKey = 
  | "contact.form.name"
  | "contact.form.email"
  | "contact.form.phone"
  | "contact.form.phoneOptional"
  | "contact.form.message"
  | "contact.form.send"
  | "contact.sendMessage";

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
  isSubmitting?: boolean;
}

/**
 * Mesaj Kartı Bileşeni
 * 
 * @returns {JSX.Element} Mesaj kartı
 */
function MessageCard({ formData, onChange, onSubmit, isSubmitting = false }: MessageCardProps) {
  const { t } = useTranslation();

  // Form alanları konfigürasyonu
  const formFields: FormField[] = [
    {
      name: "name",
      label: "contact.form.name",
      required: true,
    },
    {
      name: "email",
      label: "contact.form.email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      label: "contact.form.phone",
      isOptional: true,
    },
    {
      name: "message",
      label: "contact.form.message",
      required: true,
      multiline: true,
      rows: 4,
    },
  ];

  return (
    <Card
      component="form"
      onSubmit={onSubmit}
      sx={STYLE.CARD}
    >
      <CardHeader
        title={
          <Typography variant="h3" sx={{...STYLE.TITLE}}>
            {t("contact.sendMessage")}
          </Typography>
        }       
        sx={STYLE.CARD_HEADER}
      />

      {/* Form */}
      <CardContent sx={STYLE.CARD_CONTENT}>
        {formFields.map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            label={field.isOptional 
              ? `${t(field.label)} (${t("contact.form.phoneOptional")})`
              : t(field.label)
            }
            value={formData[field.name]}
            onChange={onChange}
            required={field.required}
            type={field.type}
            multiline={field.multiline}
            rows={field.rows}
            placeholder={t(field.label)}
          />
        ))}
      </CardContent>

      {/* Submit Button */}
      <CardActions sx={STYLE.CARD_ACTIONS}>
        <CustomButton
          type="submit"
          loading={isSubmitting}
          fullWidth
          endIcon={<Send fontSize="small" />}
        >
          {t("contact.form.send")}
        </CustomButton>
      </CardActions>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(MessageCard); 