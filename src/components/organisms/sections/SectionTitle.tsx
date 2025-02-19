import { Typography, Box, SvgIconProps } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";

interface SectionTitleProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  const colors = useThemeColors();

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "1.75rem" },
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: "40px",
            height: "3px",
            background: "linear-gradient(90deg, primary.main, transparent)",
            borderRadius: "4px",
          },
        }}
      >
        <Icon
          sx={{
            color: "primary.main",
            fontSize: "2rem",
          }}
        />
        {title}
        {subtitle && (
          <Typography
            component="span"
            variant="h6"
            sx={{
              ml: 2,
              color: "primary.main",
              fontStyle: "italic",
            }}
          >
            ({subtitle})
          </Typography>
        )}
      </Typography>
    </Box>
  );
} 