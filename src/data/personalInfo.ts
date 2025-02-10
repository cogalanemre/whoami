export interface PersonalInfo {
  name: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: 'Emre ÇOĞALAN',
  social: {
    github: 'https://github.com/cogalanemre',
    linkedin: 'https://www.linkedin.com/in/cogalanemre',
    email: 'mailto:comengcogalan@gmail.com'
  },
  contact: {
    phone: '+90 551 853 5776',
    email: 'comengcogalan@gmail.com'
  }
}; 