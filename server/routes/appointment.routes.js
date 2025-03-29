const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus
} = require('../controllers/appointment.controller');

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

router.route('/:id/status')
  .patch(updateAppointmentStatus);

module.exports = router; 