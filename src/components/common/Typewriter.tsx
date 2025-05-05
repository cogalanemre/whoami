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
import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { STYLE } from '@/styles/common/Typewriter.styles';

/**
 * Animasyon durumları için enum
 */
enum AnimationState {
  TYPING = 'typing',
  WAITING = 'waiting',
  DELETING = 'deleting'
}

/**
 * Daktilo Efekti Props Interface
 *
 * @interface TypewriterProps
 * @property {string[]} texts - Sırayla gösterilecek metin dizisi
 * @property {number} [delay=150] - Karakterler arası gecikme süresi (ms)
 * @property {string} [className] - Ek CSS sınıfı
 * @property {string} [ariaLabel] - Erişilebilirlik için etiket
 */
interface TypewriterProps {
  texts: string[];
  delay?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Daktilo Efektli Metin Bileşeni
 *
 * @param {TypewriterProps} props - Bileşen props'ları
 * @returns {JSX.Element} Animasyonlu metin bileşeni
 */
const Typewriter = memo(({ 
  texts, 
  delay = 150,
  className,
  ariaLabel = 'Typewriter text'
}: TypewriterProps) => {
  // Durum değişkenleri
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.TYPING);

  // Mevcut metni memoize et
  const currentFullText = useMemo(() => texts[currentTextIndex], [texts, currentTextIndex]);

  // Metin indeksini güncelleme fonksiyonu
  const updateTextIndex = useCallback(() => {
    setCurrentTextIndex(prev => (prev + 1) % texts.length);
  }, [texts.length]);

  // Metin silme işlemi
  const deleteText = useCallback(() => {
    if (currentText === '') {
      setAnimationState(AnimationState.TYPING);
      updateTextIndex();
    } else {
      setCurrentText(prev => prev.slice(0, -1));
    }
  }, [currentText, updateTextIndex]);

  // Metin yazma işlemi
  const typeText = useCallback(() => {
    if (currentText === currentFullText) {
      setAnimationState(AnimationState.WAITING);
    } else {
      setCurrentText(prev => currentFullText.slice(0, prev.length + 1));
    }
  }, [currentText, currentFullText]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (animationState) {
      case AnimationState.TYPING:
        timeout = setTimeout(typeText, delay);
        break;
      case AnimationState.WAITING:
        timeout = setTimeout(() => setAnimationState(AnimationState.DELETING), 2000);
        break;
      case AnimationState.DELETING:
        timeout = setTimeout(deleteText, delay / 2);
        break;
    }

    return () => clearTimeout(timeout);
  }, [animationState, currentText, delay, deleteText, typeText]);

  return (
    <Typography
      variant="body1"
      className={className}
      aria-label={ariaLabel}
      sx={{
        ...STYLE.ROOT,
        '&::after': animationState === AnimationState.WAITING 
          ? STYLE.CURSOR_WAITING 
          : STYLE.CURSOR_NOT_WAITING,
      }}
    >
      {currentText}
    </Typography>
  );
});

Typewriter.displayName = 'Typewriter';

export default Typewriter;
