import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Box,
  Paper,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { doctors } from '../data/doctors';

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctor');
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    doctorId: doctorId || '',
    appointmentDate: null,
    appointmentTime: null,
    reason: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (doctorId) {
      setFormData(prev => ({ ...prev, doctorId }));
    }
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.doctorId || !formData.appointmentDate || !formData.appointmentTime) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Format the date and time properly
      const date = formData.appointmentDate ? new Date(formData.appointmentDate).toISOString().split('T')[0] : null;
      const time = formData.appointmentTime ? new Date(formData.appointmentTime).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }) : null;
      
      if (!date || !time) {
        throw new Error('Invalid date or time');
      }
      
      // Get the selected doctor's information
      const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));
      
      if (!selectedDoctor) {
        throw new Error('Selected doctor not found');
      }

      // Create new appointment object
      const newAppointment = {
        id: Date.now(),
        date,
        time,
        doctor: selectedDoctor.name,
        type: formData.reason || 'General Checkup',
        status: 'Scheduled'
      };

      // Get existing appointments from localStorage
      let existingAppointments = [];
      try {
        const savedAppointments = localStorage.getItem('appointments');
        existingAppointments = savedAppointments ? JSON.parse(savedAppointments) : [];
        console.log('Existing appointments:', existingAppointments);
      } catch (error) {
        console.error('Error parsing existing appointments:', error);
        existingAppointments = [];
      }
      
      // Add new appointment
      const updatedAppointments = [...existingAppointments, newAppointment];
      console.log('Updated appointments:', updatedAppointments);
      
      // Save to localStorage
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      console.log('Appointments saved to localStorage');

      setSuccess(true);
      
      // Show success message for a moment before redirecting
      setTimeout(() => {
        navigate('/appointments');
      }, 1500);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Appointment booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: '#333',
            }}
          >
            Book an Appointment
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  name="doctorId"
                  label="Select Doctor"
                  value={formData.doctorId}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Appointment Date"
                  value={formData.appointmentDate}
                  onChange={(newValue) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      appointmentDate: newValue 
                    }));
                  }}
                  disablePast
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      required: true,
                      sx: { 
                        width: '100%',
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: '12px' 
                        } 
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Appointment Time"
                  value={formData.appointmentTime}
                  onChange={(newValue) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      appointmentTime: newValue 
                    }));
                  }}
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      required: true,
                      sx: { 
                        width: '100%',
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: '12px' 
                        } 
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="reason"
                  label="Reason for Visit"
                  value={formData.reason}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    backgroundColor: '#ff3366',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#e62e5c'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Book Appointment'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert 
          onClose={() => setSuccess(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Appointment booked successfully! Redirecting to appointments...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookAppointment; 