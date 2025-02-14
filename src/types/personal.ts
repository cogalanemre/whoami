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