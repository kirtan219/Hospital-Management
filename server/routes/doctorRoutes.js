const express = require('express');
const router = express.Router();
const { client, DB_NAME } = require('../config/database');
const { ObjectId } = require('mongodb');

// Create a new doctor
router.post('/', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const doctorsCollection = db.collection('doctors');
    
    const result = await doctorsCollection.insertOne({
      ...req.body,
      createdAt: new Date()
    });
    
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const doctorsCollection = db.collection('doctors');
    
    const doctors = await doctorsCollection.find({}).toArray();
    
    res.status(200).json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single doctor
router.get('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const doctorsCollection = db.collection('doctors');
    
    const doctor = await doctorsCollection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }
    
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update a doctor
router.put('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const doctorsCollection = db.collection('doctors');
    
    const result = await doctorsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }
    
    res.status(200).json({ success: true, data: result.value });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const doctorsCollection = db.collection('doctors');
    
    const result = await doctorsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 