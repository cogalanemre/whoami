'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { TypewriterProps } from './types';
import { StyledTypewriter, StyledCursor } from './styles';

export default function Typewriter({ 
  texts, 
  delay = 100,
  loop = true,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  const handleTyping = useCallback(() => {
    const currentWord = texts[currentWordIndex];
    const shouldDelete = isDeleting;

    setCurrentText(prev => {
      if (shouldDelete) {
        return prev.slice(0, -1);
      }
      return currentWord.slice(0, prev.length + 1);
    });

    if (!shouldDelete && currentText === currentWord) {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        setIsDeleting(true);
      }, 2000);
    } else if (shouldDelete && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex(prev => {
        if (prev === texts.length - 1) {
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }
  }, [currentText, currentWordIndex, isDeleting, loop, texts]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, isDeleting ? delay / 2 : delay);
    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting, delay]);

  return (
    <StyledTypewriter>
      <span>{currentText}</span>
      <StyledCursor isBlinking={isBlinking} />
    </StyledTypewriter>
  );
} 