import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Button,
  InputAdornment,
  CircularProgress,
  Card,
  CardContent,
  Badge
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MedicationIcon from '@mui/icons-material/Medication';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import medicineData from '../data/medicineData';

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Extract all symptoms for search
  const symptoms = medicineData.map(item => item.symptom);

  // Function to find medicines for a symptom
  const findMedicines = (symptom) => {
    const symptomData = medicineData.find(
      item => item.symptom.toLowerCase() === symptom.toLowerCase()
    );
    
    return symptomData || null;
  };

  // Process the search input to look for symptoms
  const processSearchInput = () => {
    if (searchTerm.length < 3) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Extract potential symptoms from the input
      const inputWords = searchTerm.toLowerCase().split(/\s+/);
      const inputPhrase = searchTerm.toLowerCase();
      
      // Pattern matching for common phrases like "I am suffering from X" or "I have X"
      let extractedSymptoms = [];
      
      if (inputPhrase.includes('suffering from')) {
        const afterPhrase = inputPhrase.split('suffering from')[1].trim();
        extractedSymptoms = symptoms.filter(symptom => 
          afterPhrase.includes(symptom)
        );
      } else if (inputPhrase.includes('have a') || inputPhrase.includes('having a')) {
        const afterPhrase = inputPhrase.includes('have a') 
          ? inputPhrase.split('have a')[1].trim()
          : inputPhrase.split('having a')[1].trim();
        extractedSymptoms = symptoms.filter(symptom => 
          afterPhrase.includes(symptom)
        );
      } else {
        // Direct word matching
        extractedSymptoms = symptoms.filter(symptom => 
          inputWords.some(word => 
            word.length > 3 && symptom.toLowerCase().includes(word)
          ) || 
          inputPhrase.includes(symptom)
        );
      }
      
      if (extractedSymptoms.length > 0) {
        const symptomsWithData = extractedSymptoms.map(symptom => findMedicines(symptom))
          .filter(item => item !== null);
        
        setSuggestions(symptomsWithData);
        
        // Add to recent searches if it's a new symptom
        if (symptomsWithData.length > 0) {
          const newSymptom = symptomsWithData[0].symptom;
          if (!recentSearches.includes(newSymptom)) {
            setRecentSearches(prev => [newSymptom, ...prev].slice(0, 5));
          }
        }
      } else {
        setSuggestions([]);
      }
      
      setIsSearching(false);
    }, 800); // Simulated delay for search processing
  };

  // Handle symptom selection
  const handleSymptomSelect = (symptom) => {
    if (symptom) {
      const data = findMedicines(symptom);
      setSelectedSymptom(data);
      
      // Add to recent searches
      if (!recentSearches.includes(symptom)) {
        setRecentSearches(prev => [symptom, ...prev].slice(0, 5));
      }
    } else {
      setSelectedSymptom(null);
    }
  };

  // Clear the current search
  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setSelectedSymptom(null);
  };

  // Handle key press in search field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.length >= 3) {
      processSearchInput();
    }
  };

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
        Describe your symptoms or condition
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="E.g. I am suffering from fever, or type a condition like 'diabetes'"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: isSearching ? (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ) : null
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
        />
        <Button 
          variant="contained" 
          sx={{ 
            ml: 1.5, 
            borderRadius: '8px', 
            minWidth: '120px',
            bgcolor: '#ff3366',
            '&:hover': { 
              bgcolor: '#e62e5c', 
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(255, 51, 102, 0.3)' 
            },
          }}
          onClick={processSearchInput}
          disabled={searchTerm.length < 3 || isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </Box>
      
      {recentSearches.length > 0 && !selectedSymptom && suggestions.length === 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1, color: 'text.secondary' }}>
            Recent searches:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {recentSearches.map((symptom) => (
              <Chip 
                key={symptom}
                label={symptom}
                size="medium"
                onClick={() => handleSymptomSelect(symptom)}
                sx={{ 
                  bgcolor: '#f5f5f5', 
                  fontWeight: 500,
                  '&:hover': { bgcolor: '#e0f7fa' } 
                }}
              />
            ))}
          </Box>
        </Box>
      )}
      
      {suggestions.length > 0 && !selectedSymptom && (
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: '8px', border: '1px solid rgba(0, 123, 255, 0.2)', bgcolor: 'rgba(0, 123, 255, 0.03)' }}>
          <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', fontWeight: 600 }}>
            <HealthAndSafetyIcon fontSize="small" sx={{ mr: 1, color: '#ff3366' }} />
            Conditions detected in your description:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {suggestions.map((item) => (
              <Chip 
                key={item.symptom}
                label={item.symptom}
                clickable
                onClick={() => handleSymptomSelect(item.symptom)}
                color="primary"
                variant="outlined"
                sx={{ 
                  borderRadius: '16px',
                  px: 1,
                  fontWeight: 500,
                  borderColor: '#ff3366',
                  color: '#ff3366',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 51, 102, 0.08)',
                    borderColor: '#ff3366',
                  } 
                }}
              />
            ))}
          </Box>
        </Paper>
      )}
      
      {selectedSymptom && (
        <Paper elevation={0} sx={{ borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <Box 
            sx={{ 
              p: 3, 
              bgcolor: '#ff3366', 
              color: 'white',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <MedicationIcon sx={{ mr: 1 }} />
              {selectedSymptom.symptom.charAt(0).toUpperCase() + selectedSymptom.symptom.slice(1)}
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleClearSearch}
              sx={{ 
                borderRadius: 4,
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              New Search
            </Button>
          </Box>
          
          <Box sx={{ p: 3 }}>
            <Card variant="outlined" sx={{ mb: 4, bgcolor: 'rgba(0, 123, 255, 0.03)' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: '#0277bd', mb: 1, fontWeight: 600 }}>
                  <InfoIcon fontSize="small" sx={{ mr: 1 }} />
                  About this condition
                </Typography>
                <Typography variant="body2">
                  {selectedSymptom.description}
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <Badge 
                badgeContent={selectedSymptom.medicines.length} 
                color="primary" 
                sx={{ mr: 1 }}
              >
                <MedicationIcon color="action" />
              </Badge>
              Recommended Medications:
            </Typography>
            
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2, mb: 3, border: '1px solid rgba(0,0,0,0.08)' }}>
              {selectedSymptom.medicines.map((medicine, index) => (
                <React.Fragment key={medicine}>
                  <ListItem alignItems="flex-start">
                    <ListItemText 
                      primary={
                        <Typography variant="subtitle1" fontWeight={500}>
                          {medicine}
                        </Typography>
                      } 
                      secondary={
                        index === 0 ? 
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                          <strong>Dosage:</strong> {selectedSymptom.dosage}
                        </Typography> : 
                        'Alternative medication option'
                      }
                    />
                  </ListItem>
                  {index < selectedSymptom.medicines.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
            
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}
              icon={<WarningIcon fontSize="inherit" />}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                Important Warning
              </Typography>
              <Typography variant="body2">
                {selectedSymptom.warning}
              </Typography>
            </Alert>
            
            <Alert severity="info">
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                <strong>Disclaimer:</strong> This information is for educational purposes only and is not a substitute for professional medical advice. 
                Always consult a healthcare professional before taking any medication.
              </Typography>
            </Alert>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default MedicineSearch; 