const { ObjectId } = require('mongodb');

class VitalSigns {
    constructor(data) {
        this.patientId = new ObjectId(data.patientId);
        this.temperature = data.temperature || null;
        this.bloodPressure = {
            systolic: data.bloodPressure?.systolic || null,
            diastolic: data.bloodPressure?.diastolic || null
        };
        this.heartRate = data.heartRate || null;
        this.respiratoryRate = data.respiratoryRate || null;
        this.oxygenSaturation = data.oxygenSaturation || null;
        this.recordedAt = data.recordedAt || new Date();
        this.recordedBy = data.recordedBy || null;
        this.notes = data.notes || '';
    }

    static collectionName = 'vitalSigns';

    toJSON() {
        return {
            patientId: this.patientId,
            temperature: this.temperature,
            bloodPressure: this.bloodPressure,
            heartRate: this.heartRate,
            respiratoryRate: this.respiratoryRate,
            oxygenSaturation: this.oxygenSaturation,
            recordedAt: this.recordedAt,
            recordedBy: this.recordedBy,
            notes: this.notes
        };
    }
}

module.exports = VitalSigns; 