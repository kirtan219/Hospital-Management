const express = require('express');
const router = express.Router();

// Since we haven't created controllers yet, we'll make simple placeholder routes
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory routes are working'
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get inventory item with ID: ${req.params.id}`
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Create inventory item endpoint'
  });
});

router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update inventory item with ID: ${req.params.id}`
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete inventory item with ID: ${req.params.id}`
  });
});

module.exports = router; 