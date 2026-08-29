const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const { upload, compressImages } = require('../middleware/upload');

// Controllers
const {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  toggleAdminProductStatus,
  deleteAdminProduct,
} = require('../controllers/adminProductController');

const {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} = require('../controllers/adminCategoryController');

const {
  getAdminGallery,
  createAdminGallery,
  deleteAdminGallery,
} = require('../controllers/adminGalleryController');

const {
  getAdminInquiries,
  updateAdminInquiryStatus,
  deleteAdminInquiry,
} = require('../controllers/adminInquiryController');

const {
  getAdminSettings,
  updateAdminSettings,
} = require('../controllers/adminSettingsController');

const Product = require('../models/Product');
const Category = require('../models/Category');
const Gallery = require('../models/Gallery');
const Inquiry = require('../models/Inquiry');
const {
  mockProducts,
  mockCategories,
  mockGallery,
} = require('../data/mockData');
const mongoose = require('mongoose');

// ── Protect all /api/admin/* routes ───────────────────────────────────────────
router.use(protectAdmin);

// ── Dashboard Overview Stats ──────────────────────────────────────────────────
router.get('/dashboard-stats', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const [productsCount, categoriesCount, galleryCount, inquiriesCount, recentInquiries] =
        await Promise.all([
          Product.countDocuments(),
          Category.countDocuments(),
          Gallery.countDocuments(),
          Inquiry.countDocuments(),
          Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
        ]);

      return res.json({
        success: true,
        stats: {
          products: productsCount,
          categories: categoriesCount,
          gallery: galleryCount,
          inquiries: inquiriesCount,
        },
        recentInquiries,
        admin: req.admin,
      });
    }

    return res.json({
      success: true,
      stats: {
        products: mockProducts.length,
        categories: mockCategories.length,
        gallery: mockGallery.length,
        inquiries: 12,
      },
      recentInquiries: [
        {
          _id: 'inq-01',
          customerName: 'Tariq Mehmood',
          phone: '+92 300 9876543',
          inquiryType: 'Quotation Request',
          productInterest: 'Ziarat White Classic',
          dimensions: '24" x 24"',
          quantity: '1500 sq ft',
          status: 'New',
          submittedAt: new Date(),
        },
        {
          _id: 'inq-02',
          customerName: 'Fatima Zahra',
          phone: '+92 321 5551234',
          inquiryType: 'General Contact',
          productInterest: 'Calacatta Gold',
          message: 'Interested in countertop templating in Bahawalpur.',
          status: 'In Progress',
          submittedAt: new Date(Date.now() - 3600000),
        },
      ],
      admin: req.admin,
    });
  } catch (err) {
    next(err);
  }
});

// ── Products CRUD ─────────────────────────────────────────────────────────────
router.get('/products', getAdminProducts);
router.post('/products', upload.array('images', 10), compressImages, createAdminProduct);
router.put('/products/:id', upload.array('images', 10), compressImages, updateAdminProduct);
router.patch('/products/:id/toggle-status', toggleAdminProductStatus);
router.delete('/products/:id', deleteAdminProduct);

// ── Categories CRUD ───────────────────────────────────────────────────────────
router.get('/categories', getAdminCategories);
router.post('/categories', upload.single('image'), compressImages, createAdminCategory);
router.put('/categories/:id', upload.single('image'), compressImages, updateAdminCategory);
router.delete('/categories/:id', deleteAdminCategory);

// ── Gallery CRUD ──────────────────────────────────────────────────────────────
router.get('/gallery', getAdminGallery);
router.post('/gallery', upload.single('image'), compressImages, createAdminGallery);
router.delete('/gallery/:id', deleteAdminGallery);

// ── Inquiries Management ──────────────────────────────────────────────────────
router.get('/inquiries', getAdminInquiries);
router.patch('/inquiries/:id/status', updateAdminInquiryStatus);
router.delete('/inquiries/:id', deleteAdminInquiry);

// ── Site Settings Management ──────────────────────────────────────────────────
router.get('/settings', getAdminSettings);
router.put('/settings', updateAdminSettings);

module.exports = router;
