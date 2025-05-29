/**
 * Tavsiye bilgilerini içeren interface
 */
export interface Recommendation {
  /** Tavsiye veren kişinin adı */
  recommender: string;
  /** Tavsiye veren kişinin pozisyonu */
  position: string;
  /** Tavsiye veren kişinin şirketi */
  company: string;
  /** Tavsiye veren kişinin avatar URL'i */
  avatar?: string;
  /** Tavsiye tarihi */
  date: string;
  /** Türkçe çeviriler */
  tr: {
    /** Tavsiye içeriği */
    content: string;
  };
  /** İngilizce çeviriler */
  en: {
    /** Tavsiye içeriği */
    content: string;
  };
} 