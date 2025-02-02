export interface Education {
  school: string;
  department?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  type: 'university' | 'highschool' | 'prep';
}

export const education: Education[] = [
  {
    school: 'Sakarya Üniversitesi',
    department: 'Bilgisayar Mühendisliği',
    location: 'Sakarya, Türkiye',
    startDate: new Date('2014-09-01'),
    endDate: new Date('2018-06-30'),
    type: 'university'
  },
  {
    school: 'Çukurova Üniversitesi',
    department: 'İngilizce Hazırlık',
    location: 'Adana, Türkiye',
    startDate: new Date('2013-09-01'),
    endDate: new Date('2014-06-30'),
    type: 'prep'
  },
  {
    school: 'Çankırı Gazi Anadolu Lisesi',
    location: 'Çankırı, Türkiye',
    startDate: new Date('2009-09-01'),
    endDate: new Date('2013-06-30'),
    type: 'highschool'
  }
]; 