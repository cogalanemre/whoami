export interface Education {
  id: 'sakarya' | 'cukurova' | 'gazi';
  startDate: Date;
  endDate: Date;
  type: 'university' | 'highschool' | 'prep';
}

export const education: Education[] = [
  {
    id: 'sakarya',
    startDate: new Date('2014-09-01'),
    endDate: new Date('2018-06-30'),
    type: 'university'
  },
  {
    id: 'cukurova',
    startDate: new Date('2013-09-01'),
    endDate: new Date('2014-06-30'),
    type: 'prep'
  },
  {
    id: 'gazi',
    startDate: new Date('2009-09-01'),
    endDate: new Date('2013-06-30'),
    type: 'highschool'
  }
]; 