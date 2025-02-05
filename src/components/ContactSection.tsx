import { Box, Grid, Typography, Paper, TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { LocationOn, Phone, Email, Send } from '@mui/icons-material';
import { personalInfo } from '@/data/personalInfo';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Belirtilmedi',
        message: formData.message,
        to_name: personalInfo.name,
        to_email: personalInfo.contact.email
      };

      await emailjs.send(
        'service_0v280wa',
        'template_d6vbew4',
        templateParams,
        'VbqA_ubqPCM6yAkLQ'
      );

      setSnackbar({
        open: true,
        message: 'Mesajınız başarıyla gönderildi!',
        severity: 'success'
      });

      // Formu temizle
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('E-posta gönderirken hata oluştu:', error);
      setSnackbar({
        open: true,
        message: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              background: 'rgba(36, 36, 36, 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 4 }}>
              İletişim Bilgileri
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <LocationOn color="primary" />
              <Typography>
                {personalInfo.contact.address}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Phone color="primary" />
              <Typography>
                {personalInfo.contact.phone}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Email color="primary" />
              <Typography>
                {personalInfo.contact.email}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              height: '100%',
              background: 'rgba(36, 36, 36, 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 4 }}>
              Mesaj Gönder
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Ad Soyad"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              <TextField
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Opsiyonel"
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
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
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(100, 255, 218, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="outlined"
                color="primary"
                size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  }
                }}
              >
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 