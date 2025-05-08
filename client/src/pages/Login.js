import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Divider,
  Link
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Login = () => {
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      if (user.role === 'doctor') {
        navigate('/appointments');
      } else if (user.role === 'lab_person') {
        navigate('/lab-orders');
      } else if (user.role === 'medical_shop_person') {
        navigate('/medicine-orders');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user.role === 'doctor') {
        navigate('/appointments');
      } else if (user.role === 'lab_person') {
        navigate('/lab-orders');
      } else if (user.role === 'medical_shop_person') {
        navigate('/medicine-orders');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to sign in with Google.');
      console.error('Google sign-in error:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 3
            }}
          >
            <LocalHospitalIcon 
              sx={{ 
                color: '#ff3366', 
                fontSize: 48, 
                mb: 2 
              }} 
            />
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              MediCare Pro
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                color: 'text.secondary',
                mb: 2
              }}
            >
              Hospital Management System
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: '8px',
                bgcolor: '#ff3366',
                '&:hover': { bgcolor: '#e6005c' },
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Sign In
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            sx={{
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: '#4285F4',
              color: '#4285F4',
              '&:hover': {
                borderColor: '#3367D6',
                backgroundColor: 'rgba(66, 133, 244, 0.04)'
              }
            }}
          >
            Continue with Google
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/signup')}
                sx={{
                  color: '#ff3366',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;