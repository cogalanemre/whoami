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
} from "@mui/material";
import { LocationOn, Phone, Email, Send } from "@mui/icons-material";
import { useState } from "react";
import { ContactFormData } from "@/types";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTranslation } from "@/hooks/useTranslation";
import resumeData from "@/config/resume.json";

interface ContactSectionProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function ContactSection({
  onSubmit,
  isLoading,
}: ContactSectionProps) {
  const colors = useThemeColors();
  const { t, locale } = useTranslation();
  const commonTranslations = t("common");

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
        message: commonTranslations.contact.success,
        severity: "success",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
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
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              background: colors.surface,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: colors.primary,
                mb: 3,
                fontWeight: "bold",
              }}
            >
              {commonTranslations.contact.info}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LocationOn sx={{ color: colors.primary }} />
                <Typography sx={{ color: colors.secondary }}>
                  {resumeData.personalInfo.location[locale]}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Phone sx={{ color: colors.primary }} />
                <Typography sx={{ color: colors.secondary }}>
                  {resumeData.personalInfo.contact.phone}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Email sx={{ color: colors.primary }} />
                <Typography sx={{ color: colors.secondary }}>
                  {resumeData.personalInfo.contact.email}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              background: colors.surface,
            }}
          >
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
              <TextField
                label={commonTranslations.contact.form.name}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.secondary,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.secondary,
                  },
                }}
              />

              <TextField
                label={commonTranslations.contact.form.email}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.secondary,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.secondary,
                  },
                }}
              />

              <TextField
                label={`${commonTranslations.contact.form.phone} (${commonTranslations.contact.form.phoneOptional})`}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.secondary,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.secondary,
                  },
                }}
              />

              <TextField
                label={commonTranslations.contact.form.message}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                multiline
                rows={4}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.secondary,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.secondary,
                  },
                }}
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
          </Paper>
        </Grid>
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
