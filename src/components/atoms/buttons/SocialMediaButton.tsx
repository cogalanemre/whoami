import { IconButton, IconButtonProps } from "@mui/material";
import { IconType } from "react-icons";

interface SocialMediaButtonProps extends Omit<IconButtonProps, 'children'> {
  icon: IconType;
  href: string;
  target?: string;
  rel?: string;
}

export default function SocialMediaButton({ 
  icon: Icon, 
  sx,
  ...props 
}: SocialMediaButtonProps) {
  return (
    <IconButton
      color="primary"
      size="large"
      sx={{
        border: "2px solid",
        borderColor: "primary.main",
        backdropFilter: "blur(4px)",
        "&:hover": {
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
        ...sx
      }}
      {...props}
    >
      <Icon />
    </IconButton>
  );
} 