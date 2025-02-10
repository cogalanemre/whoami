import type { DateInput } from '@/utils/dateUtils';

// Deneyim tipleri
export interface Experience {
  id: 'dgpays' | 'obss' | 'streamDelta' | 'sikayetvar';
  company: string;
  title: string;
  startDate: DateInput;
  endDate?: DateInput;
  isCurrentJob?: boolean;
  location: string;
  type: string;
  logo: string;
  description: string[];
  skills: string[];
}

// Eğitim tipleri
export interface Education {
  school: string;
  department?: string;
  location: string;
  startDate: DateInput;
  endDate: DateInput;
  type: 'university' | 'highschool' | 'prep';
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
  titles: string[];
  bio: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
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