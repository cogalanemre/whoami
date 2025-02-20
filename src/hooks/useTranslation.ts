'use client';

import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { LocaleCode, TranslationParams } from '@/i18n/types';
import { getTranslation, formatDate, formatNumber, getLocaleConfig } from '@/i18n/utils';
import { defaultLocale } from '@/i18n/config';
import { TranslationType } from '@/i18n/schema';

type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

type TranslationKey = NestedKeyOf<TranslationType>;

export function useTranslation() {
  const params = useParams();
  const locale = (params?.lang as LocaleCode) || defaultLocale;
  const config = getLocaleConfig(locale);

  const t = useCallback((
    key: TranslationKey,
    params?: TranslationParams
  ) => {
    return getTranslation(key, locale, params);
  }, [locale]);

  const formatDateFn = useCallback((date: Date) => {
    return formatDate(date, locale);
  }, [locale]);

  const formatNumberFn = useCallback((
    num: number,
    options?: Intl.NumberFormatOptions
  ) => {
    return formatNumber(num, locale, options);
  }, [locale]);

  return {
    t,
    locale,
    formatDate: formatDateFn,
    formatNumber: formatNumberFn,
    config
  };
} 