import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#333',
              fontWeight: 700,
            }}
          >
            Hospital Management
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!currentUser ? (
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  backgroundColor: '#ff3366',
                  '&:hover': {
                    backgroundColor: '#e62e5c',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(255, 51, 102, 0.4)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Get Started
              </Button>
            ) : (
              <UserMenu />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 