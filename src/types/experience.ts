export enum WorkingModel {
  Hybrid = 1,
  Remote = 2,
  Office = 3,
}

export enum EmploymentType {
  FullTime = 1,
  PartTime = 2,
  Contract = 3,
  Freelance = 4,
}

interface ExperienceTranslation {
  position: string;
  company?: string;
  location: string;
  description: string[];
}

export interface Experience {
  startDate: string;
  endDate?: string | null;
  company: string;
  logo?: string;
  workingModel: number;
  employmentType: number;
  skillTags: string[];
  tr: ExperienceTranslation;
  en: ExperienceTranslation;
} 