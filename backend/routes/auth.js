const express = require('express');
const router = express.Router();
const { loginAdmin, getMe, logoutAdmin } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', loginAdmin);

// GET /api/auth/me (Protected)
router.get('/me', protectAdmin, getMe);

// POST /api/auth/logout
router.post('/logout', logoutAdmin);

module.exports = router;
