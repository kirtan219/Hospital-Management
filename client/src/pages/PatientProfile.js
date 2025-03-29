import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button } from '@mui/material';

const PatientProfile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Personal Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Patient ID: #12345
                </Typography>
              </Box>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> John Doe
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> john.doe@example.com
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> +1 234 567 8900
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date of Birth:</strong> 01/01/1990
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> Male
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Medical History
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Recent Appointments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Last Visit: March 15, 2024 - Dr. Smith
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Next Appointment: March 30, 2024 - Dr. Johnson
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Current Medications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Blood Pressure Medication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Vitamin D Supplement
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Allergies
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Penicillin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Pollen
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientProfile; 