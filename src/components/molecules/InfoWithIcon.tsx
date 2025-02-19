import { Box, Typography, SvgIconProps } from "@mui/material";
import { ThemeColors } from "@/types";

interface InfoWithIconProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
  colors: ThemeColors;
  fontSize?: string;
}

export default function InfoWithIcon({ icon: Icon, text, colors, fontSize }: InfoWithIconProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Icon sx={{ color: colors.primary, fontSize: fontSize || "inherit" }} />
      <Typography
        variant="body2"
        sx={{
          color: colors.secondary,
          fontSize: fontSize || "inherit",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
} 