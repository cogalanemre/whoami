import type { DateInput } from '@/utils/dateUtils';

// Deneyim tipleri
export interface Experience {
  company: string;
  logo: string;
  startDate: string;
  endDate: string | null;
  workingModel: number;
  employmentType: number;
  tr: {
    position: string;
    location: string;
    description: string[];
  };
  en: {
    position: string;
    location: string;
    description: string[];
  };
  skills: string[];
}

// Eğitim tipleri
export interface Education {
  startDate: string;
  endDate: string;
  logo: string;
  tr: {
    school: string;
    department?: string;
    location: string;
  };
  en: {
    school: string;
    department?: string;
    location: string;
  };
}

// Blog tipleri
export interface BlogPost {
  title: string;
  link: string;
  pubDate: DateInput;
  description: string;
  thumbnail?: string;
  categories: string[];
  content: string;
  readingTime: string;
  guid: string;
}

export interface BlogData {
  posts: BlogPost[];
  loading: boolean;
  error?: string;
}

// Kişisel bilgi tipleri
export interface PersonalInfo {
  name: string;
  avatar: string;
  contact: {
    phone: string;
    email: string;
  };
  socialMedia: {
    github?: string;
    linkedin?: string;
    medium?: string;
  };
  location: {
    tr: string;
    en: string;
  };
  titles: {
    tr: string[];
    en: string[];
  };
}

// Form tipleri
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Tema tipleri
export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    hover: string;
    border: string;
    borderHover: string;
    timeline: string;
    gradient: {
      start: string;
      end: string;
      timeline: {
        start: string;
        end: string;
      };
    };
  };
  background: {
    default: string;
    paper: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
} 