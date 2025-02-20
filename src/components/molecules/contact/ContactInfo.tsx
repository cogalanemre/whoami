import { Box, Link } from "@mui/material";
import { Email, GitHub, LinkedIn, Phone } from "@mui/icons-material";

export function ContactInfo() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Email color="primary" />
        <Link href="mailto:vatanaydintr@gmail.com" underline="hover">
          vatanaydintr@gmail.com
        </Link>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Phone color="primary" />
        <Link href="tel:+905417694264" underline="hover">
          +90 541 769 42 64
        </Link>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <GitHub color="primary" />
        <Link
          href="https://github.com/vatanaydintr"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          github.com/vatanaydintr
        </Link>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LinkedIn color="primary" />
        <Link
          href="https://linkedin.com/in/vatanaydintr"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          linkedin.com/in/vatanaydintr
        </Link>
      </Box>
    </Box>
  );
} 