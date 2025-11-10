const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verifikasi token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check header authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Tidak ada akses. Token tidak ditemukan'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    if (req.user.status !== 'aktif') {
      return res.status(401).json({
        success: false,
        message: 'Akun Anda tidak aktif'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau expired'
    });
  }
};

// Role authorization
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} tidak memiliki akses ke resource ini`
      });
    }
    next();
  };
};