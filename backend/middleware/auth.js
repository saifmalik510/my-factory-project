const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const protectAdmin = async (req, res, next) => {
  let token = null;

  // 1. Extract from Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Or from signed/unsigned cookies
  else if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'abdullah_marble_factory_super_secret_jwt_key_2026';
    const decoded = jwt.verify(token, secret);

    // If MongoDB is connected, find the admin record in DB
    if (mongoose.connection.readyState === 1 && decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin || !admin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'The account associated with this token is inactive or no longer exists.',
        });
      }
      req.admin = admin;
    } else {
      // Fallback in-memory admin decoded from JWT
      req.admin = {
        _id: decoded.id || 'admin-default',
        username: decoded.username || 'admin',
        email: decoded.email || 'admin@abdullahmarble.com',
        role: decoded.role || 'superadmin',
      };
    }

    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.',
    });
  }
};

module.exports = {
  protectAdmin,
};
