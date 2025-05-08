const express = require('express');
const router = express.Router();
const { client, DB_NAME } = require('../config/database');
const { ObjectId } = require('mongodb');

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const appointmentsCollection = db.collection('appointments');
    
    const result = await appointmentsCollection.insertOne({
      ...req.body,
      createdAt: new Date(),
      appointmentDate: new Date(req.body.appointmentDate)
    });
    
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const appointmentsCollection = db.collection('appointments');
    
    const appointments = await appointmentsCollection.find({}).toArray();
    
    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get appointments by patient ID
router.get('/patient/:patientId', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const appointmentsCollection = db.collection('appointments');
    
    const appointments = await appointmentsCollection.find({ 
      patientId: req.params.patientId 
    }).toArray();
    
    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get appointments by doctor ID
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const appointmentsCollection = db.collection('appointments');
    
    const appointments = await appointmentsCollection.find({ 
      doctorId: req.params.doctorId 
    }).toArray();
    
    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single appointment
router.get('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const appointmentsCollection = db.collection('appointments');
    
    const appointment = await appointmentsCollection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const appointmentsCollection = db.collection('appointments');
    
    // Handle date conversion if provided
    if (req.body.appointmentDate) {
      req.body.appointmentDate = new Date(req.body.appointmentDate);
    }
    
    const result = await appointmentsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: result.value });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const appointmentsCollection = db.collection('appointments');
    
    const result = await appointmentsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 