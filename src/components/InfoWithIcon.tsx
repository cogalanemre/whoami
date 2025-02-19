import { Box, Typography, SvgIconProps } from "@mui/material";
import { ThemeColors } from "@/types";

interface InfoWithIconProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
  colors: ThemeColors;
  fontSize?: string;
}

export default function InfoWithIcon({
  icon: Icon,
  text,
  colors,
  fontSize = "1rem",
}: InfoWithIconProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Icon
        sx={{
          color: colors.secondary,
          fontSize: "inherit",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: colors.secondary,
          fontSize,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
