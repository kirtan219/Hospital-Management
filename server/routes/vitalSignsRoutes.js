const express = require('express');
const router = express.Router();
const vitalSignsController = require('../controllers/vitalSignsController');

// Get all vital signs for a patient
router.get('/patient/:patientId', vitalSignsController.getPatientVitalSigns);

// Get latest vital signs for a patient
router.get('/patient/:patientId/latest', vitalSignsController.getLatestVitalSigns);

// Record new vital signs for a patient
router.post('/patient/:patientId', vitalSignsController.recordVitalSigns);

module.exports = router; 