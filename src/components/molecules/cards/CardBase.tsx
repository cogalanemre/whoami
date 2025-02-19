import { Paper, PaperProps } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";

interface CardBaseProps extends PaperProps {
  isHighlighted?: boolean;
}

export default function CardBase({ 
  children, 
  isHighlighted, 
  sx,
  ...props 
}: CardBaseProps) {
  const colors = useThemeColors();

  return (
    <Paper
      sx={{
        background: colors.surface,
        position: "relative",
        transition: "all 0.3s ease-in-out",
        border: `1px solid ${isHighlighted ? colors.primary : "transparent"}`,
        transform: isHighlighted ? "translateY(-4px)" : "none",
        boxShadow: isHighlighted ? `0 4px 20px ${colors.primary}40` : "none",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Paper>
  );
} 