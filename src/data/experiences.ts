export interface Experience {
  id: 'dgpays' | 'obss' | 'streamDelta' | 'sikayetvar';
  company: string;
  startDate: Date;
  endDate?: Date;
  isCurrentJob?: boolean;
  logo: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: 'dgpays',
    company: 'DGPays',
    startDate: new Date('2023-01-01'),
    isCurrentJob: true,
    logo: '/dgpays.png',
    skills: ['Jenkins', 'CI/CD', 'PL/SQL', 'JavaScript', 'GitLab']
  },
  {
    id: 'obss',
    company: 'OBSS',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2023-01-01'),
    logo: '/obss.webp',
    skills: ['Java', 'Spring', 'React', 'Kubernetes', 'Kafka']
  },
  {
    id: 'streamDelta',
    company: 'StreamDelta',
    startDate: new Date('2021-07-01'),
    endDate: new Date('2021-12-31'),
    logo: '/streamDelta.jpeg',
    skills: ['Java', 'Spring Boot', 'Camunda', 'MongoDB', 'Redis']
  },
  {
    id: 'sikayetvar',
    company: 'Sikayetvar.com',
    startDate: new Date('2018-09-01'),
    endDate: new Date('2020-12-31'),
    logo: '/sikayetvar_logo.jpeg',
    skills: ['Java', 'Spring Boot', 'Elasticsearch', 'MySQL', 'Google Cloud']
  }
]; 