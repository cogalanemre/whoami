'use client';

import { useState, useEffect, useCallback } from 'react';
import { Typography, TypographyProps } from '@mui/material';

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

export default function Typewriter({ texts, typingDelay = 100, pauseDelay = 2000, ...props }: TypewriterProps) {
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

      timeout = setTimeout(deleteCharacter, typingDelay / 3); // Silme hızını 3 kat daha hızlı yaptık
    } else {
      if (currentIndex === currentText.length) {
        setIsPaused(true);
        return;
      }

      timeout = setTimeout(typeNextCharacter, getRandomDelay(typingDelay));
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, currentTextIndex, displayText, isDeleting, isPaused, pauseDelay, texts, typingDelay, typeNextCharacter, deleteCharacter]);

  useEffect(() => {
    if (!isDeleting && displayText === '') {
      setCurrentIndex(0);
    }
  }, [isDeleting, displayText]);

  return (
    <Typography {...props}>
      {displayText}
      &nbsp;
      <span style={{
        opacity: isPaused ? 0 : 1,
        animation: 'blink 0.75s step-end infinite', // İmleç yanıp sönme hızını artırdık
        color: '#81C9C9',
        fontWeight: 'bold',
        transform: 'scale(1.2)', // İmleci biraz daha büyük yaptık
        display: 'inline-block'
      }}>|</span>
    </Typography>
  );
} 