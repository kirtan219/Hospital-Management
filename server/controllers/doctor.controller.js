const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    // Support filtering by specialization or department
    const filter = {};
    
    if (req.query.specialization) {
      filter.specialization = req.query.specialization;
    }
    
    if (req.query.department) {
      filter.department = req.query.department;
    }

    const doctors = await Doctor.find(filter);

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Public
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Public
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Public
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Add doctor rating
// @route   POST /api/doctors/:id/ratings
// @access  Public
exports.addDoctorRating = async (req, res) => {
  try {
    const { rating, review, reviewerName } = req.body;
    
    if (!rating || !reviewerName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating and reviewer name'
      });
    }
    
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }
    
    // Add rating
    doctor.ratings.push({
      rating,
      review,
      reviewerName,
      date: Date.now()
    });
    
    // Save doctor to trigger pre-save hook that calculates average rating
    await doctor.save();
    
    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}; 