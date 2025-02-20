export type LocaleCode = 'tr' | 'en';

export interface LocaleConfig {
  code: LocaleCode;
  name: string;
  nativeName: string;
  dateFormat: string;
  numberFormat: {
    currency: string;
    decimal: string;
    thousand: string;
  };
}

export interface PluralForms {
  zero?: string;
  one: string;
  other: string;
}

export interface TranslationParams {
  [key: string]: string | number | PluralForms | undefined;
  plural?: PluralForms;
  count?: number;
} 