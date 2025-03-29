const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  medicalHistory: [
    {
      condition: {
        type: String,
        required: true,
      },
      diagnosedDate: {
        type: Date,
      },
      notes: {
        type: String,
      },
      status: {
        type: String,
        enum: ['active', 'managed', 'resolved'],
        default: 'active',
      },
    },
  ],
  allergies: [
    {
      allergen: {
        type: String,
        required: true,
      },
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        default: 'moderate',
      },
      reaction: {
        type: String,
      },
    },
  ],
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  height: {
    value: {
      type: Number,
    },
    unit: {
      type: String,
      enum: ['cm', 'ft'],
      default: 'cm',
    },
  },
  weight: {
    value: {
      type: Number,
    },
    unit: {
      type: String,
      enum: ['kg', 'lb'],
      default: 'kg',
    },
  },
  emergencyContact: {
    name: {
      type: String,
    },
    relation: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  insuranceInfo: {
    provider: {
      type: String,
    },
    policyNumber: {
      type: String,
    },
    groupNumber: {
      type: String,
    },
    validUntil: {
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
PatientSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Patient', PatientSchema); 