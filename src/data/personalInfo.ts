export interface PersonalInfo {
  name: string;
  titles: string[];
  bio: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: 'Emre',
  titles: [
    "Computer Engineer",
    "Full Stack Developer",
    "AI Researcher"
  ],
  bio: 'Küçüklüğümden beri meraklı olan kişiliğimi bir türlü dizginleyemedim. Kafama takılan şeyi araştırmak ve onu çözdükten sonraki mutluluk sanırım beni uzun yıllar bu mesleğe bağlayacak olan en büyük etken',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'mailto:your.email@example.com'
  }
}; 