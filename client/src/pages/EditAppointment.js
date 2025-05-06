import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  MenuItem
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { doctors } from '../data/doctors';

// Mock database functions
const localStorageDB = {
  getAppointments: () => {
    try {
      const savedData = localStorage.getItem('appointments');
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },
  saveAppointments: (appointments) => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  },
  getAppointment: (id) => {
    const appointments = localStorageDB.getAppointments();
    return appointments.find(a => a.id === id);
  },
  updateAppointment: (id, updates) => {
    const appointments = localStorageDB.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updates };
      localStorageDB.saveAppointments(appointments);
      return appointments[index];
    }
    return null;
  }
};

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentDate: null,
    appointmentTime: null,
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const appointment = localStorageDB.getAppointment(id);
        
        if (!appointment) {
          throw new Error('Appointment not found');
        }

        setFormData({
          doctorId: appointment.doctorId.toString(),
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentDate,
          reason: appointment.reason || '',
        });
      } catch (err) {
        setError('Failed to fetch appointment details');
        console.error('Error fetching appointment:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

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
      const appointmentDateTime = new Date(formData.appointmentDate);
      appointmentDateTime.setHours(
        new Date(formData.appointmentTime).getHours(),
        new Date(formData.appointmentTime).getMinutes()
      );
      
      // Get the selected doctor's information
      const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));
      
      if (!selectedDoctor) {
        throw new Error('Selected doctor not found');
      }

      // Update appointment in localStorage
      const updatedAppointment = localStorageDB.updateAppointment(id, {
        doctorId: parseInt(formData.doctorId),
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialization,
        appointmentDate: appointmentDateTime,
        reason: formData.reason || 'General Checkup',
        updatedAt: new Date()
      });
      
      if (!updatedAppointment) {
        throw new Error('Failed to update appointment');
      }
      
      setSuccess(true);
      setSnackbar({
        open: true,
        message: "Appointment updated successfully!",
        severity: "success"
      });
      
      // Show success message for a moment before redirecting
      setTimeout(() => {
        navigate('/appointments');
      }, 2000);
    } catch (err) {
      setError('Failed to update appointment. Please try again.');
      console.error('Appointment update error:', err);
      
      setSnackbar({
        open: true,
        message: "Failed to update appointment: " + err.message,
        severity: "error"
      });
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

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
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
            Edit Appointment
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
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
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
                          borderRadius: '8px' 
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
                          borderRadius: '8px' 
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
                  placeholder="Please describe your symptoms or reason for consultation"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#ff3366',
                  '&:hover': { bgcolor: '#e62e5c' }
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Update Appointment'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditAppointment; 