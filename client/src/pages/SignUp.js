import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Divider,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import { 
  storeUserCredentials, 
  clearTempCredentials,
  setupAuthPersistence,
  storeEmailForSignIn,
} from '../utils/authUtils';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set up auth persistence when component mounts
    setupAuthPersistence().catch(console.error);
    
    // Clear any existing temporary credentials
    clearTempCredentials();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      
      // Store credentials temporarily for the signup process
      storeUserCredentials(formData.email, formData.password);
      
      // Store email for potential email link authentication
      storeEmailForSignIn(formData.email);
      
      // Attempt to create the account
      await signup(formData.email, formData.password);
      
      // Clear temporary credentials after successful signup
      clearTempCredentials();
      
      // Redirect to the intended page or home
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } catch (error) {
      setError('Failed to create an account. ' + error.message);
      console.error('Signup error:', error);
      
      // Clear temporary credentials on error
      clearTempCredentials();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      
      // Redirect to the intended page or home
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } catch (error) {
      setError('Failed to sign in with Google. ' + error.message);
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Create an Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={loading}
            startIcon={<GoogleIcon />}
            sx={{
              mb: 3,
              py: 1.5,
              borderRadius: '50px',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              color: '#333',
              '&:hover': {
                borderColor: '#ff3366',
                backgroundColor: 'rgba(255, 51, 102, 0.08)',
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ mb: 3 }}>
            <Typography color="text.secondary" variant="body2">
              OR
            </Typography>
          </Divider>

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
            </Box>
            <TextField
              required
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              required
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '50px',
                backgroundColor: '#ff3366',
                '&:hover': {
                  backgroundColor: '#e62e5c',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(255, 51, 102, 0.4)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#ff3366',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp; 