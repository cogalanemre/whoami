import { z } from 'zod';

// Email validasyonu için regex
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Telefon numarası validasyonu için regex (Türkiye formatı)
const PHONE_REGEX = /^(\+90|0)?[0-9]{10}$/;

// İletişim formu şeması
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harf içerebilir'),
  
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .regex(EMAIL_REGEX, 'Geçerli bir e-posta adresi giriniz'),
  
  phone: z.string()
    .regex(PHONE_REGEX, 'Geçerli bir telefon numarası giriniz')
    .optional(),
  
  message: z.string()
    .min(10, 'Mesaj en az 10 karakter olmalıdır')
    .max(1000, 'Mesaj en fazla 1000 karakter olabilir')
    .trim(),
});

// XSS koruması için HTML temizleme
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // HTML taglerini kaldır
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Form verilerini doğrula ve temizle
export function validateAndSanitizeForm(data: unknown) {
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      })),
    };
  }

  // Başarılı validasyondan sonra XSS koruması uygula
  const sanitizedData = {
    name: sanitizeInput(result.data.name),
    email: sanitizeInput(result.data.email),
    phone: result.data.phone ? sanitizeInput(result.data.phone) : undefined,
    message: sanitizeInput(result.data.message),
  };

  return {
    success: true,
    data: sanitizedData,
  };
} 