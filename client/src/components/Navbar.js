import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';
import MedicineSearch from './MedicineSearch';
import MedicationIcon from '@mui/icons-material/Medication';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const { currentUser } = useAuth();
  const [openMedicineSearch, setOpenMedicineSearch] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenMedicineSearch = () => {
    setOpenMedicineSearch(true);
  };

  const handleCloseMedicineSearch = () => {
    setOpenMedicineSearch(false);
  };

  return (
    <>
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
              <IconButton 
                color="primary"
                onClick={handleOpenMedicineSearch}
                sx={{ 
                  mr: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 123, 255, 0.08)',
                  }
                }}
                aria-label="medicine search"
              >
                <MedicationIcon />
              </IconButton>
              
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

      {/* Medicine Search Dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={openMedicineSearch}
        onClose={handleCloseMedicineSearch}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: { xs: '95%', sm: '80%', md: '60%' }
          }
        }}
      >
        <DialogTitle sx={{ pb: 0, pt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Medicine Finder
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseMedicineSearch}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <MedicineSearch />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar; 