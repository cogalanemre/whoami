// Renk kontrastı hesaplama fonksiyonları
// WCAG 2.0 standartlarına göre

// Renk değerlerini RGB'den göreceli parlaklığa çevir
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928
      ? c / 12.92
      : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Hex renk kodunu RGB'ye çevir
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('Geçersiz hex renk kodu');
  
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

// İki renk arasındaki kontrast oranını hesapla
export function getContrastRatio(color1: string, color2: string): number {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// Kontrast oranının WCAG 2.0 standartlarına uygunluğunu kontrol et
export function checkContrast(
  foreground: string,
  background: string
): {
  ratio: number;
  AA: { large: boolean; normal: boolean; small: boolean };
  AAA: { large: boolean; normal: boolean; small: boolean };
} {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio,
    AA: {
      large: ratio >= 3,
      normal: ratio >= 4.5,
      small: ratio >= 4.5,
    },
    AAA: {
      large: ratio >= 4.5,
      normal: ratio >= 7,
      small: ratio >= 7,
    },
  };
}

// Renk paletini kontrol et
export function validateColorPalette(colors: Record<string, string>): {
  valid: boolean;
  issues: Array<{
    color1: string;
    color2: string;
    ratio: number;
    requiredRatio: number;
  }>;
} {
  const issues: Array<{
    color1: string;
    color2: string;
    ratio: number;
    requiredRatio: number;
  }> = [];

  // Tüm renk kombinasyonlarını kontrol et
  Object.entries(colors).forEach(([name1, color1]) => {
    Object.entries(colors).forEach(([name2, color2]) => {
      if (name1 === name2) return;

      const contrast = getContrastRatio(color1, color2);
      const requiredRatio = 4.5; // WCAG AA standardı

      if (contrast < requiredRatio) {
        issues.push({
          color1: name1,
          color2: name2,
          ratio: contrast,
          requiredRatio,
        });
      }
    });
  });

  return {
    valid: issues.length === 0,
    issues,
  };
} 