const express = require('express');
const router = express.Router();
const { client, DB_NAME } = require('../config/database');

// Create a new patient
router.post('/', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const patientsCollection = db.collection('patients');
    
    const result = await patientsCollection.insertOne({
      ...req.body,
      createdAt: new Date()
    });
    
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const patientsCollection = db.collection('patients');
    
    const patients = await patientsCollection.find({}).toArray();
    
    res.status(200).json({ success: true, count: patients.length, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single patient
router.get('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const patientsCollection = db.collection('patients');
    const { ObjectId } = require('mongodb');
    
    const patient = await patientsCollection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }
    
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update a patient
router.put('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const patientsCollection = db.collection('patients');
    const { ObjectId } = require('mongodb');
    
    const result = await patientsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }
    
    res.status(200).json({ success: true, data: result.value });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const patientsCollection = db.collection('patients');
    const { ObjectId } = require('mongodb');
    
    const result = await patientsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 