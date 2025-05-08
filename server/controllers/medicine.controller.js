const MedicineOrder = require('../models/MedicineOrder');

// @desc    Get all medicine orders
// @route   GET /api/medicine
// @access  Private (Medical shop personnel only)
exports.getMedicineOrders = async (req, res) => {
  try {
    const medicineOrders = await MedicineOrder.find();

    res.status(200).json({
      success: true,
      count: medicineOrders.length,
      data: medicineOrders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Update medicine order status
// @route   PATCH /api/medicine/:id/status
// @access  Private (Medical shop personnel only)
exports.updateMedicineOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a status'
      });
    }

    const medicineOrder = await MedicineOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!medicineOrder) {
      return res.status(404).json({
        success: false,
        message: 'Medicine order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: medicineOrder
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};