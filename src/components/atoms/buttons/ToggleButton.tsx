"use client";

import { Button, ButtonGroup, Box } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface ToggleButtonItemProps {
  Icon: SvgIconComponent | string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * Toggle Button Item Bileşeni
 * 
 * İkon veya metin içeren tekli buton bileşeni
 * 
 * @component
 */
const ToggleButtonItem = ({ Icon, isActive, onClick }: ToggleButtonItemProps) => (
  <Button
    onClick={onClick}
    className={isActive ? "active" : ""}
  >
    <Box
      sx={{
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.7rem",
        fontWeight: "normal",
        userSelect: "none",
      }}
    >
      {typeof Icon === "string" ? Icon : <Icon sx={{ fontSize: 14 }} />}
    </Box>
  </Button>
);

interface ToggleButtonProps {
  buttons: Array<{
    Icon: SvgIconComponent | string;
    isActive: boolean;
  }>;
  onClick: () => void;
  position?: {
    top?: number;
    right?: number;
  };
}

/**
 * Toggle Button Bileşeni
 * 
 * İki seçenekli toggle buton grubu.
 * Dil değiştirici ve tema değiştirici için kullanılan,
 * pill şeklinde tasarlanmış buton grubu.
 * 
 * @component
 * @example
 * ```tsx
 * <ToggleButton
 *   buttons={[
 *     { Icon: DarkMode, isActive: true },
 *     { Icon: WbSunny, isActive: false }
 *   ]}
 *   onClick={handleClick}
 *   position={{ top: 20, right: 20 }}
 * />
 * ```
 */
export default function ToggleButton({ buttons, onClick, position = { top: 20, right: 20 } }: ToggleButtonProps) {
  const theme = useTheme();

  return (
    <ButtonGroup
      variant="outlined"
      size="small"
      sx={{
        position: "fixed",
        top: position.top,
        right: position.right,
        zIndex: 1000,
        width: "70px",
        height: "30px",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: "15px",
        overflow: "hidden",
        padding: 0,
        "& .MuiButton-root": {
          minWidth: "35px",
          height: "100%",
          padding: 0,
          border: "none",
          borderRadius: 0,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&.active": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            border: `1px solid ${theme.palette.primary.main}`,
          },
          "&:not(:last-child)": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
          },
        },
      }}
    >
      {buttons.map((button, index) => (
        <ToggleButtonItem
          key={index}
          Icon={button.Icon}
          isActive={button.isActive}
          onClick={onClick}
        />
      ))}
    </ButtonGroup>
  );
} 