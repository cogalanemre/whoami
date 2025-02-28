import { TextField, TextFieldProps, useTheme } from "@mui/material";

export default function FormField({ sx, variant = "outlined", ...props }: TextFieldProps) {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      variant={variant}
      sx={{
        mb: 2,
        "& .MuiInputBase-root": {
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out",
          
          // Standard variant için özel stiller
          ...(variant === "standard" && {
            "&:before": {
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: `1px solid ${theme.palette.text.secondary}`,
            },
            "&.Mui-focused:before": {
              borderBottom: `1px solid ${theme.palette.text.primary} !important`,
            },
          }),

          // Outlined variant için özel stiller
          ...(variant === "outlined" && {
            "& fieldset": {
              borderWidth: "1px",
              borderColor: theme.palette.divider,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.secondary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              borderColor: theme.palette.text.primary,
            },
          }),
        },

        "& .MuiInputLabel-root": {
          color: theme.palette.text.secondary,
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
        },

        "& .MuiInputBase-input": {
          fontSize: "0.95rem",
          letterSpacing: "0.3px",
          color: theme.palette.text.primary,
        },

        // Disabled durumu
        "& .Mui-disabled": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.action.disabledBackground,
          },
          "&:before": {
            borderColor: `${theme.palette.action.disabledBackground} !important`,
          },
        },

        ...sx
      }}
      {...props}
    />
  );
} 