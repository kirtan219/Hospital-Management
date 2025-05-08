const appointmentSchema = {
  patientId: String, // Reference to patient
  patientName: String,
  patientEmail: String,
  patientPhone: String,
  doctorId: String, // Reference to doctor
  doctorName: String,
  doctorSpecialization: String,
  appointmentDate: Date,
  startTime: String,
  endTime: String,
  status: String, // 'scheduled', 'completed', 'cancelled', 'no-show'
  type: String, // 'consultation', 'follow-up', 'emergency', 'routine-checkup'
  reason: String,
  notes: String,
  symptoms: Array,
  paymentStatus: String, // 'pending', 'paid', 'refunded', 'insurance-claim'
  paymentMethod: String, // 'cash', 'credit-card', 'insurance', 'online'
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
};

module.exports = appointmentSchema;