import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';

const Patients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);

  // Load patients from localStorage
  const loadPatients = () => {
    try {
      console.log('Loading patients from localStorage');
      const savedPatients = localStorage.getItem('patients');
      console.log('Raw localStorage data:', savedPatients);
      
      if (savedPatients) {
        const parsedPatients = JSON.parse(savedPatients);
        console.log('Parsed patients:', parsedPatients);
        setPatients(parsedPatients);
      } else {
        console.log('No patients found in localStorage');
      }
    } catch (error) {
      console.error('Error loading patients:', error);
    }
  };

  // Load patients on component mount
  useEffect(() => {
    loadPatients();
  }, []);

  // Refresh patients when window gains focus
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window focused, reloading patients');
      loadPatients();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleAddPatient = () => {
    navigate('/patients/add');
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Patients
        </Typography>
        <Button
          onClick={handleAddPatient}
          variant="contained"
          sx={{
            borderRadius: '50px',
            px: 4,
            backgroundColor: '#ff3366',
            '&:hover': {
              backgroundColor: '#e62e5c',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(255, 51, 102, 0.4)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Add New Patient
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '50px',
              backgroundColor: 'white',
            }
          }}
        />
      </Box>

      <TableContainer 
        component={Paper}
        sx={{
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow 
                  key={patient.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {patient.name}
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Chip
                      label={patient.status}
                      color={patient.status === 'Active' ? 'success' : 'default'}
                      size="small"
                      sx={{ borderRadius: '50px' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/patients/${patient.id}`}
                      color="primary"
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      to={`/patients/${patient.id}/edit`}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No patients found. Add your first patient now!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Patients; 