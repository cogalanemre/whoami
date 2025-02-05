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
    location: {
      lat: number;
      lng: number;
    };
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
    github: 'https://github.com/cogalanemre',
    linkedin: 'https://www.linkedin.com/in/cogalanemre',
    email: 'mailto:comengcogalan@gmail.com'
  },
  contact: {
    address: 'Etimesgut, Ankara, Türkiye',
    phone: '+90 551 853 5776',
    email: 'comengcogalan@gmail.com',
    location: {
      lat: 39.9582,
      lng: 32.6757
    }
  }
}; 