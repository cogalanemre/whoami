'use client';

import { Box, Grid, Typography, Card, CardContent, Chip, IconButton, Stack, Avatar } from '@mui/material';
import { GitHub, LinkedIn, Email, Code, Storage, Cloud, Psychology, Speed, Security } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Typewriter from '@/components/Typewriter';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const calculateDuration = (startDate: Date, endDate: Date | undefined | null) => {
  if (!endDate) return '';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Son günü dahil etmek için bir gün ekliyoruz
  end.setDate(end.getDate() + 1);
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  
  // Gün bazında kontrol
  if (end.getDate() < start.getDate()) {
    months--;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  let duration = '';
  if (years > 0) {
    duration += `${years} yıl`;
    if (remainingMonths > 0) duration += ` ${remainingMonths} ay`;
  } else if (remainingMonths > 0) {
    duration += `${remainingMonths} ay`;
  }
  
  return duration;
};

const formatDate = (date: Date | undefined | null) => {
  if (!date) return '';
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const skills = [
  { name: 'Frontend', icon: <Code />, items: ['React', 'Next.js', 'TypeScript', 'Material UI'] },
  { name: 'Backend', icon: <Storage />, items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
  { name: 'DevOps', icon: <Cloud />, items: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'] },
];

interface Experience {
  company: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  isCurrentJob?: boolean;
  location: string;
  type: string;
  logo: string;
}

const staticExperiences: Experience[] = [
  {
    company: 'DGPays',
    title: 'Senior Software Engineering',
    startDate: new Date('2023-01-01'),
    isCurrentJob: true,
    location: 'Ataşehir, İstanbul, Türkiye',
    type: 'Hibrit',
    logo: '/dgpays.png',
  },
  {
    company: 'OBSS',
    title: 'Senior Software Consultant',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2023-01-01'),
    location: 'Ankara, Türkiye',
    type: 'Hibrit',
    logo: '/obss.webp',
  },
  {
    company: 'StreamDelta',
    title: 'Software Engineering',
    startDate: new Date('2021-07-01'),
    endDate: new Date('2021-12-31'),
    location: 'İstanbul, Türkiye',
    type: 'Uzaktan',
    logo: '/streamDelta.jpeg',
  },
  {
    company: 'Sikayetvar.com',
    title: 'Software Engineering',
    startDate: new Date('2018-09-01'),
    endDate: new Date('2020-12-31'),
    location: 'Ankara, Türkiye',
    type: 'Ofisten',
    logo: '/sikayetvar_logo.jpeg',
  }
];

const calculateTotalExperience = (experiences: Experience[]) => {
  let totalMonths = 0;

  experiences.forEach(exp => {
    const start = new Date(exp.startDate);
    const end = exp.isCurrentJob ? new Date() : new Date(exp.endDate!);
    
    // Son günü dahil etmek için bir gün ekliyoruz
    end.setDate(end.getDate() + 1);
    
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    
    // Gün bazında kontrol
    if (end.getDate() < start.getDate()) {
      months--;
    }
    
    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  let duration = '';
  if (years > 0) {
    duration += `${years} yıl`;
    if (remainingMonths > 0) duration += ` ${remainingMonths} ay`;
  } else if (remainingMonths > 0) {
    duration += `${remainingMonths} ay`;
  }

  return duration;
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const experiences = staticExperiences.map(exp => ({
    ...exp,
    endDate: exp.isCurrentJob && currentDate ? currentDate : exp.endDate
  }));

  if (!currentDate) {
    return null;
  }

  return (
    <Box component="main" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Hero Section */}
        <Grid item xs={12}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
              <Avatar
                sx={{
                  width: 300,
                  height: 300,
                  bgcolor: 'transparent'
                }}
                alt="Emre"
                src="/profile.png"
              />
              <Box>
                <Typography variant="h1" gutterBottom>
                  Merhaba, Ben Emre 👋
                </Typography>
                <Typewriter
                  variant="h2"
                  color="primary"
                  gutterBottom
                  texts={[
                    "Computer Engineer",
                    "Full Stack Developer",
                    "AI Researcher"
                  ]}
                  typingDelay={150}
                  pauseDelay={3000}
                />
                <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', maxWidth: '800px', color: 'text.secondary' }}>
                Küçüklüğümden beri meraklı olan kişiliğimi bir türlü dizginleyemedim. Kafama takılan şeyi araştırmak ve onu çözdükten sonraki mutluluk sanırım beni uzun yıllar bu mesleğe bağlayacak olan en büyük etken
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <IconButton color="primary" size="large" sx={{ 
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}>
                    <GitHub />
                  </IconButton>
                  <IconButton color="primary" size="large" sx={{ 
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton color="primary" size="large" sx={{ 
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}>
                    <Email />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </MotionBox>
        </Grid>

        {/* Experience Section */}
        <Grid item xs={12}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 6 }}>
              <Speed sx={{ color: 'primary.main' }} /> 
              Deneyim 
              <Typography 
                component="span" 
                variant="h6" 
                sx={{ 
                  ml: 2,
                  color: 'primary.main',
                  opacity: 0.8,
                  fontStyle: 'italic'
                }}
              >
                ({calculateTotalExperience(experiences)})
              </Typography>
            </Typography>
            <Box sx={{ 
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '20px',
                width: '2px',
                height: '100%',
                background: 'linear-gradient(180deg, #81C9C9 0%, rgba(129, 201, 201, 0.2) 100%)',
              }
            }}>
              <Stack spacing={6}>
                {/* DGPays */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  position: 'relative',
                  gap: 3
                }}>
                  <Avatar
                    src="/dgpays.png"
                    alt="DGPays"
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      left: -30,
                      top: 10,
                      bgcolor: 'transparent',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      zIndex: 1,
                      '& img': {
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }
                    }}
                  />
                  <Card sx={{ 
                    flex: 1,
                    ml: 12,
                    background: 'rgba(36, 36, 36, 0.5)',
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Senior Software Engineering
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {experiences[0].company} • {formatDate(experiences[0].startDate)} - {experiences[0].endDate === currentDate ? 'Günümüz' : formatDate(experiences[0].endDate)} ({calculateDuration(experiences[0].startDate, experiences[0].endDate)})
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                        {experiences[0].location} • {experiences[0].type}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        • C# ve .NET Core kullanarak API&apos;ler geliştirdim<br />
                        • JavaScript ve DevExtreme ile kullanıcı arayüzleri oluşturdum<br />
                        • Ödeme kolaylaştırıcı entegrasyonu, kampanya modülü ve doğrudan operatör faturalandırma (DCB) modülü gibi çeşitli projelerde çalıştım<br />
                        • MSSQL ile veritabanı yönetimi yaptım<br />
                        • Agile Scrum metodolojisini takip ettim, görev ve proje yönetimi için JIRA kullandım
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip size="small" label="Jenkins" variant="outlined" />
                        <Chip size="small" label="CI/CD" variant="outlined" />
                        <Chip size="small" label="PL/SQL" variant="outlined" />
                        <Chip size="small" label="JavaScript" variant="outlined" />
                        <Chip size="small" label="GitLab" variant="outlined" />
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>

                {/* OBSS */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  position: 'relative',
                  gap: 3
                }}>
                  <Avatar
                    src="/obss.webp"
                    alt="OBSS"
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      left: -30,
                      top: 10,
                      bgcolor: 'transparent',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      zIndex: 1,
                      '& img': {
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }
                    }}
                  />
                  <Card sx={{ 
                    flex: 1,
                    ml: 12,
                    background: 'rgba(36, 36, 36, 0.5)',
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Senior Software Consultant
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {experiences[1].company} • {formatDate(experiences[1].startDate)} - {formatDate(experiences[1].endDate)} ({calculateDuration(experiences[1].startDate, experiences[1].endDate)})
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                        {experiences[1].location} • {experiences[1].type}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        • Aselsan&apos;da dış kaynaklı Kıdemli Yazılım Danışmanı olarak çalıştım<br />
                        • Java 8+, Spring ve Hibernate kullanarak mikroservisler geliştirdim<br />
                        • Kafka kullanarak servisler arası event-driven iletişimi uyguladım<br />
                        • React kullanarak single-page uygulamalar geliştirdim<br />
                        • PostgreSQL ile veritabanı yönetimi yaptım<br />
                        • Servisleri Kubernetes&apos;e deploy ettim
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip size="small" label="Java" variant="outlined" />
                        <Chip size="small" label="Spring" variant="outlined" />
                        <Chip size="small" label="React" variant="outlined" />
                        <Chip size="small" label="Kubernetes" variant="outlined" />
                        <Chip size="small" label="Kafka" variant="outlined" />
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>

                {/* StreamDelta */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  position: 'relative',
                  gap: 3
                }}>
                  <Avatar
                    src="/streamDelta.jpeg"
                    alt="StreamDelta"
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      left: -30,
                      top: 10,
                      bgcolor: 'transparent',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      zIndex: 1,
                      '& img': {
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }
                    }}
                  />
                  <Card sx={{ 
                    flex: 1,
                    ml: 12,
                    background: 'rgba(36, 36, 36, 0.5)',
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Software Engineering
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {experiences[2].company} • {formatDate(experiences[2].startDate)} - {formatDate(experiences[2].endDate)} ({calculateDuration(experiences[2].startDate, experiences[2].endDate)})
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                        {experiences[2].location} • {experiences[2].type}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        • Vodafone projelerinde dış kaynaklı geliştirici olarak çalıştım<br />
                        • Java, Spring Boot ve Hibernate kullanarak mikroservisler geliştirdim<br />
                        • Camunda ve BPMN 2.0 notasyonu kullanarak İş Yönetimi Mikroservisinden sorumlu oldum<br />
                        • Oracle DB, MongoDB ve Redis ile veri depolama ve önbellekleme yaptım<br />
                        • Jenkins kullanarak mikroservisleri OpenShift&apos;e deploy ettim
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip size="small" label="Java" variant="outlined" />
                        <Chip size="small" label="Spring Boot" variant="outlined" />
                        <Chip size="small" label="Camunda" variant="outlined" />
                        <Chip size="small" label="MongoDB" variant="outlined" />
                        <Chip size="small" label="Redis" variant="outlined" />
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>

                {/* Sikayetvar */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  position: 'relative',
                  gap: 3
                }}>
                  <Avatar
                    src="/sikayetvar_logo.jpeg"
                    alt="Sikayetvar"
                    sx={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      left: -30,
                      top: 10,
                      bgcolor: 'transparent',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      zIndex: 1,
                      '& img': {
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }
                    }}
                  />
                  <Card sx={{ 
                    flex: 1,
                    ml: 12,
                    background: 'rgba(36, 36, 36, 0.5)',
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Software Engineering
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {experiences[3].company} • {formatDate(experiences[3].startDate)} - {formatDate(experiences[3].endDate)} ({calculateDuration(experiences[3].startDate, experiences[3].endDate)})
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                        {experiences[3].location} • {experiences[3].type}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        • Java ve Spring Boot kullanarak mikroservisler geliştirdim<br />
                        • Şikayetvar&apos;ın altyapısını yeniden geliştirme projesine katıldım<br />
                        • Elasticsearch kullanarak otomatik tamamlama mikroservisi geliştirdim<br />
                        • RESTful iletişim ile servisler geliştirdim<br />
                        • MySQL ile veritabanı yönetimi yaptım<br />
                        • Jenkins kullanarak mikroservisleri Google Cloud&apos;a deploy ettim
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip size="small" label="Java" variant="outlined" />
                        <Chip size="small" label="Spring Boot" variant="outlined" />
                        <Chip size="small" label="Elasticsearch" variant="outlined" />
                        <Chip size="small" label="MySQL" variant="outlined" />
                        <Chip size="small" label="Google Cloud" variant="outlined" />
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Grid>

        {/* Skills Section */}
        <Grid item xs={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CardContent>
              <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Psychology sx={{ color: 'primary.main' }} /> Yetenekler
              </Typography>
              <Grid container spacing={3}>
                {skills.map((category) => (
                  <Grid item xs={12} md={4} key={category.name}>
                    <Card sx={{ height: '100%', background: 'rgba(36, 36, 36, 0.5)' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {category.icon} {category.name}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {category.items.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              color="primary"
                              variant="outlined"
                              sx={{ m: 0.5 }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Projects Section */}
        <Grid item xs={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CardContent>
              <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ color: 'primary.main' }} /> Projeler
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ height: '100%', background: 'rgba(36, 36, 36, 0.5)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                        E-Ticaret Platformu
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Next.js, TypeScript ve MongoDB kullanarak geliştirilen modern bir e-ticaret çözümü
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ height: '100%', background: 'rgba(36, 36, 36, 0.5)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                        AI Chatbot
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Python ve TensorFlow kullanarak geliştirilen yapay zeka destekli müşteri hizmetleri chatbotu
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
