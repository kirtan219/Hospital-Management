const { Schema } = require('mongodb');

const patientSchema = {
  name: String,
  age: Number,
  gender: String,
  phone: String,
  email: String,
  address: String,
  medicalHistory: Array,
  appointments: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
};

module.exports = patientSchema;