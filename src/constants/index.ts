import config from '@/config/config.json';

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
    origin:
      process.env.NODE_ENV === 'production'
        ? config.security.cors.origins.production
        : config.security.cors.origins.development,
    methods: config.security.cors.methods,
    credentials: config.security.cors.credentials,
  },
} as const;
