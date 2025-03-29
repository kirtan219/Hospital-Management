const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public
exports.getAppointments = async (req, res) => {
  try {
    // Support filtering by doctor, patient email, date, or status
    const filter = {};
    
    if (req.query.doctorId) {
      filter.doctorId = req.query.doctorId;
    }
    
    if (req.query.patientEmail) {
      filter.patientEmail = req.query.patientEmail;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.date) {
      // Convert the date to a range for that whole day
      const date = new Date(req.query.date);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      
      filter.appointmentDate = {
        $gte: date,
        $lt: nextDay
      };
    }

    const appointments = await Appointment.find(filter);

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Public
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = async (req, res) => {
  try {
    // Check if doctor exists and is available at the requested time
    const doctor = await Doctor.findById(req.body.doctorId);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }
    
    // Set doctor information from doctor record
    req.body.doctorName = `${doctor.firstName} ${doctor.lastName}`;
    req.body.doctorSpecialization = doctor.specialization;
    
    // TODO: Check doctor availability based on doctor's schedule and existing appointments
    // This would be a more complex function checking the doctor's availability array
    // and existing appointments for the requested time slot
    
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Public
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Public
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
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

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Public
exports.updateAppointmentStatus = async (req, res) => {
  try {
    if (!req.body.status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}; 