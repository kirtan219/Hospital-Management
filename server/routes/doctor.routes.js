const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  addDoctorRating
} = require('../controllers/doctor.controller');

router.route('/')
  .get(getDoctors)
  .post(createDoctor);

router.route('/:id')
  .get(getDoctor)
  .put(updateDoctor)
  .delete(deleteDoctor);

router.route('/:id/ratings')
  .post(addDoctorRating);

module.exports = router; 