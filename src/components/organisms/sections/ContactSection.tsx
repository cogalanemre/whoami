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

export default function ContactSection() {
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
        setFormData({ name: "", email: "", phone: "", message: "" });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box component="section" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t("sections.contact")}
              </Typography>
              <ContactInfo />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            component="form"
            onSubmit={handleSubmit}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t("contact.sendMessage")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <FormField
                  label={t("contact.form.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label={t("contact.form.email")}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label={`${t("contact.form.phone")} (${t("contact.form.phoneOptional")})`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <FormField
                  label={t("contact.form.message")}
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
                  sx={{
                    mt: 2,
                    alignSelf: "flex-start",
                  }}
                >
                  {t("contact.form.send")}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 