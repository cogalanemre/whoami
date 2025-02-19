import {
  Box,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { LocationOn, Phone, Email, Send } from "@mui/icons-material";
import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTranslation } from "@/hooks/useTranslation";
import resumeData from "@/config/resume.json";
import config from "@/config/config.json";
import emailjs from '@emailjs/browser';
import { FORM_CONFIG } from "@/constants";
import CardBase from "@/components/molecules/cards/CardBase";
import FormField from "@/components/molecules/forms/FormField";
import InfoWithIcon from "@/components/atoms/icons/InfoWithIcon";
import SectionTitle from "@/components/atoms/typography/SectionTitle";

export default function ContactSection() {
  const colors = useThemeColors();
  const { t, locale } = useTranslation();
  const commonTranslations = t("common");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        FORM_CONFIG.EMAIL_SERVICE,
        FORM_CONFIG.EMAIL_TEMPLATE,
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          message: formData.message,
        },
        FORM_CONFIG.EMAIL_PUBLIC_KEY
      );
      
      setSnackbar({
        open: true,
        message: commonTranslations.contact.success,
        severity: "success",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('Email gönderimi başarısız:', error);
      setSnackbar({
        open: true,
        message: commonTranslations.contact.error,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {config.features.sections.contact.showContactInfo && (
          <Grid item xs={12} md={6}>
            <CardBase>
              <Box sx={{ p: 3 }}>
                <SectionTitle
                  icon={Email}
                  title={commonTranslations.contact.info}
                />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <InfoWithIcon
                    icon={LocationOn}
                    text={resumeData.personalInfo.location[locale]}
                    colors={colors}
                  />

                  <InfoWithIcon
                    icon={Phone}
                    text={resumeData.personalInfo.contact.phone}
                    colors={colors}
                  />

                  <InfoWithIcon
                    icon={Email}
                    text={resumeData.personalInfo.contact.email}
                    colors={colors}
                  />
                </Box>
              </Box>
            </CardBase>
          </Grid>
        )}

        {config.features.sections.contact.showMessageForm && (
          <Grid item xs={12} md={config.features.sections.contact.showContactInfo ? 6 : 12}>
            <CardBase component="form" onSubmit={handleSubmit}>
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.primary,
                    mb: 3,
                    fontWeight: "bold",
                  }}
                >
                  {commonTranslations.contact.sendMessage}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <FormField
                    label={commonTranslations.contact.form.name}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <FormField
                    label={commonTranslations.contact.form.email}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <FormField
                    label={`${commonTranslations.contact.form.phone} (${commonTranslations.contact.form.phoneOptional})`}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  <FormField
                    label={commonTranslations.contact.form.message}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    multiline
                    rows={4}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      bgcolor: colors.primary,
                      color: colors.surface,
                      "&:hover": {
                        bgcolor: colors.primary,
                        opacity: 0.9,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        <Send sx={{ mr: 1 }} />
                        {commonTranslations.contact.form.send}
                      </>
                    )}
                  </Button>
                </Box>
              </Box>
            </CardBase>
          </Grid>
        )}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 