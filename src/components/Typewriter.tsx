'use client';

import { useState, useEffect, useCallback } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { colors } from '@/theme/colors';

interface TypewriterProps extends Omit<TypographyProps, 'children'> {
  texts: string[];
  typingDelay?: number;
  pauseDelay?: number;
}

const cursorKeyframes = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const getRandomDelay = (baseDelay: number) => {
  return baseDelay + Math.random() * 100 - 50; // baseDelay ± 50ms
};

export default function Typewriter({ texts, typingDelay = 150, pauseDelay = 2000, ...props }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement('style');
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
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDelay);
      return () => clearTimeout(timeout);
    }

    const currentText = texts[currentTextIndex];

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      timeout = setTimeout(deleteCharacter, typingDelay / 2);
    } else {
      if (currentIndex === currentText.length) {
        setIsPaused(true);
        return;
      }

      timeout = setTimeout(typeNextCharacter, getRandomDelay(typingDelay));
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, currentTextIndex, displayText, isDeleting, isPaused, texts, typingDelay, typeNextCharacter, deleteCharacter]);

  useEffect(() => {
    if (!isDeleting && displayText === '') {
      setCurrentIndex(0);
    }
  }, [isDeleting, displayText]);

  return (
    <Typography 
      {...props} 
      sx={{ 
        ...props.sx,
        '&::after': {
          content: '"_"',
          animation: 'blink 1s step-end infinite',
          color: colors.primary.main,
        },
        '@keyframes blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      }}
    >
      {displayText}
    </Typography>
  );
} 