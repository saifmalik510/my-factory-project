const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');
const { mockGallery, mockCategories } = require('../data/mockData');

// ─── GET /api/admin/gallery ───────────────────────────────────────────────────
const getAdminGallery = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Gallery.find()
        .populate('category', 'name slug')
        .sort({ sortOrder: 1, createdAt: -1 })
        .lean();
      return res.json({ success: true, gallery: items });
    }
    return res.json({ success: true, gallery: mockGallery });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/admin/gallery ──────────────────────────────────────────────────
const createAdminGallery = async (req, res, next) => {
  try {
    const { title, category, description, tags, imagePath } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Project title is required.' });
    }

    let finalImagePath = imagePath || '';
    if (req.file) {
      const host = req.protocol + '://' + req.get('host');
      finalImagePath = `${host}/uploads/${req.file.filename}`;
    }

    if (!finalImagePath) {
      return res.status(400).json({ success: false, message: 'Project image is required.' });
    }

    const parseTags = (t) => {
      if (!t) return [];
      if (Array.isArray(t)) return t;
      if (typeof t === 'string') {
        try {
          const parsed = JSON.parse(t);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          return t.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
      return [];
    };

    const payload = {
      title: title.trim(),
      imagePath: finalImagePath,
      category: category || null,
      description: (description || '').trim(),
      tags: parseTags(tags),
      isActive: true,
    };

    if (mongoose.connection.readyState === 1) {
      const created = await Gallery.create(payload);
      const populated = await Gallery.findById(created._id).populate('category', 'name slug');
      return res.status(201).json({
        success: true,
        message: 'Gallery project uploaded successfully',
        item: populated,
      });
    }

    const mockCat = mockCategories.find((c) => c._id === category || c.slug === category) || mockCategories[0];
    const newMock = {
      _id: `gal-${Date.now()}`,
      ...payload,
      category: mockCat,
    };
    mockGallery.unshift(newMock);

    return res.status(201).json({
      success: true,
      message: 'Gallery project uploaded successfully',
      item: newMock,
    });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/admin/gallery/:id ────────────────────────────────────────────
const deleteAdminGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Gallery.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Gallery item not found.' });
      }
      return res.json({ success: true, message: 'Gallery item deleted successfully.' });
    }

    const idx = mockGallery.findIndex((g) => g._id === id);
    if (idx !== -1) {
      mockGallery.splice(idx, 1);
      return res.json({ success: true, message: 'Gallery item deleted successfully.' });
    }

    return res.status(404).json({ success: false, message: 'Gallery item not found.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminGallery,
  createAdminGallery,
  deleteAdminGallery,
};
