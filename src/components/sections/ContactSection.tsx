import { useState } from "react";
import {
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { ContactPhone } from "@mui/icons-material";
import { useTranslation } from "@/hooks/useTranslation";
import { memo } from "react";
import ContactCard from "@/components/cards/ContactCard";
import SocialMediaCard from "@/components/cards/SocialMediaCard";
import MessageCard from "@/components/cards/MessageCard";
import SectionTitle from "@/components/common/SectionTitle";

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

const STYLES = {
  SECTION: {
    py: 8,
  },
  CONTAINER: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", md: "row" },
  },
  SIDE_BOX: {
    width: { xs: "100%", md: "48%" },
  },
  LEFT_CONTENT: {
    display: "flex",
    flexDirection: "column",
    gap: { xs: 4, md: 8 },
  },
} as const;

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
    <Box sx={STYLES.SECTION}>
      {/* Bölüm Başlığı */}
      <SectionTitle
        icon={ContactPhone}
        title={t("sections.contact")}
      />

      <Box sx={STYLES.CONTAINER}>
        {/* Sol Taraf: İletişim Bilgileri ve Sosyal Medya */}
        <Box sx={STYLES.SIDE_BOX}>
          <Box sx={STYLES.LEFT_CONTENT}>
            {/* İletişim Bilgileri */}
            <Box>
              <ContactCard />
            </Box>

            {/* Sosyal Medya Bağlantıları */}
            <Box>
              <SocialMediaCard />
            </Box>
          </Box>
        </Box>

        {/* Sağ Taraf: İletişim Formu */}
        <Box sx={STYLES.SIDE_BOX}>
          <MessageCard
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Box>
      </Box>

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