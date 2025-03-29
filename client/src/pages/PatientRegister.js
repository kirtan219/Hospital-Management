import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, MenuItem, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill all required fields');
      return;
    }

    try {
      // Create a new patient object
      const newPatient = {
        id: Date.now(), // Use timestamp as ID
        name: `${formData.firstName} ${formData.lastName}`,
        age: calculateAge(formData.dob),
        gender: formData.gender,
        phone: formData.phone,
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'Active',
        email: formData.email,
        dob: formData.dob,
        address: formData.address
      };

      // Get existing patients from localStorage
      const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]');
      
      // Add new patient
      const updatedPatients = [...existingPatients, newPatient];
      
      // Save to localStorage
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      console.log('Patient saved to localStorage:', newPatient);

      // Show success message
      setSuccess(true);
      setError('');
      
      // Redirect to patients list after delay
      setTimeout(() => {
        navigate('/patients');
      }, 1500);
    } catch (err) {
      console.error('Error saving patient:', err);
      setError('Failed to register patient. Please try again.');
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Patient Registration
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Patient registered successfully!</Alert>
      </Snackbar>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="date"
              name="dob"
              label="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                borderRadius: '8px',
                bgcolor: '#ff3366',
                '&:hover': { bgcolor: '#e6005c' },
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PatientRegister; 