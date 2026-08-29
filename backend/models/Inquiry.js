const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[+\d\s\-()]{7,20}$/, 'Please provide a valid phone number'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      default: '',
    },
    inquiryType: {
      type: String,
      enum: ['General Contact', 'Quotation Request'],
      default: 'General Contact',
    },
    productInterest: {
      type: String,
      trim: true,
      maxlength: [200, 'Product interest cannot exceed 200 characters'],
      default: '',
    },
    preferredFinish: {
      type: String,
      trim: true,
      default: '',
    },
    dimensions: {
      // Free-text, e.g. "3m x 4m" or "Length: 5ft, Width: 2ft"
      type: String,
      trim: true,
      maxlength: [200, 'Dimensions cannot exceed 200 characters'],
      default: '',
    },
    quantity: {
      type: String,
      trim: true,
      maxlength: [100, 'Quantity field cannot exceed 100 characters'],
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      default: '',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'In Progress', 'Quoted', 'Closed', 'Spam'],
        message: '{VALUE} is not a valid inquiry status',
      },
      default: 'New',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

inquirySchema.index({ status: 1, submittedAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
