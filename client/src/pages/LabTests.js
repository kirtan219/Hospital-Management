import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ScienceIcon from '@mui/icons-material/Science';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DownloadIcon from '@mui/icons-material/Download';
import { useAuth } from '../contexts/AuthContext';

// Mock database functions
const localStorageDB = {
  getTests: () => {
    try {
      const savedData = localStorage.getItem('labTests');
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },
  saveTests: (tests) => {
    localStorage.setItem('labTests', JSON.stringify(tests));
  },
  addTest: (testData) => {
    const tests = localStorageDB.getTests();
    const newTest = {
      id: Date.now().toString(),
      ...testData,
      createdAt: new Date().toISOString()
    };
    tests.push(newTest);
    localStorageDB.saveTests(tests);
    return newTest;
  },
  updateTest: (testId, updates) => {
    const tests = localStorageDB.getTests();
    const index = tests.findIndex(t => t.id === testId);
    
    if (index !== -1) {
      tests[index] = { ...tests[index], ...updates };
      localStorageDB.saveTests(tests);
      return tests[index];
    }
    return null;
  }
};

const LabTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTests, setFilteredTests] = useState(localStorageDB.getTests());
  const [tabValue, setTabValue] = useState(0);
  const [selectedTest, setSelectedTest] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const { currentUser } = useAuth();

  // Filter tests based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTests(localStorageDB.getTests());
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = localStorageDB.getTests().filter(
      test => 
        test.name.toLowerCase().includes(searchTermLower) || 
        test.description.toLowerCase().includes(searchTermLower) ||
        test.category.toLowerCase().includes(searchTermLower)
    );
    setFilteredTests(filtered);
  }, [searchTerm]);

  // Fetch user's lab test orders
  useEffect(() => {
    if (!currentUser) return;
    
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orders = localStorageDB.getTests().filter(order => order.userId === currentUser.uid);
        orders.sort((a, b) => b.orderDate - a.orderDate);
        setMyOrders(orders);
      } catch (error) {
        console.error("Error fetching lab test orders:", error);
        setSnackbar({
          open: true,
          message: "Failed to load your test orders",
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOrderTest = (test) => {
    setSelectedTest(test);
    setOrderDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setOrderDialogOpen(false);
  };

  const handleConfirmOrder = async () => {
    if (!currentUser || !selectedTest) return;
    
    setLoading(true);
    try {
      // Get user details
      const userData = {
        name: currentUser.displayName || currentUser.email,
        email: currentUser.email,
        phone: currentUser.phone || ''
      };

      // Create a new order
      const newOrder = {
        userId: currentUser.uid,
        userName: userData.name,
        testId: selectedTest.id,
        testName: selectedTest.name,
        testCategory: selectedTest.category,
        price: selectedTest.price,
        orderDate: new Date().toISOString(),
        status: 'Pending',
        appointmentDate: null,
        results: null,
        paymentStatus: 'Unpaid',
        patientEmail: userData.email,
        patientPhone: userData.phone
      };
      
      localStorageDB.addTest(newOrder);
      
      // Add to local state
      setMyOrders(prev => [{
        ...newOrder, 
        id: 'temp-' + Date.now(),
        orderDate: new Date()
      }, ...prev]);
      
      setSnackbar({
        open: true,
        message: "Lab test ordered successfully! We'll contact you to schedule.",
        severity: 'success'
      });
      
      handleCloseDialog();
    } catch (error) {
      console.error("Error ordering lab test:", error);
      setSnackbar({
        open: true,
        message: "Failed to order test. Please try again.",
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDownloadInvoice = (order) => {
    // In a real app, this would generate and download a PDF
    setSnackbar({
      open: true,
      message: "Invoice downloaded successfully!",
      severity: 'success'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#f57c00';
      case 'Scheduled':
        return '#1976d2';
      case 'Completed':
        return '#388e3c';
      case 'Cancelled':
        return '#d32f2f';
      default:
        return '#757575';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" fontWeight={700} color="#333" sx={{ mb: 1 }}>
          Lab Tests
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Order lab tests, view results, and track your orders
        </Typography>

        <Paper sx={{ width: '100%', mb: 4 }}>
          <Tabs
            value={tabValue}
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
            <Tab icon={<ScienceIcon />} iconPosition="start" label="Available Tests" />
            <Tab icon={<MedicalInformationIcon />} iconPosition="start" label="My Test Orders" />
          </Tabs>
        </Paper>

        {/* Available Tests Tab */}
        {tabValue === 0 && (
          <>
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search tests by name, description or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {filteredTests.map((test) => (
                <Grid item xs={12} md={6} lg={4} key={test.id}>
                  <Card 
                    elevation={0} 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.08)',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="h2" fontWeight={600}>
                          {test.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={`$${test.price}`}
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                      <Chip
                        size="small"
                        label={test.category}
                        variant="outlined"
                        sx={{ mb: 2, fontSize: '0.75rem' }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {test.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        <strong>Duration:</strong> {test.duration}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        <strong>Preparation:</strong> {test.preparationGuidelines}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={() => handleOrderTest(test)}
                        sx={{
                          bgcolor: '#ff3366',
                          '&:hover': { bgcolor: '#e62e5c' }
                        }}
                      >
                        Order Test
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

              {filteredTests.length === 0 && (
                <Box sx={{ width: '100%', py: 8, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    No tests found matching your search
                  </Typography>
                </Box>
              )}
            </Grid>
          </>
        )}

        {/* My Test Orders Tab */}
        {tabValue === 1 && (
          <>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : myOrders.length > 0 ? (
              <Grid container spacing={3}>
                {myOrders.map((order) => (
                  <Grid item xs={12} key={order.id}>
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
                          bgcolor: getStatusColor(order.status) 
                        }} 
                      />

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                          <Typography variant="h6" fontWeight={600}>
                            {order.testName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {order.testCategory}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Ordered:</strong> {new Date(order.orderDate).toLocaleDateString()}, {new Date(order.orderDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </Typography>
                          {order.appointmentDate && (
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                              <strong>Appointment:</strong> {new Date(order.appointmentDate).toLocaleDateString()}, {new Date(order.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Chip 
                              label={order.status} 
                              size="small"
                              sx={{ 
                                bgcolor: getStatusColor(order.status),
                                color: 'white',
                                mr: 1,
                                fontWeight: 500
                              }} 
                            />
                            <Chip 
                              label={order.paymentStatus} 
                              size="small" 
                              variant="outlined"
                              sx={{ 
                                mr: 1,
                                fontWeight: 500
                              }} 
                            />
                            <Typography variant="body2" fontWeight={600} color="primary">
                              ${order.price}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            startIcon={<ReceiptIcon />}
                            onClick={() => handleDownloadInvoice(order)}
                            sx={{ mr: 2 }}
                          >
                            Invoice
                          </Button>
                          
                          {order.status === 'Completed' && (
                            <Button 
                              variant="contained"
                              startIcon={<HealthAndSafetyIcon />}
                              sx={{
                                bgcolor: '#ff3366',
                                '&:hover': { bgcolor: '#e62e5c' }
                              }}
                            >
                              View Results
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
                <ScienceIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No test orders yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Order your first lab test from the Available Tests tab
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => setTabValue(0)}
                  sx={{
                    bgcolor: '#ff3366',
                    '&:hover': { bgcolor: '#e62e5c' }
                  }}
                >
                  Browse Available Tests
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Order Confirmation Dialog */}
        <Dialog open={orderDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              Confirm Test Order
            </Typography>
          </DialogTitle>
          <DialogContent>
            {selectedTest && (
              <>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {selectedTest.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedTest.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <List disablePadding>
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary="Category" 
                      secondary={selectedTest.category} 
                      primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
                      secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} 
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary="Price" 
                      secondary={`$${selectedTest.price}`} 
                      primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
                      secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} 
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary="Duration" 
                      secondary={selectedTest.duration} 
                      primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
                      secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} 
                    />
                  </ListItem>
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" paragraph>
                  <strong>Preparation Guidelines:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedTest.preparationGuidelines}
                </Typography>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  After ordering, we will contact you to schedule the test appointment.
                </Alert>
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog} disabled={loading}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleConfirmOrder} 
              disabled={loading}
              sx={{
                bgcolor: '#ff3366',
                '&:hover': { bgcolor: '#e62e5c' }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Confirm Order'}
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

export default LabTests; 