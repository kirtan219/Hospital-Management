import React from 'react';
import { Routes, Route, Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  Stack,
  useTheme,
  SvgIcon
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicineIcon from '@mui/icons-material/Medication';
import ScienceIcon from '@mui/icons-material/Science';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import UserMenu from './components/UserMenu';
import ProtectedRoute from './components/ProtectedRoute';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AuthRedirect from './components/AuthRedirect';
import FeedbackRating from './components/FeedbackRating';

// Import pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import PatientRegister from './pages/PatientRegister';
import PatientProfile from './pages/PatientProfile';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import HealthMonitoring from './pages/HealthMonitoring';
import MedicineFinder from './pages/MedicineFinder';
import LabTests from './pages/LabTests';
import EditAppointment from './pages/EditAppointment';

// Custom pill icon based on the provided image - oval pill shape
const PillIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M20,12c0,2.76-2.24,5-5,5H9c-2.76,0-5-2.24-5-5s2.24-5,5-5h6C17.76,7,20,9.24,20,12z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="7" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" />
  </SvgIcon>
);

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: '70px' }}>
          {/* Logo/Brand */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/dashboard"
            sx={{
              fontWeight: 800,
              color: '#111',
              textDecoration: 'none',
              mr: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MedicineIcon sx={{ mr: 1, color: '#ff3366' }} />
            MediCare Pro
          </Typography>

          {/* Navigation Links */}
          <Stack 
            direction="row" 
            spacing={3} 
            sx={{ 
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center'
            }}
          >
            <Button
              component={RouterLink}
              to="/doctors"
              sx={{
                color: '#444',
                fontWeight: 600,
                '&:hover': { color: '#ff3366' }
              }}
            >
              <LocalHospitalIcon sx={{ mr: 0.5 }} />
              Doctors
            </Button>
            <Button
              component={RouterLink}
              to="/appointments"
              sx={{
                color: '#444',
                fontWeight: 600,
                '&:hover': { color: '#ff3366' }
              }}
            >
              <CalendarMonthIcon sx={{ mr: 0.5 }} />
              Appointments
            </Button>
            <Button
              component={RouterLink}
              to="/patients"
              sx={{
                color: '#444',
                fontWeight: 600,
                '&:hover': { color: '#ff3366' }
              }}
            >
              <PeopleAltIcon sx={{ mr: 0.5 }} />
              Patients
            </Button>
            <Button
              component={RouterLink}
              to="/health-monitoring"
              sx={{
                color: '#444',
                fontWeight: 600,
                '&:hover': { color: '#ff3366' }
              }}
            >
              <MonitorHeartIcon sx={{ mr: 0.5 }} />
              Health Monitoring
            </Button>
            <Button
              component={RouterLink}
              to="/medicine-finder"
              sx={{
                color: '#444',
                fontWeight: 600,
                '&:hover': { color: '#ff3366' }
              }}
            >
              <PillIcon sx={{ mr: 0.5 }} />
              Medicine Finder
            </Button>
            <Button
              component={RouterLink}
              to="/lab-tests"
              sx={{
                color: '#444',
                fontWeight: 600,
                '&:hover': { color: '#ff3366' }
              }}
            >
              <ScienceIcon sx={{ mr: 0.5 }} />
              Lab Tests
            </Button>
          </Stack>

          {/* Auth Buttons */}
          <Stack 
            direction="row" 
            spacing={2}
            sx={{
              display: { xs: 'none', md: 'flex' }
            }}
          >
            {currentUser ? (
              <UserMenu />
            ) : null}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Move NavBar inside a functional component that can use hooks
const AppContent = () => {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#ffffff' }}>
      {/* Only show NavBar for authenticated users */}
      {currentUser && <NavBar />}
      <Container 
        component="main" 
        maxWidth={currentUser ? "lg" : "100%"}
        disableGutters={!currentUser}
        sx={{ 
          flex: 1,
          py: currentUser ? 4 : 0,
          backgroundColor: '#ffffff',
        }}
      >
        <Routes>
          <Route path="/login" element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          } />
          <Route path="/signup" element={
            <AuthRedirect>
              <SignUp />
            </AuthRedirect>
          } />
          <Route path="/" element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/doctors" element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          } />
          <Route path="/doctors/:id" element={
            <ProtectedRoute>
              <DoctorDetails />
            </ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } />
          <Route path="/book-appointment" element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          } />
          <Route path="/patients" element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          } />
          <Route path="/patients/add" element={
            <ProtectedRoute>
              <PatientRegister />
            </ProtectedRoute>
          } />
          <Route path="/patients/:id" element={
            <ProtectedRoute>
              <PatientDetails />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          } />
          <Route path="/health-monitoring" element={
            <ProtectedRoute>
              <HealthMonitoring />
            </ProtectedRoute>
          } />
          <Route path="/medicine-finder" element={
            <ProtectedRoute>
              <MedicineFinder />
            </ProtectedRoute>
          } />
          <Route path="/lab-tests" element={
            <ProtectedRoute>
              <LabTests />
            </ProtectedRoute>
          } />
          <Route path="/appointments/:id/edit" element={<EditAppointment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      {currentUser && <FeedbackRating />}
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;