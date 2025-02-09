"use client";

import { useState, useEffect, useCallback } from "react";
import { Typography, useTheme } from "@mui/material";

interface TypewriterProps {
  texts: string[];
  delay?: number;
}

const cursorKeyframes = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const getRandomDelay = (baseDelay: number) => {
  return baseDelay + Math.random() * 30 - 15; // baseDelay ± 15ms - daha az rastgelelik
};

export default function Typewriter({ texts, delay = 80 }: TypewriterProps) {
  const theme = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const BLINK_TIMES = 3; // Kaç kere yanıp sönecek

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = cursorKeyframes;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const typeNextCharacter = useCallback(() => {
    const currentText = texts[currentTextIndex];
    setDisplayText((prev) => prev + currentText[currentIndex]);
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, currentTextIndex, texts]);

  const deleteCharacter = useCallback(() => {
    setDisplayText((prev) => prev.slice(0, -1));
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      if (blinkCount < BLINK_TIMES) {
        timeout = setTimeout(() => {
          setBlinkCount((prev) => prev + 1);
        }, 500); // Yanıp sönme süresini kısalttım
      } else {
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
          setBlinkCount(0);
        }, 300); // Bekleme süresini kısalttım
      }
      return () => clearTimeout(timeout);
    }

    const currentText = texts[currentTextIndex];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      timeout = setTimeout(deleteCharacter, delay / 3); // Silme hızını artırdım
    } else {
      if (currentIndex === currentText.length) {
        setIsPaused(true);
        return;
      }

      timeout = setTimeout(typeNextCharacter, getRandomDelay(delay));
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    currentTextIndex,
    displayText,
    isDeleting,
    isPaused,
    texts,
    delay,
    typeNextCharacter,
    deleteCharacter,
    blinkCount,
  ]);

  useEffect(() => {
    if (!isDeleting && displayText === "") {
      setCurrentIndex(0);
    }
  }, [isDeleting, displayText]);

  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: "2rem",
        fontWeight: 500,
        color: "text.primary",
        "&::after": {
          content: '"_"',
          animation: isPaused ? "blink 1s step-end infinite" : "none",
          color: theme.palette.primary.main,
          opacity: isPaused ? undefined : 1,
          fontWeight: 100, // İnce dikey çizgi için
          marginLeft: "2px", // Biraz boşluk ekleyelim
          position: "relative",
          top: "2px", // Dikey çizgiyi biraz yukarı alalım
        },
        "@keyframes blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        mb: 2,
        mt: 1,
      }}
    >
      {displayText}
    </Typography>
  );
}
