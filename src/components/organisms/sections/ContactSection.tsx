import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";
import { ContactInfo } from "@/components/molecules/contact/ContactInfo";
import FormField from "@/components/molecules/forms/FormField";
import { memo } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

// Section container stilleri
const sectionStyles = {
  component: "section",
  py: 8,
};

// Grid container stilleri
const gridContainerStyles = {
  spacing: 4,
};

// Card stilleri
const cardStyles = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

// Form container stilleri
const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

// Submit button stilleri
const submitButtonStyles = {
  mt: 2,
  alignSelf: "flex-start",
};

/**
 * İletişim Section Bileşeni
 * 
 * İletişim bilgilerini ve iletişim formunu içeren bölüm.
 * Form gönderimi sonrası başarılı/başarısız durumları Snackbar ile gösterilir.
 * 
 * @returns {JSX.Element} Contact section bileşeni
 */
function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  // Form gönderme işleyicisi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: t("contact.success"),
          severity: "success",
        });
        resetForm();
      } else {
        throw new Error();
      }
    } catch {
      setSnackbar({
        open: true,
        message: t("contact.error"),
        severity: "error",
      });
    }
  };

  // Form alanları değişim işleyicisi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form sıfırlama
  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // Snackbar kapatma işleyicisi
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={sectionStyles}>
      <Grid container sx={gridContainerStyles}>
        {/* İletişim Bilgileri */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyles}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t("sections.contact")}
              </Typography>
              <ContactInfo />
            </CardContent>
          </Card>
        </Grid>

        {/* İletişim Formu */}
        <Grid item xs={12} md={6}>
          <Card
            component="form"
            onSubmit={handleSubmit}
            sx={cardStyles}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t("contact.sendMessage")}
              </Typography>
              <Box sx={formContainerStyles}>
                <FormField
                  label={t("contact.form.name")}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label={t("contact.form.email")}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label={`${t("contact.form.phone")} (${t("contact.form.phoneOptional")})`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <FormField
                  label={t("contact.form.message")}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={submitButtonStyles}
                >
                  {t("contact.form.send")}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bildirim Snackbar'ı */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Bileşeni memo ile sarmalayarak gereksiz render'ları önlüyoruz
export default memo(ContactSection); 