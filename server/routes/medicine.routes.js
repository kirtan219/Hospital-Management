const express = require('express');
const router = express.Router();
const { getMedicineOrders, updateMedicineOrderStatus } = require('../controllers/medicine.controller');
const { authorize } = require('../middleware/auth');

// Route for medical shop personnel to fetch medicine orders
router.route('/').get(authorize('medical_shop_person'), getMedicineOrders);

// Route for updating medicine order status
router.route('/:id/status').patch(authorize('medical_shop_person'), updateMedicineOrderStatus);

module.exports = router;