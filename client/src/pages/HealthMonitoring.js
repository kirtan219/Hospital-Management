import React, { useState } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent, TextField, Button, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Divider, Alert
} from '@mui/material';
import {
  FavoriteOutlined, LocalHospital, Thermostat, Speed, Scale,
  Add as AddIcon, Delete as DeleteIcon, Person as PersonIcon
} from '@mui/icons-material';

const inputFields = [
  { name: 'name', label: 'Patient Name', unit: '', icon: <PersonIcon sx={{ color: '#ff3366' }} /> },
  { name: 'heartRate', label: 'Heart Rate', unit: 'BPM', icon: <FavoriteOutlined sx={{ color: '#ff3366' }} /> },
  { name: 'bloodPressure', label: 'Blood Pressure', unit: 'mmHg', icon: <LocalHospital sx={{ color: '#ff3366' }} /> },
  { name: 'temperature', label: 'Temperature', unit: '°C', icon: <Thermostat sx={{ color: '#ff3366' }} /> },
  { name: 'glucoseLevel', label: 'Glucose Level', unit: 'mg/dL', icon: <Speed sx={{ color: '#ff3366' }} /> },
  { name: 'weight', label: 'Weight', unit: 'kg', icon: <Scale sx={{ color: '#ff3366' }} /> },
];

const HealthMonitoring = () => {
  const [vitalSigns, setVitalSigns] = useState({
    name: '',
    heartRate: '', 
    bloodPressure: '', 
    temperature: '', 
    glucoseLevel: '', 
    weight: ''
  });
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVitalSigns(prev => ({ ...prev, [name]: value }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, heartRate, bloodPressure, temperature } = vitalSigns;
    if (!name || !heartRate || !bloodPressure || !temperature) {
      showMessage('error', 'Please fill in all required fields including name.');
      return;
    }

    setRecords(prev => [
      { ...vitalSigns, id: Date.now(), timestamp: new Date().toLocaleString() },
      ...prev
    ]);
    setVitalSigns({ 
      name: '',
      heartRate: '', 
      bloodPressure: '', 
      temperature: '', 
      glucoseLevel: '', 
      weight: '' 
    });
    showMessage('success', 'Health metrics recorded successfully!');
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Health Monitoring
        </Typography>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {inputFields.map(({ name, label, unit, icon }) => (
            <Grid item xs={12} sm={6} md={4} key={name}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>{label}</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={`Enter ${label}`}
                    name={name}
                    value={vitalSigns[name]}
                    onChange={handleChange}
                    placeholder={name === 'name' ? "Enter patient's full name" : `Enter ${label} ${unit ? `(${unit})` : ''}`}
                    required={['name', 'heartRate', 'bloodPressure', 'temperature'].includes(name)}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {unit ? `Unit: ${unit} ` : ''}
                    {['name', 'heartRate', 'bloodPressure', 'temperature'].includes(name) && '(Required)'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#ff3366', px: 4, py: 1.5, borderRadius: '50px',
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
                <TableCell>Patient Name</TableCell>
                <TableCell>Heart Rate</TableCell>
                <TableCell>Blood Pressure</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Glucose Level</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.length > 0 ? (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.timestamp}</TableCell>
                    <TableCell><strong>{record.name}</strong></TableCell>
                    <TableCell>{record.heartRate} BPM</TableCell>
                    <TableCell>{record.bloodPressure} mmHg</TableCell>
                    <TableCell>{record.temperature} °C</TableCell>
                    <TableCell>{record.glucoseLevel || '-'} mg/dL</TableCell>
                    <TableCell>{record.weight || '-'} kg</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(record.id)} sx={{ color: '#ff3366' }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
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
