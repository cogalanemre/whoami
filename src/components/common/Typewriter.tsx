/**
 * Daktilo Efektli Metin Bileşeni
 *
 * Metinleri daktilo yazım efekti ile gösteren animasyonlu bir bileşen.
 * Verilen metinleri sırayla yazar, siler ve bir sonraki metne geçer.
 *
 * Özellikler:
 * - Çoklu metin desteği
 * - Özelleştirilebilir yazım hızı
 * - Otomatik silme ve geçiş
 * - Yanıp sönen imleç efekti
 * - Tema renkleriyle uyumlu
 *
 * @component
 * @example
 * ```tsx
 * <Typewriter
 *   texts={["Yazılım Geliştirici", "Frontend Developer", "UI/UX Tasarımcı"]}
 *   delay={150}
 * />
 * ```
 */

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { STYLE } from '@/styles/common/Typewriter.styles';

/**
 * Daktilo Efekti Props Interface
 *
 * @interface TypewriterProps
 * @property {string[]} texts - Sırayla gösterilecek metin dizisi
 * @property {number} [delay=150] - Karakterler arası gecikme süresi (ms)
 */
interface TypewriterProps {
  texts: string[];
  delay?: number;
}

/**
 * Daktilo Efektli Metin Bileşeni
 *
 * @param {TypewriterProps} props - Bileşen props'ları
 * @returns {JSX.Element} Animasyonlu metin bileşeni
 */
export default function Typewriter({ texts, delay = 150 }: TypewriterProps) {
  // Durum değişkenleri
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setIsWaiting(false);
        setCurrentTextIndex(prev => (prev + 1) % texts.length);
      } else {
        setIsWaiting(false);
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
        }, delay / 2);
      }
    } else {
      if (currentText === text) {
        setIsWaiting(true);
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setIsWaiting(false);
        }, 2000);
      } else {
        setIsWaiting(false);
        timeout = setTimeout(() => {
          setCurrentText(prev => text.slice(0, prev.length + 1));
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, delay, isDeleting, texts, isWaiting]);

  return (
    <Typography
      variant="body1"
      sx={{
        ...STYLE.ROOT,
        '&::after': isWaiting ? STYLE.CURSOR_WAITING : STYLE.CURSOR_NOT_WAITING,
      }}
    >
      {currentText}
    </Typography>
  );
}
