// Türkçe ay isimleri için sabit
const TURKISH_MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'] as const;

// Tip tanımlamaları
type DateInput = Date | string | undefined | null;

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
  
  end.setDate(end.getDate() + 1);
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  
  if (end.getDate() < start.getDate()) {
    months--;
  }
  
  return months;
};

/**
 * Ay sayısını yıl ve ay olarak formatlar
 */
const formatDuration = (totalMonths: number): string => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  const parts = [];
  if (years > 0) parts.push(`${years} yıl`);
  if (months > 0) parts.push(`${months} ay`);
  
  return parts.join(' ');
};

/**
 * İki tarih arasındaki süreyi hesaplar ve formatlar
 */
export const calculateDuration = (startDate: DateInput, endDate: DateInput): string => {
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);
  
  const months = calculateMonthsBetween(start, end);
  return formatDuration(months);
};

/**
 * Tarihi Türkçe formatta formatlar
 */
export const formatDate = (date: DateInput): string => {
  if (!date) return '';
  const normalizedDate = normalizeDate(date);
  return `${TURKISH_MONTHS[normalizedDate.getMonth()]} ${normalizedDate.getFullYear()}`;
};

/**
 * Toplam deneyim süresini hesaplar
 */
export const calculateTotalExperience = (experiences: Array<{ 
  startDate: DateInput; 
  endDate?: DateInput; 
  isCurrentJob?: boolean; 
}>): string => {
  const totalMonths = experiences.reduce((total, exp) => {
    const start = normalizeDate(exp.startDate);
    const end = exp.isCurrentJob ? new Date() : normalizeDate(exp.endDate);
    return total + calculateMonthsBetween(start, end);
  }, 0);

  return formatDuration(totalMonths);
}; 