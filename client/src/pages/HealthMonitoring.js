import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import {
  FavoriteOutlined as HeartIcon,
  LocalHospital as PressureIcon,
  Thermostat as TempIcon,
  Speed as GlucoseIcon,
  Scale as WeightIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const HealthMonitoring = () => {
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: '',
    bloodPressure: '',
    temperature: '',
    glucoseLevel: '',
    weight: '',
  });

  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVitalSigns(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!vitalSigns.heartRate || !vitalSigns.bloodPressure || !vitalSigns.temperature) {
      setError('Please fill in all required fields');
      return;
    }

    // Add new record with timestamp
    const newRecord = {
      ...vitalSigns,
      timestamp: new Date().toLocaleString(),
      id: Date.now(),
    };

    setRecords(prev => [newRecord, ...prev]);
    setSuccess('Health metrics recorded successfully!');
    
    // Reset form
    setVitalSigns({
      heartRate: '',
      bloodPressure: '',
      temperature: '',
      glucoseLevel: '',
      weight: '',
    });

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const VitalSignCard = ({ icon, title, unit, name, value }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <TextField
          fullWidth
          label={`Enter ${title}`}
          name={name}
          value={value}
          onChange={handleInputChange}
          variant="outlined"
          placeholder={`Enter ${title} ${unit}`}
          sx={{ mb: 1 }}
        />
        <Typography variant="caption" color="text.secondary">
          Unit: {unit}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Health Monitoring
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <VitalSignCard
              icon={<HeartIcon sx={{ color: '#ff3366' }} />}
              title="Heart Rate"
              unit="BPM"
              name="heartRate"
              value={vitalSigns.heartRate}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <VitalSignCard
              icon={<PressureIcon sx={{ color: '#ff3366' }} />}
              title="Blood Pressure"
              unit="mmHg"
              name="bloodPressure"
              value={vitalSigns.bloodPressure}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <VitalSignCard
              icon={<TempIcon sx={{ color: '#ff3366' }} />}
              title="Temperature"
              unit="°C"
              name="temperature"
              value={vitalSigns.temperature}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <VitalSignCard
              icon={<GlucoseIcon sx={{ color: '#ff3366' }} />}
              title="Glucose Level"
              unit="mg/dL"
              name="glucoseLevel"
              value={vitalSigns.glucoseLevel}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <VitalSignCard
              icon={<WeightIcon sx={{ color: '#ff3366' }} />}
              title="Weight"
              unit="kg"
              name="weight"
              value={vitalSigns.weight}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#ff3366',
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#e62e5c',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(255, 51, 102, 0.4)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Record Vital Signs
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Health Records History
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>Heart Rate</TableCell>
                <TableCell>Blood Pressure</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Glucose Level</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.timestamp}</TableCell>
                  <TableCell>{record.heartRate} BPM</TableCell>
                  <TableCell>{record.bloodPressure} mmHg</TableCell>
                  <TableCell>{record.temperature} °C</TableCell>
                  <TableCell>{record.glucoseLevel || '-'} mg/dL</TableCell>
                  <TableCell>{record.weight || '-'} kg</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(record.id)}
                      sx={{ color: '#ff3366' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary">
                      No records found. Start monitoring your health by adding vital signs above.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default HealthMonitoring; 