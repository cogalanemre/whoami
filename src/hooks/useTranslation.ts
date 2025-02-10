'use client';

import { useParams } from 'next/navigation';
import trCommon from '@/locales/tr/common.json';
import enCommon from '@/locales/en/common.json';
import trPersonal from '@/locales/tr/personal.json';
import enPersonal from '@/locales/en/personal.json';
import trExperiences from '@/locales/tr/experiences.json';
import enExperiences from '@/locales/en/experiences.json';
import trEducation from '@/locales/tr/education.json';
import enEducation from '@/locales/en/education.json';

const translations = {
  tr: {
    common: trCommon,
    personal: trPersonal,
    experiences: trExperiences,
    education: trEducation,
  },
  en: {
    common: enCommon,
    personal: enPersonal,
    experiences: enExperiences,
    education: enEducation,
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