import { LocaleCode, PluralForms, TranslationParams } from './types';
import { localeConfigs, defaultLocale } from './config';
import translations from './translations';
import { TranslationType } from './schema';

type NestedValue = string | Record<string, unknown>;

type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

type TranslationKey = NestedKeyOf<TranslationType>;

export function getTranslation(
  key: TranslationKey,
  locale: LocaleCode,
  params?: TranslationParams,
  fallbackLocale: LocaleCode = defaultLocale
): string {
  // Anahtarı nokta notasyonuna göre böl
  const keys = key.split('.');
  
  // İlk önce verilen dilde çeviriyi bul
  let value = keys.reduce<NestedValue>((obj, k) => {
    if (typeof obj === 'object' && obj !== null) {
      return (obj as Record<string, NestedValue>)[k] || '';
    }
    return '';
  }, translations[locale] as NestedValue);
  
  // Eğer çeviri bulunamadıysa fallback dilde ara
  if ((!value || value === '') && locale !== fallbackLocale) {
    value = keys.reduce<NestedValue>((obj, k) => {
      if (typeof obj === 'object' && obj !== null) {
        return (obj as Record<string, NestedValue>)[k] || '';
      }
      return '';
    }, translations[fallbackLocale] as NestedValue);
  }
  
  // Hala bulunamadıysa anahtarı döndür
  if (!value || typeof value !== 'string') return key;

  // Parametre değişimlerini yap
  if (params) {
    // Çoğul form kontrolü
    if (params.plural && typeof params.count === 'number') {
      const pluralForm = getPluralForm(params.count, params.plural);
      value = pluralForm;
    }

    // Diğer parametreleri değiştir
    value = Object.entries(params).reduce(
      (str, [paramKey, paramValue]) => {
        if (paramKey !== 'plural') {
          return str.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
        }
        return str;
      },
      value
    );
  }

  return value;
}

export function formatDate(date: Date, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(locale).format(date);
}

export function formatNumber(
  num: number,
  locale: LocaleCode,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

function getPluralForm(count: number, forms: PluralForms): string {
  if (count === 0 && forms.zero) return forms.zero;
  return count === 1 ? forms.one : forms.other;
}

export function getLocaleConfig(locale: LocaleCode) {
  return localeConfigs[locale];
} 