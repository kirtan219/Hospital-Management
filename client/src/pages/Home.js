import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <CalendarMonthIcon sx={{ fontSize: 40, color: '#ff3366' }} />,
      title: 'Easy Appointment Booking',
      description: 'Schedule appointments with doctors quickly and easily through our intuitive booking system'
    },
    {
      icon: <MonitorHeartIcon sx={{ fontSize: 40, color: '#ff3366' }} />,
      title: 'Health Monitoring',
      description: 'Track your health records and medical history in one secure place'
    },
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40, color: '#ff3366' }} />,
      title: 'Expert Medical Care',
      description: 'Access to qualified healthcare professionals and specialists'
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#ff3366' }} />,
      title: '24/7 Availability',
      description: 'Round-the-clock access to medical services and emergency care'
    },
    {
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#ff3366' }} />,
      title: 'Secure Health Records',
      description: 'Your medical data is protected with state-of-the-art security measures'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/hospital-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 8,
          mb: 6,
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    color: '#333',
                    lineHeight: 1.2
                  }}
                >
                  Welcome to Hospital Management System
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: '#666',
                    lineHeight: 1.5
                  }}
                >
                  Providing quality healthcare services with state-of-the-art facilities
                </Typography>
                <Button
                  component={RouterLink}
                  to="/book-appointment"
                  variant="contained"
                  size="large"
                  startIcon={<CalendarMonthIcon />}
                  sx={{
                    backgroundColor: '#ff3366',
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#e62e5c',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 51, 102, 0.4)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Book Appointment
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 4
                }}
              >
                <LocalHospitalIcon 
                  sx={{ 
                    fontSize: '280px', 
                    color: '#ff3366',
                    opacity: 0.9
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: '#333'
            }}
          >
            Our Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
                      backgroundColor: alpha('#ff3366', 0.02),
                    },
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 3
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      align="center"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: '#333',
                        mb: 2
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 