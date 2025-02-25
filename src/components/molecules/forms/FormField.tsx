import { TextField, TextFieldProps, useTheme } from "@mui/material";

export default function FormField({ sx, ...props }: TextFieldProps) {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: theme.palette.text.primary,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.text.primary,
        },
        ...sx
      }}
      {...props}
    />
  );
} 