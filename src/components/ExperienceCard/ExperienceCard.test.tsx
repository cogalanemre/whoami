import { render, screen } from '@testing-library/react';
import ExperienceCard from './index';
import { Experience } from '@/types';

const mockExperience: Experience = {
  company: 'Test Şirketi',
  title: 'Test Pozisyonu',
  startDate: new Date('2023-01-01'),
  endDate: new Date('2023-12-31'),
  location: 'Test Lokasyonu',
  type: 'Tam Zamanlı',
  logo: '/test-logo.png',
  description: ['Test açıklaması 1', 'Test açıklaması 2'],
  skills: ['Test Becerisi 1', 'Test Becerisi 2'],
};

describe('ExperienceCard', () => {
  it('tüm gerekli bilgileri göstermeli', () => {
    render(<ExperienceCard experience={mockExperience} index={0} />);

    // Başlık ve şirket adı kontrolü
    expect(screen.getByText(`${mockExperience.title} @ ${mockExperience.company}`)).toBeInTheDocument();

    // Lokasyon kontrolü
    expect(screen.getByText(/Test Lokasyonu/)).toBeInTheDocument();

    // Tarih kontrolü
    expect(screen.getByText(/Ocak 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Aralık 2023/)).toBeInTheDocument();

    // Açıklamalar kontrolü
    mockExperience.description.forEach(desc => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });

    // Beceriler kontrolü
    mockExperience.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('devam eden iş için "Devam Ediyor" göstermeli', () => {
    const currentJob = {
      ...mockExperience,
      endDate: undefined,
      isCurrentJob: true,
    };

    render(<ExperienceCard experience={currentJob} index={0} />);
    expect(screen.getByText(/Devam Ediyor/)).toBeInTheDocument();
  });
}); 