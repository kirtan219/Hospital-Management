const { ObjectId } = require('mongodb');
const { client, DB_NAME } = require('../config/database');
const VitalSigns = require('../models/VitalSigns');

// Get all vital signs for a patient
async function getPatientVitalSigns(req, res) {
    try {
        const { patientId } = req.params;
        const database = client.db(DB_NAME);
        const collection = database.collection(VitalSigns.collectionName);
        
        const vitalSigns = await collection.find({ patientId: new ObjectId(patientId) })
            .sort({ recordedAt: -1 })
            .toArray();
            
        res.json({
            success: true,
            data: vitalSigns
        });
    } catch (error) {
        console.error('Error getting vital signs:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// Record new vital signs
async function recordVitalSigns(req, res) {
    try {
        const { patientId } = req.params;
        const vitalSignsData = {
            ...req.body,
            patientId
        };
        
        const vitalSigns = new VitalSigns(vitalSignsData);
        const database = client.db(DB_NAME);
        const collection = database.collection(VitalSigns.collectionName);
        
        const result = await collection.insertOne(vitalSigns);
        
        res.status(201).json({
            success: true,
            data: {
                insertedId: result.insertedId,
                ...vitalSigns.toJSON()
            }
        });
    } catch (error) {
        console.error('Error recording vital signs:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// Get latest vital signs for a patient
async function getLatestVitalSigns(req, res) {
    try {
        const { patientId } = req.params;
        const database = client.db(DB_NAME);
        const collection = database.collection(VitalSigns.collectionName);
        
        const latestVitalSigns = await collection.findOne(
            { patientId: new ObjectId(patientId) },
            { sort: { recordedAt: -1 } }
        );
        
        res.json({
            success: true,
            data: latestVitalSigns
        });
    } catch (error) {
        console.error('Error getting latest vital signs:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    getPatientVitalSigns,
    recordVitalSigns,
    getLatestVitalSigns
}; 