import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  Grid,
  SvgIcon
} from '@mui/material';
import MedicineSearch from '../components/MedicineSearch';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

// Custom pill icon based on the provided image - oval pill shape
const PillIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M20,12c0,2.76-2.24,5-5,5H9c-2.76,0-5-2.24-5-5s2.24-5,5-5h6C17.76,7,20,9.24,20,12z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="7" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" />
  </SvgIcon>
);

const MedicineFinder = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight={700} color="#333">
            Medicine Finder
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: '8px', 
                border: '1px solid rgba(0,0,0,0.08)',
                mb: 4 
              }}
            >
              <MedicineSearch />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: '8px', 
                border: '1px solid rgba(0,0,0,0.08)', 
                mb: 4 
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <HealthAndSafetyIcon sx={{ mr: 1, color: '#ff3366' }} />
                About Medicine Finder
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                This tool helps you find appropriate medication based on your symptoms. Simply describe what you're experiencing,
                and we'll suggest possible treatments.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" fontWeight={600} color="text.secondary">
                Important Notes:
              </Typography>
              <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    Always consult a healthcare professional before taking any medication
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    This tool provides general information only, not personalized medical advice
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    If experiencing severe symptoms, seek immediate medical attention
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    Always read medication labels and follow instructions carefully
                  </Typography>
                </li>
              </ul>
            </Paper>

            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: '8px', 
                border: '1px solid rgba(0,0,0,0.08)' 
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                How to Use
              </Typography>
              <ol style={{ paddingLeft: '20px', marginTop: '8px' }}>
                <li>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Type your symptoms in the search bar (e.g., "I have a headache" or "suffering from fever")
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Select from the detected conditions that match your symptoms
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Review the suggested medications, dosage information, and warnings
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    Consult a healthcare professional for proper diagnosis and treatment
                  </Typography>
                </li>
              </ol>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MedicineFinder; 