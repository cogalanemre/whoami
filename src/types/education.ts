interface EducationTranslation {
  school: string;
  department?: string;
  location: string;
}

export interface Education {
  startDate: string;
  endDate: string;
  logo?: string;
  tr: EducationTranslation;
  en: EducationTranslation;
} 