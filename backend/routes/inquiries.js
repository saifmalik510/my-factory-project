const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { createInquiry, getInquiries } = require('../controllers/inquiryController');

// Rate limiter for inquiries: max 15 submissions per 15 minutes per IP
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiries submitted from this IP address. Please wait a few minutes before trying again.',
  },
});

// POST /api/inquiries
router.post('/', inquiryLimiter, createInquiry);

// GET /api/inquiries (for inspection/admin)
router.get('/', getInquiries);

module.exports = router;
