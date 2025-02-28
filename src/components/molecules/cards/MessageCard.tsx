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
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useTranslation } from "@/hooks/useTranslation";
import FormField from "@/components/molecules/forms/FormField";
import { memo } from "react";
import CustomButton from "@/components/atoms/buttons/CustomButton";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
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

  return (
    <Card
      elevation={0}
      variant="outlined"
      component="form"
      onSubmit={onSubmit}
    >
      <CardHeader
        title={t("contact.sendMessage")}
      />

      {/* Form */}
      <CardContent>
        <FormField
          label={t("contact.form.name")}
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          variant="standard"
          placeholder={t("contact.form.name")}
        />
        <FormField
          label={t("contact.form.email")}
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
          variant="standard"
          placeholder={t("contact.form.email")}
        />
        <FormField
          label={`${t("contact.form.phone")} (${t("contact.form.phoneOptional")})`}
          name="phone"
          value={formData.phone}
          onChange={onChange}
          variant="standard"
          placeholder={t("contact.form.phone")}
        />
        <FormField
          label={t("contact.form.message")}
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          multiline
          rows={4}
          variant="standard"
          placeholder={t("contact.form.message")}
        />
      </CardContent>

      {/* Submit Button */}
      <CardActions>
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