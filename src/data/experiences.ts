import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'dgpays',
    company: 'DGPays',
    title: 'Senior Software Engineer',
    startDate: new Date('2023-01-01'),
    endDate: undefined,
    isCurrentJob: true,
    location: 'Ataşehir, İstanbul, Türkiye',
    type: 'Hibrit',
    logo: '/dgpays.png',
    description: [
      'C# ve .NET Core kullanarak API\'ler geliştirdim',
      'JavaScript ve DevExtreme ile kullanıcı arayüzleri oluşturdum',
      'Ödeme kolaylaştırıcı entegrasyonu, kampanya modülü ve doğrudan operatör faturalandırma (DCB) modülü gibi çeşitli projelerde çalıştım',
      'MSSQL ile veritabanı yönetimi yaptım',
      'Agile Scrum metodolojisini takip ettim, görev ve proje yönetimi için JIRA kullandım'
    ],
    skills: ['Jenkins', 'CI/CD', 'PL/SQL', 'JavaScript', 'GitLab']
  },
  {
    id: 'obss',
    company: 'OBSS',
    title: 'Senior Software Consultant',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2023-01-01'),
    location: 'Ankara, Türkiye',
    type: 'Hibrit',
    logo: '/obss.webp',
    description: [
      'Aselsan\'da dış kaynaklı Kıdemli Yazılım Danışmanı olarak çalıştım',
      'Java 8+, Spring ve Hibernate kullanarak mikroservisler geliştirdim',
      'Kafka kullanarak servisler arası event-driven iletişimi uyguladım',
      'React kullanarak single-page uygulamalar geliştirdim',
      'PostgreSQL ile veritabanı yönetimi yaptım',
      'Servisleri Kubernetes\'e deploy ettim'
    ],
    skills: ['Java', 'Spring', 'React', 'Kubernetes', 'Kafka']
  },
  {
    id: 'streamDelta',
    company: 'StreamDelta',
    title: 'Software Engineer',
    startDate: new Date('2021-07-01'),
    endDate: new Date('2021-12-31'),
    location: 'İstanbul, Türkiye',
    type: 'Uzaktan',
    logo: '/streamDelta.jpeg',
    description: [
      'Vodafone projelerinde dış kaynaklı geliştirici olarak çalıştım',
      'Java, Spring Boot ve Hibernate kullanarak mikroservisler geliştirdim',
      'Camunda ve BPMN 2.0 notasyonu kullanarak İş Yönetimi Mikroservisinden sorumlu oldum',
      'Oracle DB, MongoDB ve Redis ile veri depolama ve önbellekleme yaptım',
      'Jenkins kullanarak mikroservisleri OpenShift\'e deploy ettim'
    ],
    skills: ['Java', 'Spring Boot', 'Camunda', 'MongoDB', 'Redis']
  },
  {
    id: 'sikayetvar',
    company: 'Sikayetvar.com',
    title: 'Software Engineer',
    startDate: new Date('2018-09-01'),
    endDate: new Date('2020-12-31'),
    location: 'Ankara, Türkiye',
    type: 'Ofisten',
    logo: '/sikayetvar_logo.jpeg',
    description: [
      'Java ve Spring Boot kullanarak mikroservisler geliştirdim',
      'Şikayetvar\'ın altyapısını yeniden geliştirme projesine katıldım',
      'Elasticsearch kullanarak otomatik tamamlama mikroservisi geliştirdim',
      'RESTful iletişim ile servisler geliştirdim',
      'MySQL ile veritabanı yönetimi yaptım',
      'Jenkins kullanarak mikroservisleri Google Cloud\'a deploy ettim'
    ],
    skills: ['Java', 'Spring Boot', 'Elasticsearch', 'MySQL', 'Google Cloud']
  }
]; 