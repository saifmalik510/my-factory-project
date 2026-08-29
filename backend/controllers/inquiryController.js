const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

// In-memory store for fallback when DB is not connected
const inMemoryInquiries = [];

// Helper to send email notification if configured
const sendEmailNotification = async (inquiryData) => {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass || !notifyEmail) {
      console.log('📧 [Email Notification] New Inquiry Received for Abdullah Marble Factory:');
      console.log(`   Customer: ${inquiryData.customerName} (${inquiryData.phone})`);
      console.log(`   Type: ${inquiryData.inquiryType || 'General'}`);
      console.log(`   Product Interest: ${inquiryData.productInterest || 'N/A'}`);
      console.log(`   Message: ${inquiryData.message || 'N/A'}`);
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Abdullah Marble Factory Website" <${smtpUser}>`,
      to: notifyEmail,
      subject: `🏛️ New ${inquiryData.inquiryType || 'Inquiry'} from ${inquiryData.customerName}`,
      html: `
        <h2>New Inquiry Submission</h2>
        <p><strong>Customer Name:</strong> ${inquiryData.customerName}</p>
        <p><strong>Phone / WhatsApp:</strong> ${inquiryData.phone}</p>
        <p><strong>Email:</strong> ${inquiryData.email || 'Not provided'}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryData.inquiryType || 'General Contact'}</p>
        <p><strong>Product / Category Interest:</strong> ${inquiryData.productInterest || 'None specified'}</p>
        <p><strong>Preferred Finish:</strong> ${inquiryData.preferredFinish || 'Not specified'}</p>
        <p><strong>Dimensions / Size:</strong> ${inquiryData.dimensions || 'Not specified'}</p>
        <p><strong>Estimated Quantity:</strong> ${inquiryData.quantity || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f4f4f4; padding:10px; border-left:3px solid #C9A84C;">
          ${inquiryData.message ? inquiryData.message.replace(/\n/g, '<br/>') : 'No additional message'}
        </blockquote>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email notification sent to ${notifyEmail}`);
  } catch (err) {
    console.error('⚠️ Could not send email notification:', err.message);
  }
};

// ─── POST /api/inquiries ──────────────────────────────────────────────────────
const createInquiry = async (req, res, next) => {
  try {
    const {
      name,
      customerName,
      phone,
      whatsapp,
      email,
      inquiryType,
      productInterest,
      productOrCategory,
      preferredFinish,
      finish,
      dimensions,
      size,
      quantity,
      message,
      _honeypot,
      website,
    } = req.body;

    // ── 1. Spam Protection / Honeypot Check ────────────────────────────────
    if (_honeypot || website) {
      console.warn('🤖 Spam bot detected via honeypot field. Silently ignoring submission.');
      // Return fake success so bot does not retry
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been submitted successfully.',
      });
    }

    // ── 2. Field Normalization & Validation ────────────────────────────────
    const finalName = (customerName || name || '').trim();
    const finalPhone = (phone || whatsapp || '').trim();
    const finalEmail = (email || '').trim();
    const finalProduct = (productInterest || productOrCategory || '').trim();
    const finalFinish = (preferredFinish || finish || '').trim();
    const finalDimensions = (dimensions || size || '').trim();
    const finalQuantity = (quantity || '').trim();
    const finalMessage = (message || '').trim();
    const finalType = inquiryType === 'Quotation Request' ? 'Quotation Request' : 'General Contact';

    if (!finalName) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    if (finalName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot exceed 100 characters.',
      });
    }

    if (!finalPhone) {
      return res.status(400).json({
        success: false,
        message: 'Phone or WhatsApp number is required.',
      });
    }

    const phoneRegex = /^[+\d\s\-()]{7,20}$/;
    if (!phoneRegex.test(finalPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number (7 to 20 digits, + or - allowed).',
      });
    }

    if (finalEmail) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(finalEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.',
        });
      }
    }

    if (finalMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot exceed 2000 characters.',
      });
    }

    const inquiryPayload = {
      customerName: finalName,
      phone: finalPhone,
      email: finalEmail,
      inquiryType: finalType,
      productInterest: finalProduct,
      preferredFinish: finalFinish,
      dimensions: finalDimensions,
      quantity: finalQuantity,
      message: finalMessage,
      status: 'New',
      submittedAt: new Date(),
    };

    let savedInquiry = null;

    // ── 3. Database Save or Fallback ─────────────────────────────────────────
    if (mongoose.connection.readyState === 1) {
      savedInquiry = await Inquiry.create(inquiryPayload);
    } else {
      savedInquiry = {
        _id: `inq-${Date.now()}`,
        ...inquiryPayload,
      };
      inMemoryInquiries.push(savedInquiry);
    }

    // ── 4. Trigger Email Notification (non-blocking) ────────────────────────
    sendEmailNotification(savedInquiry).catch((e) => console.error(e));

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our stone specialist will contact you shortly.',
      inquiry: savedInquiry,
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/inquiries (for admin/monitoring) ────────────────────────────────
const getInquiries = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(100).lean();
      return res.json({ success: true, inquiries });
    }
    return res.json({ success: true, inquiries: inMemoryInquiries });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
};
