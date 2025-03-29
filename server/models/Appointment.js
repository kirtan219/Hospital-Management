const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialization: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled',
  },
  type: {
    type: String,
    enum: ['consultation', 'follow-up', 'emergency', 'routine-checkup'],
    default: 'consultation',
  },
  reason: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  symptoms: {
    type: [String],
  },
  vitals: {
    bloodPressure: String,
    temperature: String,
    pulseRate: String,
    respirationRate: String,
    oxygenSaturation: String,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'insurance-claim'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit-card', 'insurance', 'online'],
  },
  amount: {
    type: Number,
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms'],
    },
    sentAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['sent', 'failed'],
    },
  }],
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
    },
    submittedOn: {
      type: Date,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on update
AppointmentSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema); 