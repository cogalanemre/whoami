// Re-export all types from their respective files
export type { Experience, WorkingModel, EmploymentType } from './experience';
export type { Education } from './education';
export type { BlogPost, BlogData } from './blog';
export type { ContactFormData } from './contact';
export type { ThemeColors } from './theme';
export type { Hero } from './hero';

export interface SocialMedia {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
  mail?: string;
  medium?: string;
} 