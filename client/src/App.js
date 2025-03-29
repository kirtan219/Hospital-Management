import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
  useTheme 
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import UserMenu from './components/UserMenu';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Import pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import PatientRegister from './pages/PatientRegister';
import PatientProfile from './pages/PatientProfile';
import Patients from './pages/Patients';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import HealthMonitoring from './pages/HealthMonitoring';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
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
            component={Link}
            to="/"
            sx={{
              fontWeight: 800,
              color: '#111',
              textDecoration: 'none',
              mr: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocalHospitalIcon sx={{ mr: 1, color: '#ff3366' }} />
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
              component={Link}
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
              component={Link}
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
              component={Link}
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
              component={Link}
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
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: '#ff3366',
                    fontWeight: 600,
                    borderRadius: '50px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 51, 102, 0.08)'
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    backgroundColor: '#ff3366',
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '50px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#e62e5c'
                    }
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AuthProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#ffffff' }}>
            <NavBar />
            <Container 
              component="main" 
              maxWidth="lg" 
              sx={{ 
                flex: 1,
                py: 4,
                backgroundColor: '#ffffff',
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:id" element={<DoctorDetails />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<PatientProfile />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/patients/add" element={<PatientRegister />} />
                <Route path="/login" element={<Login />} />
                <Route path="/health-monitoring" element={<HealthMonitoring />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </Box>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App; 