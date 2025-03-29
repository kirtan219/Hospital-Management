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
  getAuth, 
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from 'firebase/auth';
import {
  getStoredEmail,
  clearStoredEmail,
  setupAuthPersistence,
} from '../utils/authUtils';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    // Set up auth persistence
    setupAuthPersistence().catch(console.error);

    // Check if the URL is an email sign-in link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      handleEmailLinkSignIn();
    }
  }, []);

  const handleEmailLinkSignIn = async () => {
    setLoading(true);
    try {
      // Get the email from storage
      let email = getStoredEmail();
      
      if (!email) {
        // If email is not found in storage, prompt the user
        email = window.prompt('Please provide your email for confirmation');
      }

      if (email) {
        // Complete the email link sign-in
        await signInWithEmailLink(auth, email, window.location.href);
        clearStoredEmail();
        setMessage('Successfully signed in!');
        
        // Redirect to the intended page or home
        const redirectTo = location.state?.from || '/';
        navigate(redirectTo);
      }
    } catch (error) {
      console.error('Email link sign-in error:', error);
      setError('Failed to complete sign-in. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(formData.email, formData.password);
      
      // Redirect to the intended page or home
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } catch (error) {
      setError('Failed to sign in. ' + error.message);
      console.error('Login error:', error);
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
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: '8px' }}>
              {message}
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
              Sign In
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component={RouterLink}
                to="/signup"
                sx={{
                  color: '#ff3366',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 