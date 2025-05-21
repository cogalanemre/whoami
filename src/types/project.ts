export interface Project {
  name: string;
  link: string;
  startDate: string;
  endDate: string | null;
  tr: {
    description: string;
  };
  en: {
    description: string;
  };
  skillTags: string[];
} 