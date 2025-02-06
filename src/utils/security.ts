import DOMPurify from 'dompurify';
import { SECURITY_CONFIG } from '@/constants';

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [...SECURITY_CONFIG.XSS_OPTIONS.ALLOWED_TAGS],
    ALLOWED_ATTR: [...SECURITY_CONFIG.XSS_OPTIONS.ALLOWED_ATTR],
  });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

export const validateMessage = (message: string): boolean => {
  return message.length >= 10 && message.length <= 1000;
};

export const validateFormData = (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < 2) {
    errors.name = 'İsim en az 2 karakter olmalıdır';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Geçerli bir telefon numarası giriniz';
  }

  if (!data.message || !validateMessage(data.message)) {
    errors.message = 'Mesaj 10-1000 karakter arasında olmalıdır';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}; 