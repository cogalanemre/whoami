import config from '@/config/config.json';

// UI sabitleri
export const UI_CONSTANTS = {
  ANIMATION: {
    DURATION: {
      FAST: 0.2,
      NORMAL: 0.3,
      SLOW: 0.8,
    }
  },
  LAYOUT: {
    PAGE_PADDING: {
      MOBILE: 2,
      DESKTOP: 4,
    },
    CONTAINER: {
      MAX_WIDTH: {
        MOBILE: "100%",
        TABLET: "90%",
        DESKTOP: "85%"
      },
      PADDING: {
        XS: 2,
        SM: 3,
        MD: 4
      },
      SPACING: {
        XS: 4,
        SM: 6,
        MD: 8
      }
    }
  },
  COMPONENTS: {
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
    SKELETON: {
      HEIGHT: {
        HERO: 400,
        SECTION: 300,
        CONTACT: 250
      }
    }
  }
} as const;

// Form ayarları
export const FORM_CONFIG = {
  EMAIL_SERVICE: config.email.serviceId,
  EMAIL_TEMPLATE: config.email.templateId,
  EMAIL_PUBLIC_KEY: config.email.publicKey,
} as const;

// API ayarları
export const API_CONFIG = {
  BLOG_FEED_URL: config.api.blog.feedUrl,
} as const;

// Güvenlik ayarları
export const SECURITY_CONFIG = {
  CORS_OPTIONS: {
    origin: process.env.NODE_ENV === 'production' 
      ? config.security.cors.origins.production 
      : config.security.cors.origins.development,
    methods: config.security.cors.methods,
    credentials: config.security.cors.credentials,
  },
} as const; 