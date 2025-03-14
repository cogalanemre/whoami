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
  SxProps,
  Theme,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useTranslation } from "@/hooks/useTranslation";
import { memo } from "react";
import CustomButton from "@/components/common/CustomButton";

// Kart stilleri
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
    boxShadow: (theme) => `0 4px 20px ${theme.palette.shadow.default}`,
    borderColor: 'border.hover',
  },
};

// Kart başlık stilleri
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

// Form konteynır stilleri
const formContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 3,
};

// Form aksiyon konteynır stilleri
const formActionsStyles: SxProps<Theme> = {
  padding: 3,
  pt: 0,
};

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
      sx={cardStyles}
    >
      <CardHeader
        title={t("contact.sendMessage")}
        sx={cardHeaderStyles}
      />

      {/* Form */}
      <CardContent sx={formContainerStyles}>
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
      <CardActions sx={formActionsStyles}>
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