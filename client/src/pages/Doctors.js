import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Rating,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import { doctors } from '../data/doctors';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
          Our Medical Specialists
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search doctors by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '12px',
              backgroundColor: 'white',
            }
          }}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3}>
          {filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 360,
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <CardMedia
                    component="img"
                    image={doctor.image}
                    alt={doctor.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      padding: '8px'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                    {doctor.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mb: 2 }}>
                    {doctor.specialization}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating
                      value={doctor.rating}
                      readOnly
                      precision={0.1}
                      size="small"
                      icon={<StarIcon fontSize="inherit" />}
                      emptyIcon={<StarIcon fontSize="inherit" />}
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({doctor.rating})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {doctor.patients}+ Patients
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {doctor.experience} Experience
                  </Typography>
                  <Chip
                    label={`Available ${doctor.availability}`}
                    size="small"
                    sx={{
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      fontWeight: 500,
                      mb: 2
                    }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/book-appointment?doctor=${doctor.id}`)}
                    sx={{
                      mt: 2,
                      backgroundColor: '#ff3366',
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#e62e5c'
                      }
                    }}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Doctors; 