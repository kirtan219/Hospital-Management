const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
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
  specialization: {
    type: String,
    required: [true, 'Please provide specialization'],
  },
  qualifications: [
    {
      degree: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  ],
  experience: {
    type: Number, // in years
    default: 0,
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please provide license number'],
  },
  consultationFee: {
    type: Number,
    required: [true, 'Please provide consultation fee'],
  },
  availability: [
    {
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
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
      isAvailable: {
        type: Boolean,
        default: true,
      },
      slotDuration: {
        type: Number, // in minutes
        default: 30,
      },
      breakTime: {
        start: {
          type: String,
        },
        end: {
          type: String,
        },
      },
    },
  ],
  department: {
    type: String,
    required: [true, 'Please provide department'],
  },
  bio: {
    type: String,
  },
  ratings: [
    {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      review: {
        type: String,
      },
      reviewerName: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
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
DoctorSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Calculate average rating
DoctorSchema.pre('save', function (next) {
  if (this.ratings.length > 0) {
    this.averageRating =
      this.ratings.reduce((acc, item) => acc + item.rating, 0) /
      this.ratings.length;
  }
  next();
});

module.exports = mongoose.model('Doctor', DoctorSchema); 