const doctorSchema = {
  name: String,
  specialization: String,
  qualifications: Array,
  phone: String,
  email: String,
  address: String,
  workingHours: {
    start: String,
    end: String,
    days: Array
  },
  appointments: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
};

module.exports = doctorSchema;