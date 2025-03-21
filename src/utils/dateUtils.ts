// Ay isimleri için sabitler
const MONTHS = {
  tr: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ] as const,
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ] as const,
};

// Tip tanımlamaları
export type DateInput = Date | string | undefined | null;
type Locale = keyof typeof MONTHS;

/**
 * Tarih girişini Date nesnesine çevirir
 */
const normalizeDate = (date: DateInput): Date => {
  if (!date) return new Date();
  return date instanceof Date ? date : new Date(date);
};

/**
 * İki tarih arasındaki süreyi hesaplar
 */
const calculateMonthsBetween = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Yıl ve ay farkını hesapla
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();

  // Toplam ay farkını hesapla
  let totalMonths = yearDiff * 12 + monthDiff;

  // Gün bazında hassas kontrol
  const startDay = start.getDate();
  const endDay = end.getDate();
  const lastDayOfEndMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  const lastDayOfStartMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();

  // Ay sonu durumlarını kontrol et
  if (startDay === lastDayOfStartMonth && endDay === lastDayOfEndMonth) {
    // Her iki tarih de ay sonlarındaysa, tam ay sayısını kullan
    return totalMonths;
  }

  // Gün farkını kontrol et
  if (endDay < startDay) {
    // Eğer bitiş günü başlangıç gününden küçükse ve ay sonu durumu değilse
    // bir ay eksilt
    if (endDay !== lastDayOfEndMonth || startDay !== lastDayOfStartMonth) {
      totalMonths--;
    }
  }

  return totalMonths;
};

/**
 * Ay sayısını yıl ve ay olarak formatlar
 */
export const formatDuration = (totalMonths: number, locale: Locale = 'tr'): string => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0)
    parts.push(
      `${years} ${locale === 'tr' ? 'yıl' : 'year'}${years > 1 && locale === 'en' ? 's' : ''}`
    );
  if (months > 0)
    parts.push(
      `${months} ${locale === 'tr' ? 'ay' : 'month'}${months > 1 && locale === 'en' ? 's' : ''}`
    );

  return parts.join(' ');
};

/**
 * İki tarih arasındaki süreyi hesaplar ve formatlar
 */
export const calculateDuration = (
  startDate: DateInput,
  endDate: DateInput,
  locale: Locale = 'tr'
): string => {
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);

  const months = calculateMonthsBetween(start, end);
  return formatDuration(months, locale);
};

/**
 * Tarihi belirtilen dilde formatlar
 */
export const formatDate = (date: DateInput, locale: Locale = 'tr'): string => {
  if (!date) return '';
  const normalizedDate = normalizeDate(date);
  return `${MONTHS[locale][normalizedDate.getMonth()]} ${normalizedDate.getFullYear()}`;
};

/**
 * İki tarih arasındaki ay farkını hesaplar
 */
const calculateExperienceMonths = (experience: {
  startDate: DateInput;
  endDate?: DateInput | null;
}): number => {
  const start = normalizeDate(experience.startDate);
  const end = experience.endDate ? normalizeDate(experience.endDate) : new Date();
  return calculateMonthsBetween(start, end);
};

/**
 * Toplam deneyim süresini hesaplar
 */
export const calculateTotalExperience = (
  experiences: Array<{
    startDate: DateInput;
    endDate?: DateInput | null;
  }>,
  locale: Locale = 'tr'
): string => {
  const totalMonths = experiences.reduce((total, exp) => total + calculateExperienceMonths(exp), 0);
  return formatDuration(totalMonths, locale);
};

/**
 * Yeteneklere göre toplam deneyim süresini hesaplar
 */
export const calculateSkillDuration = (
  experiences: Array<{
    startDate: DateInput;
    endDate?: DateInput | null;
    skillTags: string[];
  }>
): Map<string, number> => {
  const skillDurations = new Map<string, number>();

  experiences.forEach(exp => {
    const months = calculateExperienceMonths(exp);
    exp.skillTags.forEach(skillTag => {
      const currentDuration = skillDurations.get(skillTag) || 0;
      skillDurations.set(skillTag, currentDuration + months);
    });
  });

  return skillDurations;
};

/**
 * Toplam deneyim süresini ay cinsinden hesaplar
 */
export const calculateTotalMonths = (
  experiences: Array<{
    startDate: DateInput;
    endDate?: DateInput | null;
  }>
): number => {
  return experiences.reduce((total, exp) => total + calculateExperienceMonths(exp), 0);
};
