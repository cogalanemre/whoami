'use client';

import { useParams } from 'next/navigation';
import tr from '@/locales/tr/common.json';
import en from '@/locales/en/common.json';

const translations = {
  tr,
  en,
} as const;

type TranslationsType = typeof translations;
type LocaleType = keyof TranslationsType;
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof tr>;

export function useTranslation() {
  const params = useParams();
  const locale = (params?.lang as LocaleType) || 'tr';

  const t = (key: TranslationKey | (string & {})) => {
    const keys = key.split('.');
    let value: unknown = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return value as string;
  };

  return { t, locale };
} 