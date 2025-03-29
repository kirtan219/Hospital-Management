import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    if (currentUser) {
      const initial = getInitials(currentUser.email);
      setUserInitial(initial);
      console.log('Current user:', currentUser);
      console.log('Generated initial:', initial);
    }
  }, [currentUser]);

  const getInitials = (email) => {
    if (!email) return '?';
    
    // If there's a display name from Google Auth
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase();
    }
    
    // If there's an email, use its first character
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    
    return '?';
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      handleClose();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Don't render anything if there's no user
  if (!currentUser) return null;

  return (
    <>
      <IconButton
        onClick={handleMenu}
        size="small"
        sx={{ 
          ml: 2,
          bgcolor: '#ff3366',
          '&:hover': {
            bgcolor: '#e62e5c',
          },
        }}
        aria-controls={Boolean(anchorEl) ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'inherit',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          {userInitial || getInitials(currentUser?.email)}
        </Avatar>
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            borderRadius: '12px',
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ color: 'text.secondary' }}>
          <Typography variant="body2">
            Signed in as {currentUser?.email}
          </Typography>
        </MenuItem>
        <MenuItem 
          onClick={handleSignOut}
          sx={{
            color: '#ff3366',
            '&:hover': {
              bgcolor: 'rgba(255, 51, 102, 0.08)',
            },
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu; 