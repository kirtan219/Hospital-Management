const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  getAppointmentsForDoctor
} = require('../controllers/appointment.controller');
const { authorize } = require('../middleware/auth');

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

router.route('/:id/status')
  .patch(updateAppointmentStatus);

// Route for doctors to fetch their appointments
router.route('/doctor').get(authorize('doctor'), getAppointmentsForDoctor);

module.exports = router;