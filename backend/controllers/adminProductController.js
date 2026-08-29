const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { mockProducts, mockCategories } = require('../data/mockData');

// ─── GET /api/admin/products ──────────────────────────────────────────────────
const getAdminProducts = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (status === 'active') filter.isActive = true;
      if (status === 'hidden') filter.isActive = false;
      if (category && category !== 'all') {
        if (mongoose.Types.ObjectId.isValid(category)) {
          filter.category = category;
        }
      }
      if (search && search.trim()) {
        filter.$or = [
          { name: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } },
        ];
      }

      const products = await Product.find(filter)
        .populate('category', 'name slug')
        .sort({ sortOrder: 1, createdAt: -1 })
        .lean();

      return res.json({ success: true, products });
    }

    // Fallback mock
    let list = [...mockProducts];
    if (status === 'active') list = list.filter((p) => p.isActive);
    if (status === 'hidden') list = list.filter((p) => !p.isActive);
    if (category && category !== 'all') {
      list = list.filter(
        (p) =>
          p.category?._id === category ||
          p.category?.slug === category ||
          p.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    return res.json({ success: true, products: list });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/admin/products ─────────────────────────────────────────────────
const createAdminProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      description,
      finish,
      size,
      application,
      availability,
      isFeatured,
      isActive,
      images,
      sortOrder,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Product name is required.' });
    }

    // Process image uploads if multer files provided
    let finalImages = [];
    if (req.files && req.files.length > 0) {
      const host = req.protocol + '://' + req.get('host');
      const uploadedUrls = req.files.map((f) => `${host}/uploads/${f.filename}`);
      finalImages = finalImages.concat(uploadedUrls);
    }

    if (images) {
      const parsedImages = typeof images === 'string' ? JSON.parse(images || '[]') : images;
      if (Array.isArray(parsedImages)) {
        finalImages = finalImages.concat(parsedImages);
      } else if (typeof parsedImages === 'string' && parsedImages.trim()) {
        finalImages.push(parsedImages.trim());
      }
    }

    if (finalImages.length === 0) {
      finalImages = ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'];
    }

    const parseArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          return val.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
      return [];
    };

    const newProductData = {
      name: name.trim(),
      category: category || null,
      description: (description || '').trim(),
      images: finalImages,
      finish: parseArray(finish),
      size: parseArray(size),
      application: parseArray(application),
      availability: availability || 'In Stock',
      isFeatured: isFeatured === true || isFeatured === 'true',
      isActive: isActive === undefined ? true : isActive === true || isActive === 'true',
      sortOrder: parseInt(sortOrder || '0', 10),
    };

    if (mongoose.connection.readyState === 1) {
      const product = await Product.create(newProductData);
      const populated = await Product.findById(product._id).populate('category', 'name slug');
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: populated,
      });
    }

    // Mock fallback
    const mockCat = mockCategories.find((c) => c._id === category || c.slug === category) || mockCategories[0];
    const createdMock = {
      _id: `prod-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...newProductData,
      category: mockCat,
    };
    mockProducts.unshift(createdMock);

    return res.status(201).json({
      success: true,
      message: 'Product created successfully (in-memory mode)',
      product: createdMock,
    });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/admin/products/:id ──────────────────────────────────────────────
const updateAdminProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      description,
      finish,
      size,
      application,
      availability,
      isFeatured,
      isActive,
      images,
      sortOrder,
    } = req.body;

    let finalImages = [];
    if (req.files && req.files.length > 0) {
      const host = req.protocol + '://' + req.get('host');
      const uploadedUrls = req.files.map((f) => `${host}/uploads/${f.filename}`);
      finalImages = finalImages.concat(uploadedUrls);
    }

    if (images) {
      const parsedImages = typeof images === 'string' ? JSON.parse(images || '[]') : images;
      if (Array.isArray(parsedImages)) {
        finalImages = finalImages.concat(parsedImages);
      } else if (typeof parsedImages === 'string' && parsedImages.trim()) {
        finalImages.push(parsedImages.trim());
      }
    }

    const parseArray = (val) => {
      if (!val) return undefined;
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          return val.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
      return undefined;
    };

    const updateFields = {};
    if (name) updateFields.name = name.trim();
    if (category) updateFields.category = category;
    if (description !== undefined) updateFields.description = description.trim();
    if (finalImages.length > 0) updateFields.images = finalImages;
    if (finish !== undefined) updateFields.finish = parseArray(finish);
    if (size !== undefined) updateFields.size = parseArray(size);
    if (application !== undefined) updateFields.application = parseArray(application);
    if (availability) updateFields.availability = availability;
    if (isFeatured !== undefined) updateFields.isFeatured = isFeatured === true || isFeatured === 'true';
    if (isActive !== undefined) updateFields.isActive = isActive === true || isActive === 'true';
    if (sortOrder !== undefined) updateFields.sortOrder = parseInt(sortOrder, 10);

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Product.findByIdAndUpdate(id, updateFields, { new: true })
        .populate('category', 'name slug');

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      return res.json({
        success: true,
        message: 'Product updated successfully',
        product: updated,
      });
    }

    // Mock fallback update
    const idx = mockProducts.findIndex((p) => p._id === id || p.slug === id);
    if (idx !== -1) {
      const existing = mockProducts[idx];
      let catObj = existing.category;
      if (category) {
        catObj = mockCategories.find((c) => c._id === category || c.slug === category) || catObj;
      }
      mockProducts[idx] = {
        ...existing,
        ...updateFields,
        category: catObj,
        images: updateFields.images || existing.images,
      };
      return res.json({
        success: true,
        message: 'Product updated successfully',
        product: mockProducts[idx],
      });
    }

    return res.status(404).json({ success: false, message: 'Product not found.' });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/admin/products/:id/toggle-status ──────────────────────────────
const toggleAdminProductStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }
      product.isActive = !product.isActive;
      await product.save();

      return res.json({
        success: true,
        message: `Product is now ${product.isActive ? 'Published / Visible' : 'Hidden'}`,
        isActive: product.isActive,
      });
    }

    // Mock fallback
    const product = mockProducts.find((p) => p._id === id || p.slug === id);
    if (product) {
      product.isActive = !product.isActive;
      return res.json({
        success: true,
        message: `Product is now ${product.isActive ? 'Published / Visible' : 'Hidden'}`,
        isActive: product.isActive,
      });
    }

    return res.status(404).json({ success: false, message: 'Product not found.' });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/admin/products/:id ───────────────────────────────────────────
const deleteAdminProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }
      return res.json({ success: true, message: 'Product deleted successfully.' });
    }

    // Mock fallback
    const idx = mockProducts.findIndex((p) => p._id === id || p.slug === id);
    if (idx !== -1) {
      mockProducts.splice(idx, 1);
      return res.json({ success: true, message: 'Product deleted successfully.' });
    }

    return res.status(404).json({ success: false, message: 'Product not found.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  toggleAdminProductStatus,
  deleteAdminProduct,
};
