import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        bgcolor: 'primary.main',
        color: 'white',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalHospitalIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Hospital Management
              </Typography>
            </Box>
            <Typography variant="body2">
              Providing quality healthcare solutions for hospitals and clinics.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/doctors" color="inherit" display="block" sx={{ mb: 1 }}>
              Doctors
            </Link>
            <Link component={RouterLink} to="/appointments" color="inherit" display="block" sx={{ mb: 1 }}>
              Appointments
            </Link>
            <Link component={RouterLink} to="/book-appointment" color="inherit" display="block">
              Book Appointment
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              123 Medical Avenue, Healthville
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@hospitalmanagementsystem.com
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Hospital Management System. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 