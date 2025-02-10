// Tarih formatları
export const TURKISH_MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'] as const;

// Animasyon sabitleri
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.8,
} as const;

// Sayfa sabitleri
export const PAGE_PADDING = {
  MOBILE: 2,
  DESKTOP: 4,
} as const;

// Bileşen boyutları
export const COMPONENT_SIZES = {
  AVATAR: {
    LARGE: 300,
    MEDIUM: 100,
    SMALL: 60,
  },
  BORDER_RADIUS: {
    SMALL: 6,
    MEDIUM: 8,
    LARGE: 12,
  },
  TIMELINE: {
    WIDTH: 2,
    LEFT_OFFSET: {
      EXPERIENCE: 20,
      EDUCATION: 10,
    },
  },
} as const;

// Form sabitleri
export const FORM_CONFIG = {
  EMAIL_SERVICE: process.env.EMAIL_SERVICE_ID || '',
  EMAIL_TEMPLATE: process.env.EMAIL_TEMPLATE_ID || '',
  EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY || '',
} as const;

// API sabitleri
export const API_CONFIG = {
  BLOG_FEED_URL: process.env.BLOG_FEED_URL || 'https://medium.com/feed/@cogalanemre',
  REVALIDATE_TIME: Number(process.env.BLOG_REVALIDATE_TIME) || 3600,
} as const;

// Güvenlik sabitleri
export const SECURITY_CONFIG = {
  XSS_OPTIONS: {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  },
  CORS_OPTIONS: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://cogalanemre.com'] 
      : ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
} as const; 