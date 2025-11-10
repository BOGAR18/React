const Sparepart = require('../models/Sparepart');

// @desc    Get all spareparts
// @route   GET /api/spareparts
// @access  Private
exports.getAllSpareparts = async (req, res) => {
  try {
    const spareparts = await Sparepart.find()
      .populate('createdBy', 'nama email')
      .populate('updatedBy', 'nama email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: spareparts.length,
      data: spareparts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan',
      error: error.message
    });
  }
};

// @desc    Get single sparepart
// @route   GET /api/spareparts/:id
// @access  Private
exports.getSparepart = async (req, res) => {
  try {
    const sparepart = await Sparepart.findById(req.params.id)
      .populate('createdBy', 'nama email')
      .populate('updatedBy', 'nama email');

    if (!sparepart) {
      return res.status(404).json({
        success: false,
        message: 'Sparepart tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: sparepart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan',
      error: error.message
    });
  }
};

// @desc    Create sparepart
// @route   POST /api/spareparts
// @access  Private (Admin, SPV)
exports.createSparepart = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    
    const sparepart = await Sparepart.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Sparepart berhasil ditambahkan',
      data: sparepart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan',
      error: error.message
    });
  }
};

// @desc    Update sparepart
// @route   PUT /api/spareparts/:id
// @access  Private (Admin, SPV)
exports.updateSparepart = async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;

    const sparepart = await Sparepart.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!sparepart) {
      return res.status(404).json({
        success: false,
        message: 'Sparepart tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sparepart berhasil diupdate',
      data: sparepart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan',
      error: error.message
    });
  }
};

// @desc    Delete sparepart
// @route   DELETE /api/spareparts/:id
// @access  Private (Admin only)
exports.deleteSparepart = async (req, res) => {
  try {
    const sparepart = await Sparepart.findByIdAndDelete(req.params.id);

    if (!sparepart) {
      return res.status(404).json({
        success: false,
        message: 'Sparepart tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sparepart berhasil dihapus',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan',
      error: error.message
    });
  }
};