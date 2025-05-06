import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';

const FeedbackRating = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [doctorId, setDoctorId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock doctor list - in a real app, this would come from the database
  const doctors = [
    { id: 'dr1', name: 'Dr. Sarah Johnson' },
    { id: 'dr2', name: 'Dr. Michael Chen' },
    { id: 'dr3', name: 'Dr. Emily Wilson' },
    { id: 'dr4', name: 'Dr. James Martinez' }
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (rating === 0 || !doctorId || feedback.trim() === '') {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      // Save feedback to localStorage
      const savedFeedback = await saveFeedback({
        userId: 'mockUserId',
        userEmail: 'mock@example.com',
        doctorId,
        doctorName: doctors.find(d => d.id === doctorId)?.name || '',
        rating,
        feedback,
        timestamp: new Date().toISOString()
      });

      setSnackbar({
        open: true,
        message: 'Thank you for your feedback!',
        severity: 'success'
      });
      
      // Reset form
      setRating(0);
      setDoctorId('');
      setFeedback('');
      
      // Close dialog
      handleClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSnackbar({
        open: true,
        message: 'Failed to submit feedback. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Mock function to save feedback to localStorage
  const saveFeedback = async (feedback) => {
    try {
      // Get existing feedback or initialize empty array
      const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
      
      // Add new feedback with timestamp
      const newFeedback = {
        ...feedback,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      existingFeedback.push(newFeedback);
      
      // Save back to localStorage
      localStorage.setItem('feedback', JSON.stringify(existingFeedback));
      
      return newFeedback;
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw error;
    }
  };

  return (
    <Box sx={{ py: 2, bgcolor: '#f5f5f5', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          px: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Your Feedback Matters
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 600 }}>
          Help us improve our services by sharing your experience with our medical professionals
        </Typography>
        <Button
          variant="contained"
          startIcon={<FeedbackIcon />}
          onClick={handleClickOpen}
          sx={{
            bgcolor: '#ff3366',
            '&:hover': { bgcolor: '#e62e5c' }
          }}
        >
          Rate & Give Feedback
        </Button>
      </Box>

      {/* Feedback Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Rate Your Experience
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
                <Select
                  labelId="doctor-select-label"
                  value={doctorId}
                  label="Select Doctor"
                  onChange={(e) => setDoctorId(e.target.value)}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Your Rating:
                </Typography>
                <Rating
                  name="doctor-rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your experience with this doctor..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: '#ff3366',
              '&:hover': { bgcolor: '#e62e5c' }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Feedback'}
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default FeedbackRating; 