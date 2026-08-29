const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'abdullah_marble_factory_super_secret_jwt_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Helper to generate signed JWT token
const signToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
const loginAdmin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const identifier = (username || email || '').trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username/email and password.',
      });
    }

    let admin = null;

    // 1. Try to query database if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      admin = await Admin.findOne({
        $or: [
          { username: identifier.toLowerCase() },
          { email: identifier.toLowerCase() },
        ],
        isActive: true,
      }).select('+password');

      if (admin) {
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials. Please check your username and password.',
          });
        }

        // Update lastLogin
        admin.lastLogin = new Date();
        await admin.save({ validateBeforeSave: false });

        const token = signToken(admin);

        // Set httpOnly cookie
        res.cookie('adminToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
          success: true,
          message: 'Login successful',
          token,
          admin: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            lastLogin: admin.lastLogin,
          },
        });
      }
    }

    // 2. Fallback bootstrap admin credentials for dev mode / initial setup
    const isDefaultUser =
      identifier.toLowerCase() === 'admin' ||
      identifier.toLowerCase() === 'admin@abdullahmarble.com';
    const isDefaultPass = password === 'admin123' || password === 'admin';

    if (isDefaultUser && isDefaultPass) {
      const fallbackAdmin = {
        _id: 'admin-master-001',
        username: 'admin',
        email: 'admin@abdullahmarble.com',
        role: 'superadmin',
        lastLogin: new Date(),
      };

      const token = signToken(fallbackAdmin);

      res.cookie('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
        message: 'Login successful (Master Admin)',
        token,
        admin: fallbackAdmin,
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please check your username and password.',
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      admin: req.admin,
    });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
const logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie('adminToken');
    return res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginAdmin,
  getMe,
  logoutAdmin,
};
