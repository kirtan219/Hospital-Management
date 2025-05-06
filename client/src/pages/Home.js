import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Stack, Card, CardContent, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#f6f7fb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#2D3A8C', 
          py: 8, 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: { xs: '0 0 24px 24px', md: '0 0 48px 48px' },
          boxShadow: '0 4px 20px rgba(45, 58, 140, 0.15)',
        }}
      >
        {/* Decorative shapes */}
        <Box sx={{ position: 'absolute', right: '10%', top: 20, width: 80, height: 80, bgcolor: '#1BC5B4', borderRadius: '50%', opacity: 0.1 }} />
        <Box sx={{ position: 'absolute', left: '5%', bottom: 20, width: 120, height: 120, bgcolor: '#1BC5B4', borderRadius: '50%', opacity: 0.1 }} />
        <Box sx={{ position: 'absolute', right: '20%', bottom: -40, width: 100, height: 100, bgcolor: '#fff', borderRadius: '50%', opacity: 0.1 }} />
        
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 2 }}>
                Welcome to MediCare Pro 
                <Box component="span" sx={{ color: '#1BC5B4', display: 'block', mt: 1 }}>
                  Where Care Meets Excellence
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400, mb: 4, maxWidth: 600 }}>
                Our state-of-the-art facility provides comprehensive healthcare services with a focus on patient comfort, advanced technology, and exceptional medical expertise.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained"
                  sx={{ 
                    bgcolor: '#1BC5B4',
                    color: '#fff',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow: 2,
                    '&:hover': { bgcolor: '#159e8c' }
                  }}
                  onClick={() => navigate('/book-appointment')}
                >
                  Book Appointment
                </Button>
                <Button 
                  variant="outlined"
                  sx={{ 
                    color: '#fff',
                    borderColor: '#fff',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: 16,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                  onClick={() => navigate('/doctors')}
                >
                  Find a Doctor
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative', height: '100%', display: { xs: 'none', md: 'block' } }}>
                {/* Hospital stats cards floating */}
                <Paper 
                  elevation={3}
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    right: 40,
                    p: 2,
                    bgcolor: '#fff',
                    borderRadius: 3,
                    width: 180
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#555' }}>Expert Doctors</Typography>
                  <Typography variant="h4" sx={{ color: '#2D3A8C', fontWeight: 700 }}>150+</Typography>
                </Paper>
                
                <Paper 
                  elevation={3}
                  sx={{ 
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    p: 2,
                    bgcolor: '#fff',
                    borderRadius: 3,
                    width: 180
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#555' }}>Years of Excellence</Typography>
                  <Typography variant="h4" sx={{ color: '#2D3A8C', fontWeight: 700 }}>25+</Typography>
                </Paper>
                
                <Paper 
                  elevation={3}
                  sx={{ 
                    position: 'absolute',
                    top: 100,
                    left: 60,
                    p: 2,
                    bgcolor: '#fff',
                    borderRadius: 3,
                    width: 180
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#555' }}>Patient Satisfaction</Typography>
                  <Typography variant="h4" sx={{ color: '#2D3A8C', fontWeight: 700 }}>98%</Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Hospital Services Section */}
      <Container sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 2, fontWeight: 800, color: '#2D3A8C' }}>
          Our Services
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 6, color: '#555', maxWidth: 700, mx: 'auto' }}>
          MediCare Pro offers a wide range of medical services with cutting-edge technology and expert healthcare professionals
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <MedicalServicesIcon sx={{ fontSize: 40, color: '#1BC5B4' }} />,
              title: 'Primary Care',
              desc: 'Comprehensive healthcare services for routine check-ups, preventive care, and managing chronic conditions.'
            },
            {
              icon: <LocalHospitalIcon sx={{ fontSize: 40, color: '#1BC5B4' }} />,
              title: 'Emergency Care',
              desc: '24/7 emergency services with rapid response teams for critical and urgent medical situations.'
            },
            {
              icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#1BC5B4' }} />,
              title: 'Specialized Treatments',
              desc: 'Advanced treatment options for complex medical conditions across various specialties.'
            },
            {
              icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#1BC5B4' }} />,
              title: 'Diagnostic Services',
              desc: 'State-of-the-art diagnostic facilities including imaging, laboratory tests, and specialized screenings.'
            }
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(27, 197, 180, 0.1)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: '#e6faf8', width: 80, height: 80, mb: 2 }}>
                    {service.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2D3A8C' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {service.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Container sx={{ my: 8, textAlign: 'center' }}>
        <Box 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto',
            mb: 5
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#2D3A8C', mb: 3 }}>
            Ready to Experience Expert Healthcare?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#555', fontWeight: 400 }}>
            Book an appointment today and let us take care of your health needs
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#1BC5B4',
              color: '#fff',
              px: 6,
              py: 2,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: 18,
              boxShadow: 3,
              '&:hover': { bgcolor: '#159e8c' }
            }}
            onClick={() => navigate('/book-appointment')}
          >
            Book Appointment Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
