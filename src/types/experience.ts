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
  location: string;
  description: string[];
}

export interface Experience {
  company: string;
  logo: string;
  startDate: string;
  endDate: string | null;
  workingModel: WorkingModel;
  employmentType: EmploymentType;
  tr: ExperienceTranslation;
  en: ExperienceTranslation;
  skills: string[];
} 