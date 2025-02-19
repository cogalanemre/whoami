'use client';

import { useParams } from 'next/navigation';
import trCommon from '@/locales/tr/common.json';
import enCommon from '@/locales/en/common.json';

const translations = {
  tr: {
    common: trCommon,
  },
  en: {
    common: enCommon,
  },
} as const;

type TranslationsType = typeof translations;
type LocaleType = keyof TranslationsType;

export function useTranslation() {
  const params = useParams();
  const locale = (params?.lang as LocaleType) || 'tr';

  const t = <T extends keyof TranslationsType['tr']>(
    namespace: T
  ): typeof translations['tr'][T] => {
    return translations[locale][namespace];
  };

  return { t, locale };
} 