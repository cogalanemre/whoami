/**
 * Mesaj Kartı Bileşeni
 * 
 * İletişim formunu içeren kart bileşeni.
 * Özellikler:
 * - İsim, e-posta, telefon ve mesaj alanları
 * - Form validasyonu
 * - Responsive tasarım
 * - Hover animasyonları
 * - Tema renk entegrasyonu
 * 
 * @component
 */

import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";
import FormField from "@/components/molecules/forms/FormField";
import { memo } from "react";

/**
 * Stil sabitleri
 */
const STYLES = {
  CARD: {
    background: "background.paper",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    height: "100%",
    border: "none",
    boxShadow: theme => theme.palette.mode === "dark"
      ? "0 0 20px rgba(255,255,255,0.05)"
      : "0 0 20px rgba(0,0,0,0.05)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme => theme.palette.mode === "dark"
        ? "0 4px 25px rgba(255,255,255,0.1)"
        : "0 4px 25px rgba(0,0,0,0.1)",
    },
  },
  HEADER: {
    p: 4,
    pb: 2,
    borderBottom: "2px solid",
    borderColor: theme => theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.05)",
  },
  TITLE: {
    color: "primary.main",
    fontWeight: 600,
    fontSize: "1.5rem",
    letterSpacing: "-0.5px",
  },
  FORM: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  SUBMIT: {
    mt: 3,
    alignSelf: "stretch",
    borderRadius: "12px",
    py: 2,
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 500,
    letterSpacing: "0.5px",
    boxShadow: "none",
    background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 4px 15px rgba(36, 151, 255, 0.2)",
      transform: "translateY(-2px)",
    },
  },
  FIELD: {
    position: "relative",
    "& .MuiInputBase-root": {
      transition: "all 0.2s ease-in-out",
      "&::before": {
        borderBottom: "1px solid",
        borderColor: theme => theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.2)"
          : "rgba(0,0,0,0.2)",
      },
      "&::after": {
        borderBottom: "2px solid",
        borderColor: "primary.main",
      },
      "&:hover:not(.Mui-disabled)::before": {
        borderColor: "primary.main",
      },
    },
    "& .MuiInputLabel-root": {
      color: "text.secondary",
      "&.Mui-focused": {
        color: "primary.main",
      },
    },
    "& .MuiInput-input": {
      padding: "8px 0",
      fontSize: "1rem",
      "&::placeholder": {
        color: "text.secondary",
        opacity: 0.5,
      },
    },
    // Çok satırlı alan için özel stiller
    "& .MuiInputBase-multiline": {
      padding: "8px 0",
    },
  },
} as const;

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
}

/**
 * Mesaj Kartı Bileşeni
 * 
 * @returns {JSX.Element} Mesaj kartı
 */
function MessageCard({ formData, onChange, onSubmit }: MessageCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      component="form"
      onSubmit={onSubmit}
      sx={STYLES.CARD}
      elevation={0}
    >
      {/* Başlık Bölümü */}
      <Box sx={STYLES.HEADER}>
        <Typography variant="h5" sx={STYLES.TITLE}>
          {t("contact.sendMessage")}
        </Typography>
      </Box>

      {/* Form */}
      <CardContent sx={{ p: 4, pt: 4 }}>
        <Box sx={STYLES.FORM}>
          <FormField
            label={t("contact.form.name")}
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            variant="standard"
            sx={STYLES.FIELD}
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
            sx={STYLES.FIELD}
            placeholder={t("contact.form.email")}
          />
          <FormField
            label={`${t("contact.form.phone")} (${t("contact.form.phoneOptional")})`}
            name="phone"
            value={formData.phone}
            onChange={onChange}
            variant="standard"
            sx={STYLES.FIELD}
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
            sx={STYLES.FIELD}
            placeholder={t("contact.form.message")}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={STYLES.SUBMIT}
          >
            {t("contact.form.send")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// Gereksiz render'ları önlemek için memo kullan
export default memo(MessageCard); 