import { LocaleConfig } from './types';

export const localeConfigs: Record<string, LocaleConfig> = {
  tr: {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    dateFormat: 'DD.MM.YYYY',
    numberFormat: {
      currency: 'TRY',
      decimal: ',',
      thousand: '.',
    },
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: {
      currency: 'USD',
      decimal: '.',
      thousand: ',',
    },
  },
} as const;

export const defaultLocale = 'tr';
export const supportedLocales = Object.keys(localeConfigs) as Array<keyof typeof localeConfigs>;
