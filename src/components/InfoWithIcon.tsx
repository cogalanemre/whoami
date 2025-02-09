import { Typography, Box, SvgIconProps } from "@mui/material";
import { flexRowCenterStyles, infoIconStyles } from "@/theme/commonStyles";
import { ThemeColors } from "@/theme/colors";

interface InfoWithIconProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
  currentColors: ThemeColors;
  fontSize?: string;
}

export default function InfoWithIcon({
  icon: Icon,
  text,
  currentColors,
  fontSize = "0.85rem",
}: InfoWithIconProps) {
  return (
    <Box sx={flexRowCenterStyles}>
      <Icon sx={infoIconStyles(currentColors)} />
      <Typography
        variant="subtitle2"
        color={currentColors.secondary}
        sx={{ fontSize }}
      >
        {text}
      </Typography>
    </Box>
  );
} 