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
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Divider,
  Switch
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { doctors } from '../data/doctors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

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

  const [reminders, setReminders] = useState({
    email: true,
    sms: false,
    reminderTime: '24' // hours before appointment
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (doctorId) {
      setFormData(prev => ({ ...prev, doctorId }));
    }
  }, [doctorId]);

  // Fetch user data for email and phone
  useEffect(() => {
    if (!currentUser) return;
    
    const fetchUserData = async () => {
      try {
        const usersQuery = query(
          collection(db, "users"), 
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(usersQuery);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

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

      // Create new appointment object for local storage
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
      
      // Add new appointment to localStorage
      const updatedAppointments = [...existingAppointments, newAppointment];
      console.log('Updated appointments:', updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      
      // Add appointment to Firebase with reminder settings
      const appointmentDateTime = new Date(formData.appointmentDate);
      appointmentDateTime.setHours(
        new Date(formData.appointmentTime).getHours(),
        new Date(formData.appointmentTime).getMinutes()
      );
      
      // Create a reminder date based on the reminderTime setting
      const reminderDate = new Date(appointmentDateTime);
      reminderDate.setHours(reminderDate.getHours() - parseInt(reminders.reminderTime));
      
      const firestoreAppointment = {
        userId: currentUser.uid,
        patientName: userData?.name || currentUser.email,
        doctorId: parseInt(formData.doctorId),
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialization,
        appointmentDate: appointmentDateTime,
        reason: formData.reason || 'General Checkup',
        status: 'Scheduled',
        createdAt: new Date(),
        reminders: {
          email: reminders.email,
          sms: reminders.sms,
          reminderDate: reminderDate,
          reminderSent: false
        },
        contactInfo: {
          email: userData?.email || currentUser.email,
          phone: userData?.phone || ''
        }
      };
      
      await addDoc(collection(db, "appointments"), firestoreAppointment);
      
      // Send confirmation message
      if (reminders.email || reminders.sms) {
        const reminderMessage = `
📅 Appointment Confirmation

You have scheduled an appointment with ${selectedDoctor.name} on ${new Date(appointmentDateTime).toLocaleDateString()} at ${time}.

${reminders.email ? '✓ Email reminder will be sent' : ''}
${reminders.sms && userData?.phone ? '✓ SMS reminder will be sent' : ''}
${
  reminders.reminderTime === '24' 
    ? '24 hours before your appointment' 
    : reminders.reminderTime === '48' 
      ? '48 hours before your appointment' 
      : '1 hour before your appointment'
}

Thank you for choosing MediCare Pro!
        `;
        
        // In a real app, this would send an actual email/SMS
        console.log('Confirmation message:', reminderMessage);
      }

      setSuccess(true);
      setSnackbar({
        open: true,
        message: "Appointment booked successfully! Reminders have been set.",
        severity: "success"
      });
      
      // Show success message for a moment before redirecting
      setTimeout(() => {
        navigate('/appointments');
      }, 2000);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Appointment booking error:', err);
      
      setSnackbar({
        open: true,
        message: "Failed to book appointment. Please try again.",
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

  const handleReminderChange = (e) => {
    const { name, checked, value } = e.target;
    setReminders(prev => ({
      ...prev,
      [name]: name === 'reminderTime' ? value : checked
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
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsActiveIcon sx={{ mr: 1, color: '#ff3366' }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Appointment Reminders
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={reminders.email} 
                        onChange={handleReminderChange} 
                        name="email" 
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">Email Reminder</Typography>
                      </Box>
                    }
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={reminders.sms} 
                        onChange={handleReminderChange} 
                        name="sms" 
                        color="primary"
                        disabled={!userData?.phone}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SmsIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">
                          SMS Reminder {!userData?.phone && "(Add phone number in profile)"}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
                
                <TextField
                  select
                  fullWidth
                  name="reminderTime"
                  label="Remind me"
                  value={reminders.reminderTime}
                  onChange={handleReminderChange}
                  disabled={!reminders.email && !reminders.sms}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                    maxWidth: '400px'
                  }}
                >
                  <MenuItem value="1">1 hour before appointment</MenuItem>
                  <MenuItem value="24">24 hours before appointment</MenuItem>
                  <MenuItem value="48">48 hours before appointment</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
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
                {loading ? <CircularProgress size={24} /> : 'Book Appointment'}
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

export default BookAppointment; 