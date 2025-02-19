import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

interface TypewriterProps {
  texts: string[];
  delay?: number;
}

export default function Typewriter({ texts, delay = 150 }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const colors = useThemeColors();

  useEffect(() => {
    const text = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, delay / 2);
      }
    } else {
      if (currentText === text) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setCurrentText((prev) => text.slice(0, prev.length + 1));
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, delay, isDeleting, texts]);

  return (
    <Typography
      variant="h4"
      sx={{
        color: colors.primary,
        fontWeight: "bold",
        position: "relative",
        display: "inline-block",
        "&::after": {
          content: '"|"',
          position: "absolute",
          right: "-4px",
          animation: "blink 1s infinite",
          color: "inherit",
        },
        "@keyframes blink": {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      }}
    >
      {currentText}
    </Typography>
  );
} 