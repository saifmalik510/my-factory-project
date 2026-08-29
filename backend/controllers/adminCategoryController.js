const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { mockCategories, mockProducts } = require('../data/mockData');

// ─── GET /api/admin/categories ────────────────────────────────────────────────
const getAdminCategories = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find().sort({ sortOrder: 1, name: 1 }).lean();

      // Count products per category
      const categoriesWithCount = await Promise.all(
        categories.map(async (cat) => {
          const productCount = await Product.countDocuments({ category: cat._id });
          return { ...cat, productCount };
        })
      );

      return res.json({ success: true, categories: categoriesWithCount });
    }

    const categoriesWithCount = mockCategories.map((cat) => {
      const productCount = mockProducts.filter(
        (p) => p.category?._id === cat._id || p.category?.slug === cat.slug
      ).length;
      return { ...cat, productCount };
    });

    return res.json({ success: true, categories: categoriesWithCount });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/admin/categories ───────────────────────────────────────────────
const createAdminCategory = async (req, res, next) => {
  try {
    const { name, description, image, sortOrder, isActive } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    let finalImage = image || '';
    if (req.file) {
      const host = req.protocol + '://' + req.get('host');
      finalImage = `${host}/uploads/${req.file.filename}`;
    }

    const payload = {
      name: name.trim(),
      description: (description || '').trim(),
      image: finalImage,
      sortOrder: parseInt(sortOrder || '0', 10),
      isActive: isActive === undefined ? true : isActive === true || isActive === 'true',
    };

    if (mongoose.connection.readyState === 1) {
      const created = await Category.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Category created successfully',
        category: created,
      });
    }

    // Mock
    const newCat = {
      _id: `cat-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...payload,
      productCount: 0,
    };
    mockCategories.push(newCat);

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category: newCat,
    });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/admin/categories/:id ────────────────────────────────────────────
const updateAdminCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, image, sortOrder, isActive } = req.body;

    let finalImage = image;
    if (req.file) {
      const host = req.protocol + '://' + req.get('host');
      finalImage = `${host}/uploads/${req.file.filename}`;
    }

    const updateFields = {};
    if (name) updateFields.name = name.trim();
    if (description !== undefined) updateFields.description = description.trim();
    if (finalImage !== undefined) updateFields.image = finalImage;
    if (sortOrder !== undefined) updateFields.sortOrder = parseInt(sortOrder, 10);
    if (isActive !== undefined) updateFields.isActive = isActive === true || isActive === 'true';

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Category.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Category not found.' });
      }
      return res.json({ success: true, message: 'Category updated successfully', category: updated });
    }

    const idx = mockCategories.findIndex((c) => c._id === id || c.slug === id);
    if (idx !== -1) {
      mockCategories[idx] = { ...mockCategories[idx], ...updateFields };
      return res.json({ success: true, message: 'Category updated successfully', category: mockCategories[idx] });
    }

    return res.status(404).json({ success: false, message: 'Category not found.' });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/admin/categories/:id ─────────────────────────────────────────
const deleteAdminCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      // Check if products exist in category
      const productCount = await Product.countDocuments({ category: id });
      if (productCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete category. There are ${productCount} product(s) linked to it. Reassign or delete those products first.`,
        });
      }

      const deleted = await Category.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Category not found.' });
      }
      return res.json({ success: true, message: 'Category deleted successfully.' });
    }

    const idx = mockCategories.findIndex((c) => c._id === id || c.slug === id);
    if (idx !== -1) {
      mockCategories.splice(idx, 1);
      return res.json({ success: true, message: 'Category deleted successfully.' });
    }

    return res.status(404).json({ success: false, message: 'Category not found.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
};
