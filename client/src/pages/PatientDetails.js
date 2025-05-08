import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = () => {
      try {
        const savedPatients = localStorage.getItem('patients');
        if (savedPatients) {
          const patients = JSON.parse(savedPatients);
          const foundPatient = patients.find(p => String(p.id) === String(id));
          if (foundPatient) {
            setPatient(foundPatient);
          } else {
            setError('Patient not found');
          }
        } else {
          setError('No patient data available');
        }
      } catch (err) {
        console.error('Error fetching patient:', err);
        setError('Failed to load patient details');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/patients')}
            sx={{ mb: 3 }}
          >
            Back to Patients
          </Button>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/patients')}
          sx={{ mb: 3 }}
        >
          Back to Patients
        </Button>

        <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.1)' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                {patient.name}
              </Typography>
              <Chip
                label={patient.status}
                color={patient.status === 'Active' ? 'success' : 'default'}
                sx={{ mb: 3 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Patient ID
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {patient.id}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {patient.email}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {patient.phone}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Age
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {patient.age} years
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Gender
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {patient.gender}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Last Visit
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {patient.lastVisit || 'No recent visits'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1">
                {patient.address}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/patients/${id}/edit`)}
                >
                  Edit Patient
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#ff3366',
                    '&:hover': { bgcolor: '#e62e5c' }
                  }}
                  onClick={() => navigate('/book-appointment', { state: { patientId: id } })}
                >
                  Book Appointment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default PatientDetails;