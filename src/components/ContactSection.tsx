import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { LocationOn, Phone, Email, Send } from "@mui/icons-material";
import { personalInfo } from "@/data/personalInfo";
import { useState } from "react";
import { ContactFormData } from "@/types";
import { colors } from "@/theme/colors";

interface ContactSectionProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function ContactSection({
  onSubmit,
  isLoading,
}: ContactSectionProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;

  const [loading, setLoading] = useState(isLoading);
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
      await onSubmit(formData);

      setSnackbar({
        open: true,
        message: "Mesajınız başarıyla gönderildi!",
        severity: "success",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("E-posta gönderirken hata oluştu:", error);
      setSnackbar({
        open: true,
        message:
          "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const inputProps = {
    sx: {
      "& .MuiInput-underline:before": {
        borderBottomColor: currentColors.primary,
      },
      "& .MuiInput-underline:hover:before": {
        borderBottomColor: currentColors.primary,
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: currentColors.primary,
      },
      "& .MuiInputLabel-root": {
        color: currentColors.secondary,
        "&.Mui-focused": {
          color: currentColors.primary,
        },
      },
      "& .MuiInput-input": {
        color: currentColors.secondary,
        "&::placeholder": {
          color: currentColors.secondary,
          opacity: 0.7,
        },
        "&:hover": {
          color: currentColors.primary,
        },
      },
    },
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              background: currentColors.surface,
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border: `1px solid ${currentColors.surface}`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderColor: currentColors.primary,
                transform: "translateY(-4px)",
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: currentColors.primary, mb: 4 }}
            >
              İletişim Bilgileri
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
              <LocationOn sx={{ color: currentColors.primary }} />
              <Typography color={currentColors.secondary}>
                {personalInfo.contact.address}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
              <Phone sx={{ color: currentColors.primary }} />
              <Typography color={currentColors.secondary}>
                {personalInfo.contact.phone}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
              <Email sx={{ color: currentColors.primary }} />
              <Typography color={currentColors.secondary}>
                {personalInfo.contact.email}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              background: currentColors.surface,
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border: `1px solid ${currentColors.surface}`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderColor: currentColors.primary,
                transform: "translateY(-4px)",
                boxShadow: `0 4px 20px ${currentColors.primary}20`,
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: currentColors.primary, mb: 4 }}
            >
              Mesaj Gönder
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Ad Soyad"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="standard"
                {...inputProps}
              />

              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="standard"
                {...inputProps}
              />

              <TextField
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Opsiyonel"
                fullWidth
                variant="standard"
                {...inputProps}
              />

              <TextField
                label="Mesajınız"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                variant="standard"
                {...inputProps}
              />

              <Button
                type="submit"
                variant="outlined"
                size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  borderColor: currentColors.primary,
                  color: currentColors.primary,
                  "&:hover": {
                    borderColor: currentColors.primary,
                    backgroundColor: `${currentColors.primary}10`,
                  },
                }}
              >
                {loading ? "Gönderiliyor..." : "Gönder"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
