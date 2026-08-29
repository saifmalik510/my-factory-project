const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');

// Fallback in-memory list
const inMemoryInquiriesList = [
  {
    _id: 'inq-01',
    customerName: 'Tariq Mehmood',
    phone: '+92 300 9876543',
    email: 'tariq@gmail.com',
    inquiryType: 'Quotation Request',
    productInterest: 'Ziarat White Classic',
    preferredFinish: 'Polished',
    dimensions: '24" x 24" Tiles',
    quantity: '1500 sq ft',
    message: 'Need urgent delivery to Fort Abbas for a newly constructed bungalow.',
    status: 'New',
    adminNotes: 'Customer called and requested price with delivery.',
    submittedAt: new Date(),
  },
  {
    _id: 'inq-02',
    customerName: 'Fatima Zahra',
    phone: '+92 321 5551234',
    email: 'fatima.design@studio.pk',
    inquiryType: 'General Contact',
    productInterest: 'Calacatta Gold Luxury',
    preferredFinish: 'Honed',
    dimensions: '10ft x 4ft Kitchen Island',
    quantity: '2 slabs',
    message: 'Architect looking for bookmatched slabs for high-end kitchen.',
    status: 'In Progress',
    adminNotes: 'Sample pictures sent via WhatsApp.',
    submittedAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    _id: 'inq-03',
    customerName: 'Usman Ali',
    phone: '+92 333 4448899',
    email: 'usman.builder@gmail.com',
    inquiryType: 'Quotation Request',
    productInterest: 'Black Galaxy Granite',
    preferredFinish: 'Polished',
    dimensions: 'Steps & Risers',
    quantity: '40 steps',
    message: 'Commercial plaza staircase cutting and bullnose profiling.',
    status: 'Quoted',
    adminNotes: 'Quotation issued at PKR 450/sq ft.',
    submittedAt: new Date(Date.now() - 3600000 * 24),
  },
];

// ─── GET /api/admin/inquiries ─────────────────────────────────────────────────
const getAdminInquiries = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (status && status !== 'all') {
        filter.status = status;
      }
      if (search && search.trim()) {
        filter.$or = [
          { customerName: { $regex: search.trim(), $options: 'i' } },
          { phone: { $regex: search.trim(), $options: 'i' } },
          { productInterest: { $regex: search.trim(), $options: 'i' } },
        ];
      }

      const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).lean();
      return res.json({ success: true, inquiries });
    }

    let list = [...inMemoryInquiriesList];
    if (status && status !== 'all') {
      list = list.filter((i) => i.status?.toLowerCase() === status.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.customerName?.toLowerCase().includes(q) ||
          i.phone?.includes(q) ||
          i.productInterest?.toLowerCase().includes(q)
      );
    }

    return res.json({ success: true, inquiries: list });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/admin/inquiries/:id/status ────────────────────────────────────
const updateAdminInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const allowedStatuses = ['New', 'In Progress', 'Quoted', 'Closed', 'Spam'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}`,
      });
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Inquiry.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      return res.json({ success: true, message: 'Inquiry updated successfully', inquiry: updated });
    }

    const inq = inMemoryInquiriesList.find((i) => i._id === id);
    if (inq) {
      if (status) inq.status = status;
      if (adminNotes !== undefined) inq.adminNotes = adminNotes;
      return res.json({ success: true, message: 'Inquiry updated successfully', inquiry: inq });
    }

    return res.status(404).json({ success: false, message: 'Inquiry not found.' });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/admin/inquiries/:id ──────────────────────────────────────────
const deleteAdminInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Inquiry.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      return res.json({ success: true, message: 'Inquiry deleted successfully.' });
    }

    const idx = inMemoryInquiriesList.findIndex((i) => i._id === id);
    if (idx !== -1) {
      inMemoryInquiriesList.splice(idx, 1);
      return res.json({ success: true, message: 'Inquiry deleted successfully.' });
    }

    return res.status(404).json({ success: false, message: 'Inquiry not found.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminInquiries,
  updateAdminInquiryStatus,
  deleteAdminInquiry,
};
