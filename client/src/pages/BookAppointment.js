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
  Switch,
  IconButton,
  Tooltip
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { doctors } from '../data/doctors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SmsIcon from '@mui/icons-material/Sms';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import NotificationService from '../utils/notificationService';
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
    sms: true,
    instantNotification: true,
    reminderTime: '24' // hours before appointment
  });
  
  const [phoneInput, setPhoneInput] = useState(''); // State for phone input
  const [customMessage, setCustomMessage] = useState(''); // New state for custom message
  const [testingNotification, setTestingNotification] = useState({
    inProgress: false,
    status: null
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
    
    // Check if SMS is enabled but no phone number provided
    if (reminders.sms && !phoneInput && !userData?.phone) {
      setError('Please provide a phone number for SMS reminders');
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

      // Create appointment object
      const appointmentDateTime = new Date(formData.appointmentDate);
      appointmentDateTime.setHours(
        new Date(formData.appointmentTime).getHours(),
        new Date(formData.appointmentTime).getMinutes()
      );
      
      // Use the phone number input if provided
      const phoneNumber = phoneInput || userData?.phone || '';
      
      // Create a new appointment in Firebase
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
          sms: reminders.sms,
          instantNotification: reminders.instantNotification,
          reminderTime: reminders.reminderTime,
          customMessage: customMessage || null
        },
        contactInfo: {
          email: userData?.email || currentUser.email,
          phone: phoneNumber
        }
      };
      
      // Add to Firestore
      const docRef = await addDoc(collection(db, "appointments"), firestoreAppointment);
      
      // Send instant SMS reminder if enabled and phone number available
      let smsResult = null;
      if (reminders.sms && phoneNumber) {
        // Create appointment details object
        const appointmentDetails = {
          patientName: userData?.name || 'Patient',
          doctor: selectedDoctor.name,
          reason: formData.reason || 'General Checkup',
          date: appointmentDateTime,
          time: time
        };
        
        // Send the SMS with optional custom message
        smsResult = await NotificationService.sendSMS(
          phoneNumber, 
          appointmentDetails, 
          customMessage || null
        );
      }
      
      // Show browser notification if enabled
      if (reminders.instantNotification) {
        NotificationService.showBrowserNotification(
          'Appointment Booked', 
          `Your appointment with ${selectedDoctor.name} on ${new Date(appointmentDateTime).toLocaleDateString()} at ${time} has been scheduled.`
        );
      }
      
      setSuccess(true);
      setSnackbar({
        open: true,
        message: "Appointment booked successfully! " + (smsResult ? "SMS reminder sent." : ""),
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
        message: "Failed to book appointment: " + err.message,
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

  // Update handlePhoneChange to handle custom message too
  const handlePhoneChange = (e) => {
    setPhoneInput(e.target.value);
  };
  
  // Add handler for custom message
  const handleMessageChange = (e) => {
    setCustomMessage(e.target.value);
  };

  // Update handleTestNotification to use the simplified API
  const handleTestNotification = async () => {
    setTestingNotification({
      inProgress: true,
      status: null
    });
    
    try {
      // Get the phone number to test
      const phoneNumberToTest = phoneInput || userData?.phone || '';
      
      if (!phoneNumberToTest) {
        throw new Error('Please enter a phone number to test SMS notification');
      }
      
      // Create test appointment details
      const testAppointment = {
        patientName: userData?.name || 'Patient',
        doctor: 'Dr. Test Doctor',
        reason: 'test appointment',
        date: new Date(),
        time: new Date()
      };
      
      // Use customMessage if provided, otherwise use the default template
      const result = await NotificationService.sendSMS(
        phoneNumberToTest, 
        testAppointment, 
        customMessage || null
      );
      
      setTestingNotification({
        inProgress: false,
        status: 'success'
      });
      
      setSnackbar({
        open: true,
        message: "Test SMS sent successfully! Check the preview notification.",
        severity: "success"
      });
      
      // Reset status after a few seconds
      setTimeout(() => {
        setTestingNotification(prev => ({
          ...prev,
          status: null
        }));
      }, 5000);
    } catch (error) {
      console.error('Error sending test SMS:', error);
      
      setTestingNotification({
        inProgress: false,
        status: 'error'
      });
      
      setSnackbar({
        open: true,
        message: "Failed to send test SMS: " + error.message,
        severity: "error"
      });
    }
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
                        checked={reminders.sms} 
                        onChange={handleReminderChange} 
                        name="sms" 
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SmsIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">SMS Reminder</Typography>
                      </Box>
                    }
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={reminders.instantNotification} 
                        onChange={handleReminderChange} 
                        name="instantNotification" 
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SendIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">Browser Notification</Typography>
                      </Box>
                    }
                  />
                </Box>
                
                {reminders.sms && (
                  <Alert 
                    severity="info" 
                    variant="outlined" 
                    sx={{ mb: 2 }}
                    icon={<SmsIcon />}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      SMS Reminder via MessageBird
                    </Typography>
                    <Typography variant="body2">
                      A personalized SMS reminder will be sent to your phone when you book the appointment.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
                      Enter your phone number and customize your message below.
                    </Typography>
                  </Alert>
                )}
                
                {/* Phone number input field */}
                {reminders.sms && (
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number for SMS"
                        value={phoneInput}
                        onChange={handlePhoneChange}
                        placeholder={userData?.phone || "Enter your phone number"}
                        helperText="Enter your phone number to receive SMS reminders"
                        InputProps={{
                          endAdornment: (
                            <Tooltip title="Test MessageBird notification">
                              <IconButton 
                                onClick={handleTestNotification}
                                disabled={testingNotification.inProgress}
                                size="small"
                                color={
                                  testingNotification.status === 'success' ? 'success' : 
                                  testingNotification.status === 'error' ? 'error' : 'default'
                                }
                              >
                                {testingNotification.inProgress ? (
                                  <CircularProgress size={20} />
                                ) : testingNotification.status === 'success' ? (
                                  <CheckCircleIcon />
                                ) : testingNotification.status === 'error' ? (
                                  <ErrorIcon />
                                ) : (
                                  <SendIcon />
                                )}
                              </IconButton>
                            </Tooltip>
                          )
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': { borderRadius: '8px' }
                        }}
                      />
                    </Grid>
                  </Grid>
                )}

                {/* Custom message input field */}
                {reminders.sms && (
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Custom SMS Message (Optional)"
                        value={customMessage}
                        onChange={handleMessageChange}
                        placeholder="Leave blank to use default template, or enter custom message like: Hello [name], your [reason] appointment with Dr. [doctor] is on [date] at [time]"
                        helperText="If left blank, a default message with your appointment details will be sent"
                        sx={{ 
                          '& .MuiOutlinedInput-root': { borderRadius: '8px' }
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
                
                <TextField
                  select
                  fullWidth
                  name="reminderTime"
                  label="Remind me"
                  value={reminders.reminderTime}
                  onChange={handleReminderChange}
                  disabled={!reminders.sms}
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