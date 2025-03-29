const Patient = require('../models/Patient');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Public
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Create new patient
// @route   POST /api/patients
// @access  Public
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Public
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Public
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
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