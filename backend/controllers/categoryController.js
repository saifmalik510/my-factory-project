const mongoose = require('mongoose');
const Category = require('../models/Category');
const { mockCategories } = require('../data/mockData');

// ─── GET /api/categories ──────────────────────────────────────────────────────
const getCategories = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find({ isActive: true })
        .sort({ sortOrder: 1, name: 1 })
        .lean();

      if (categories && categories.length > 0) {
        return res.json({ success: true, categories });
      }
    }

    return res.json({ success: true, categories: mockCategories });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories };
