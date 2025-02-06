export * from './dateUtils';

// Blog içeriği işleme fonksiyonları
export const extractReadingTime = (content: string): string => {
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return minutes < 1 ? '1 dakika' : `${minutes} dakika`;
};

export const extractFirstParagraph = (content: string): string => {
  const cleanText = content
    .replace(/<figure[\s\S]*?<\/figure>/i, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/i, '')
    .replace(/<pre[\s\S]*?<\/pre>/i, '')
    .replace(/<h[1-6][\s\S]*?<\/h[1-6]>/i, '');

  const paragraphs = cleanText.match(/<p>([\s\S]*?)<\/p>/i);
  if (paragraphs && paragraphs[1]) {
    const firstParagraph = paragraphs[1]
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return firstParagraph.length > 200 
      ? firstParagraph.substring(0, 200) + '...'
      : firstParagraph;
  }
  
  return '';
};

export const extractMainImage = (content: string, description: string): string | undefined => {
  const figureMatch = content.match(/<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/i);
  if (figureMatch?.[1]) return figureMatch[1];

  const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
  if (imgMatch?.[1]) return imgMatch[1];

  const descriptionImgMatch = description.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
  if (descriptionImgMatch?.[1]) return descriptionImgMatch[1];

  return undefined;
};

// String işleme fonksiyonları
export const cleanHtml = (content: string): string => {
  return content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// Animasyon yardımcıları
export const getRandomDelay = (baseDelay: number, variance: number = 50): number => {
  return baseDelay + Math.random() * variance - variance / 2;
}; 