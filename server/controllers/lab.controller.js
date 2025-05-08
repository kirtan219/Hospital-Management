const LabOrder = require('../models/LabOrder');

// @desc    Get all lab orders
// @route   GET /api/lab
// @access  Private (Lab personnel only)
exports.getLabOrders = async (req, res) => {
  try {
    const labOrders = await LabOrder.find();

    res.status(200).json({
      success: true,
      count: labOrders.length,
      data: labOrders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Update lab order status
// @route   PATCH /api/lab/:id/status
// @access  Private (Lab personnel only)
exports.updateLabOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a status'
      });
    }

    const labOrder = await LabOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!labOrder) {
      return res.status(404).json({
        success: false,
        message: 'Lab order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: labOrder
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};