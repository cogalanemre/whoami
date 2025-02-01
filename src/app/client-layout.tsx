'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import { Container } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function ClientLayout({
  children,
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </ThemeProvider>
  );
} 