export interface Contact {
  phone: string;
  email: string;
  location: {
    tr: string;
    en: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
} 