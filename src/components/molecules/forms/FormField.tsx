import { TextField, TextFieldProps } from "@mui/material";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function FormField({ sx, ...props }: TextFieldProps) {
  const colors = useThemeColors();

  return (
    <TextField
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
        ...sx
      }}
      {...props}
    />
  );
} 