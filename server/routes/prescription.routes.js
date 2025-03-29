const express = require('express');
const router = express.Router();

// Since we haven't created controllers yet, we'll make simple placeholder routes
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Prescription routes are working'
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get prescription with ID: ${req.params.id}`
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Create prescription endpoint'
  });
});

router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update prescription with ID: ${req.params.id}`
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete prescription with ID: ${req.params.id}`
  });
});

module.exports = router; 