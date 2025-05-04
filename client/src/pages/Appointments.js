import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DownloadIcon from '@mui/icons-material/Download';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';
import { db } from '../firebase';
import { collection, getDocs, query, where, updateDoc, doc, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

// Dummy data for appointments
const dummyAppointments = [
  { 
    id: 1, 
    doctor: 'Dr. Sarah Johnson', 
    date: '2023-05-12', 
    time: '10:00', 
    type: 'General Checkup',
    status: 'Completed',
    hasBill: true,
    billAmount: 150,
    billPaid: true
  },
  { 
    id: 2, 
    doctor: 'Dr. Michael Chen', 
    date: '2023-05-15', 
    time: '14:30', 
    type: 'Dermatology Consultation',
    status: 'Upcoming',
    hasBill: false,
    billAmount: 200,
    billPaid: false
  },
  { 
    id: 3, 
    doctor: 'Dr. Emily Wilson', 
    date: '2023-04-28', 
    time: '11:15', 
    type: 'Follow-up Consultation',
    status: 'Completed',
    hasBill: true,
    billAmount: 125,
    billPaid: false
  },
  { 
    id: 4, 
    doctor: 'Dr. James Martinez', 
    date: '2023-05-20', 
    time: '09:30', 
    type: 'Blood Test',
    status: 'Upcoming',
    hasBill: false,
    billAmount: 80,
    billPaid: false
  }
];

// Invoice generation data
const generateInvoiceItems = (appointment) => {
  // In a real app, these would come from a database
  const consultationFee = appointment.type.includes('Consult') ? 120 : 100;
  const labFee = appointment.type.includes('Test') ? 80 : 0;
  const medicationFee = Math.random() > 0.5 ? 30 : 0;
  
  const items = [
    {
      description: `Consultation with ${appointment.doctor}`,
      amount: consultationFee
    }
  ];
  
  if (labFee > 0) {
    items.push({
      description: 'Laboratory Tests',
      amount: labFee
    });
  }
  
  if (medicationFee > 0) {
    items.push({
      description: 'Prescribed Medication',
      amount: medicationFee
    });
  }
  
  return items;
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        // First try to fetch from Firebase
        if (currentUser) {
          const q = query(
            collection(db, "appointments"),
            where("userId", "==", currentUser.uid)
          );
          
          const querySnapshot = await getDocs(q);
          const firestoreAppointments = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            firestoreAppointments.push({
              id: doc.id,
              doctor: data.doctorName,
              date: data.appointmentDate ? new Date(data.appointmentDate.seconds * 1000).toISOString().split('T')[0] : '',
              time: data.appointmentDate ? new Date(data.appointmentDate.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
              type: data.reason || 'Consultation',
              status: data.status || 'Upcoming',
              hasBill: data.billing?.invoiceGenerated || false,
              billAmount: data.billing?.amount || 0,
              billPaid: data.billing?.paid || false,
              billing: data.billing || null
            });
          });
          
          if (firestoreAppointments.length > 0) {
            setAppointments(firestoreAppointments);
            setLoading(false);
            return;
          }
        }
        
        // Fallback to localStorage if no Firebase data
        try {
          const savedAppointments = localStorage.getItem('appointments');
          if (savedAppointments) {
            const parsed = JSON.parse(savedAppointments);
            // Add billing info to local storage appointments if not present
            const enhanced = parsed.map(app => ({
              ...app,
              hasBill: app.hasBill !== undefined ? app.hasBill : (app.status === 'Completed'),
              billAmount: app.billAmount || Math.floor(Math.random() * 150) + 50,
              billPaid: app.billPaid || false
            }));
            setAppointments(enhanced);
          } else {
            // Use dummy data as last resort
            setAppointments(dummyAppointments);
          }
        } catch (error) {
          console.error('Error loading appointments from localStorage:', error);
          setAppointments(dummyAppointments);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load appointments',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredAppointments = selectedTab === 0
    ? appointments
    : selectedTab === 1
      ? appointments.filter(app => app.status === 'Upcoming')
      : appointments.filter(app => app.status === 'Completed');

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const handleViewInvoice = (appointment) => {
    setSelectedAppointment(appointment);
    // Generate or load invoice items
    const items = appointment.billing?.items || generateInvoiceItems(appointment);
    setInvoiceItems(items);
    setInvoiceDialogOpen(true);
  };

  const handleSendInvoice = async (appointment) => {
    try {
      setLoading(true);
      
      // In a real app, this would trigger an email with the invoice
      console.log(`Sending invoice for appointment ${appointment.id} to user email`);
      
      // Update Firebase if the appointment exists there
      if (appointment.id && appointment.id.length > 10) {  // Assuming Firebase IDs are longer
        // Generate invoice items if not already present
        const items = appointment.billing?.items || generateInvoiceItems(appointment);
        const total = items.reduce((sum, item) => sum + item.amount, 0);
        
        // Update appointment in Firebase with billing info
        const appointmentRef = doc(db, "appointments", appointment.id);
        await updateDoc(appointmentRef, {
          "billing.invoiceGenerated": true,
          "billing.amount": total,
          "billing.paid": appointment.billPaid,
          "billing.items": items,
          "billing.invoiceSent": true,
          "billing.invoiceSentDate": Timestamp.now()
        });
      }
      
      setSnackbar({
        open: true,
        message: 'Invoice has been sent to your email',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error sending invoice:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send invoice',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = (appointment) => {
    // In a real app, this would generate and download a PDF
    console.log(`Downloading invoice for appointment ${appointment.id}`);
    
    setSnackbar({
      open: true,
      message: 'Invoice downloaded successfully',
      severity: 'success'
    });
  };

  const handleCloseInvoiceDialog = () => {
    setInvoiceDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const calculateInvoiceTotal = () => {
    return invoiceItems.reduce((total, item) => total + item.amount, 0);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4caf50';
      case 'Upcoming':
        return '#2196f3';
      case 'Cancelled':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  // Get payment status
  const getPaymentStatus = (appointment) => {
    if (!appointment.hasBill) return 'No Bill';
    return appointment.billPaid ? 'Paid' : 'Unpaid';
  };

  // Get payment status color
  const getPaymentStatusColor = (appointment) => {
    if (!appointment.hasBill) return '#757575';
    return appointment.billPaid ? '#4caf50' : '#f44336';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Grid item>
            <Typography variant="h3" component="h1" fontWeight={700} color="#333">
              Appointments
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage your scheduled appointments
            </Typography>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              onClick={handleBookAppointment}
              sx={{
                bgcolor: '#ff3366',
                '&:hover': { bgcolor: '#e62e5c' }
              }}
            >
              Book New Appointment
            </Button>
          </Grid>
        </Grid>
        
        <Paper sx={{ width: '100%', mb: 4 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontWeight: 500
              }
            }}
          >
            <Tab label="All Appointments" />
            <Tab label="Upcoming" />
            <Tab label="Past" />
          </Tabs>
        </Paper>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredAppointments.length > 0 ? (
          <Grid container spacing={3}>
            {filteredAppointments.map((appointment) => (
              <Grid item xs={12} key={appointment.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: 0, 
                      bottom: 0, 
                      width: '6px', 
                      bgcolor: getStatusColor(appointment.status) 
                    }} 
                  />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                      <Typography variant="h6" fontWeight={600}>
                        {appointment.doctor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {appointment.type}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EventIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {formatDate(appointment.date)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {appointment.time}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                          label={appointment.status} 
                          size="small"
                          sx={{ 
                            bgcolor: getStatusColor(appointment.status),
                            color: 'white',
                            fontWeight: 500
                          }} 
                        />
                        
                        {appointment.status === 'Completed' && (
                          <Chip 
                            label={getPaymentStatus(appointment)} 
                            size="small"
                            sx={{ 
                              bgcolor: getPaymentStatusColor(appointment),
                              color: 'white',
                              fontWeight: 500
                            }} 
                          />
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      {appointment.status === 'Completed' && appointment.hasBill && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Button 
                            variant="outlined" 
                            color="primary"
                            startIcon={<ReceiptIcon />}
                            onClick={() => handleViewInvoice(appointment)}
                          >
                            View Bill (${appointment.billAmount})
                          </Button>
                          
                          <Button 
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownloadInvoice(appointment)}
                          >
                            Download
                          </Button>
                          
                          <Button 
                            variant="outlined"
                            startIcon={<MailOutlineIcon />}
                            onClick={() => handleSendInvoice(appointment)}
                            disabled={loading}
                          >
                            Email
                          </Button>
                        </Box>
                      )}
                      
                      {appointment.status === 'Upcoming' && (
                        <Button 
                          variant="outlined" 
                          color="error"
                        >
                          Cancel
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" gutterBottom>
              No appointments found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You don't have any {selectedTab === 1 ? 'upcoming' : selectedTab === 2 ? 'past' : ''} appointments yet
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleBookAppointment}
              sx={{
                bgcolor: '#ff3366',
                '&:hover': { bgcolor: '#e62e5c' }
              }}
            >
              Book New Appointment
            </Button>
          </Box>
        )}
        
        {/* Invoice Dialog */}
        <Dialog 
          open={invoiceDialogOpen} 
          onClose={handleCloseInvoiceDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight={600}>
              Invoice
            </Typography>
          </DialogTitle>
          <DialogContent>
            {selectedAppointment && (
              <Box>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Invoice For
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedAppointment.type}
                    </Typography>
                    <Typography variant="body2">
                      {selectedAppointment.doctor}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(selectedAppointment.date)}, {selectedAppointment.time}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Invoice #
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      INV-{selectedAppointment.id.toString().padStart(4, '0')}
                    </Typography>
                    <Typography variant="body2">
                      Date: {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getPaymentStatusColor(selectedAppointment),
                        fontWeight: 500,
                        mt: 1
                      }}
                    >
                      {getPaymentStatus(selectedAppointment)}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 2 }} />
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoiceItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell align="right">${item.amount}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          ${calculateInvoiceTotal()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Methods: Credit Card, Debit Card, Insurance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please contact billing@medicarepro.com for any billing inquiries
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseInvoiceDialog}>
              Close
            </Button>
            <Button 
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => selectedAppointment && handleDownloadInvoice(selectedAppointment)}
            >
              Download PDF
            </Button>
            <Button 
              variant="contained"
              startIcon={<MailOutlineIcon />}
              onClick={() => selectedAppointment && handleSendInvoice(selectedAppointment)}
              disabled={loading}
              sx={{
                bgcolor: '#ff3366',
                '&:hover': { bgcolor: '#e62e5c' }
              }}
            >
              Email Invoice
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
    </Container>
  );
};

export default Appointments; 