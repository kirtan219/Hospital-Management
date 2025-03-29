import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    fontWeight: 600,
  }
}));

const StatusChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: '50px',
  fontWeight: 500,
  backgroundColor: 
    color === 'primary' ? '#e8f5e9' : 
    color === 'success' ? '#e3f2fd' : 
    '#ffebee',
  color: 
    color === 'primary' ? '#2e7d32' : 
    color === 'success' ? '#0d47a1' : 
    '#c62828',
}));

const Appointments = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const loadAppointments = () => {
    try {
      console.log('Loading appointments from localStorage');
      const savedAppointments = localStorage.getItem('appointments');
      console.log('Raw localStorage data:', savedAppointments);
      
      if (savedAppointments) {
        // Parse all appointments without filtering
        const allAppointments = JSON.parse(savedAppointments);
        console.log('Parsed appointments:', allAppointments);
        
        // Sort appointments by date and time
        const sortedAppointments = [...allAppointments].sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA - dateB;
        });
        
        console.log('Sorted appointments:', sortedAppointments);
        setAppointments(sortedAppointments);
      } else {
        console.log('No appointments found in localStorage');
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
      setAppointments([]);
    }
  };

  // Load appointments from localStorage on component mount
  useEffect(() => {
    loadAppointments();
  }, []); // No need to depend on currentUser since we're not filtering

  // Refresh appointments when component becomes visible
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focused, reloading appointments');
      loadAppointments();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    const updatedAppointments = appointments.filter(
      appointment => appointment.id !== selectedAppointment.id
    );
    setAppointments(updatedAppointments);
    
    // Update localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    console.log('Appointment cancelled and localStorage updated');
    
    setOpenCancelDialog(false);
  };

  const handleBookNew = () => {
    navigate('/book-appointment');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#333' }}>
            My Appointments
          </Typography>
          
          <Button
            variant="contained"
            onClick={handleBookNew}
            sx={{
              borderRadius: '8px',
              bgcolor: '#ff3366',
              '&:hover': { bgcolor: '#e6005c' },
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Book New Appointment
          </Button>
        </Box>

        <StyledTableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={appointment.status}
                        color={
                          appointment.status === 'Scheduled' ? 'primary' :
                          appointment.status === 'Completed' ? 'success' :
                          'error'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="cancel appointment"
                        onClick={() => handleCancelClick(appointment)}
                        sx={{ color: '#ff3366' }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No appointments found. Book your first appointment now!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        
        <Dialog
          open={openCancelDialog}
          onClose={() => setOpenCancelDialog(false)}
        >
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancelDialog(false)}>No, Keep it</Button>
            <Button onClick={handleConfirmCancel} color="error" variant="contained">
              Yes, Cancel it
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Appointments; 