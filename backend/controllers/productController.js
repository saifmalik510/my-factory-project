const mongoose = require('mongoose');
const Product = require('../models/Product');
const { mockProducts } = require('../data/mockData');

// ─── GET /api/products ────────────────────────────────────────────────────────
// Query params: category, finish, application, search, featured, page, limit, sort
const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      finish,
      application,
      search,
      featured,
      page    = 1,
      limit   = 12,
      sort    = 'featured',
    } = req.query;

    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;

    // Check if database is connected
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const filter = { isActive: true };

      if (category && category !== 'all') {
        if (mongoose.Types.ObjectId.isValid(category)) {
          filter.category = category;
        }
      }

      if (finish && finish !== 'all') {
        const finishArr = finish.split(',').map((f) => f.trim());
        filter.finish = { $in: finishArr };
      }

      if (application && application !== 'all') {
        const appArr = application.split(',').map((a) => a.trim());
        filter.application = { $in: appArr };
      }

      if (search && search.trim()) {
        filter.$or = [
          { name: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } },
          { marbleType: { $regex: search.trim(), $options: 'i' } },
          { color: { $regex: search.trim(), $options: 'i' } },
          { texturePattern: { $regex: search.trim(), $options: 'i' } },
        ];
      }

      if (featured === 'true') {
        filter.isFeatured = true;
      }

      const sortMap = {
        featured : { isFeatured: -1, sortOrder: 1, createdAt: -1 },
        newest   : { createdAt: -1 },
        oldest   : { createdAt: 1 },
        name_asc : { name: 1 },
        name_desc: { name: -1 },
      };
      const sortQuery = sortMap[sort] || sortMap.featured;

      const [products, total] = await Promise.all([
        Product.find(filter)
          .populate('category', 'name slug')
          .sort(sortQuery)
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Product.countDocuments(filter),
      ]);

      if (total > 0) {
        return res.json({
          success: true,
          products,
          pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
            hasNext: pageNum < Math.ceil(total / limitNum),
            hasPrev: pageNum > 1,
          },
        });
      }
    }

    // ── Fallback to in-memory mock products ─────────────────────────────────
    let filtered = [...mockProducts].filter((p) => p.isActive);

    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      filtered = filtered.filter((p) => {
        if (p.category?._id === category || p.category?.slug === category || p.category?.name?.toLowerCase() === catLower) {
          return true;
        }
        if (catLower.includes('floor')) {
          return p.category?.slug?.includes('floor') || p.flooringSuitability?.toLowerCase().includes('supreme') || (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes('floor')));
        }
        if (catLower.includes('kitchen')) {
          return p.category?.slug?.includes('kitchen') || p.kitchenSuitability?.toLowerCase().includes('ideal') || (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes('kitchen')));
        }
        if (catLower.includes('stair')) {
          return p.category?.slug?.includes('stair') || p.stairSuitability?.toLowerCase().includes('suitable') || (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes('stair')));
        }
        if (catLower.includes('wall')) {
          return p.category?.slug?.includes('wall') || (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes('wall')));
        }
        if (catLower.includes('bath')) {
          return p.category?.slug?.includes('bath') || (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes('bath')));
        }
        if (catLower.includes('outdoor')) {
          return p.category?.slug?.includes('outdoor') || p.indoorOutdoorSuitability?.toLowerCase().includes('outdoor') || (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes('outdoor')));
        }
        if (catLower.includes('other')) {
          return p.category?.slug?.includes('other') || (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes('bar') || r.toLowerCase().includes('backlit') || r.toLowerCase().includes('table')));
        }
        const cleanedCat = catLower.replace('-marble', '').replace('-granite', '');
        return (
          (p.application && p.application.some((a) => a.toLowerCase().includes(cleanedCat))) ||
          (p.recommendedUses && p.recommendedUses.some((r) => r.toLowerCase().includes(cleanedCat)))
        );
      });
    }

    if (finish && finish !== 'all') {
      const finishArr = finish.split(',').map((f) => f.trim().toLowerCase());
      filtered = filtered.filter((p) =>
        p.finish && p.finish.some((f) => finishArr.includes(f.toLowerCase()))
      );
    }

    if (application && application !== 'all') {
      const appArr = application.split(',').map((a) => a.trim().toLowerCase());
      filtered = filtered.filter((p) =>
        (p.application && p.application.some((a) => appArr.some((app) => a.toLowerCase().includes(app)))) ||
        (p.recommendedUses && p.recommendedUses.some((r) => appArr.some((app) => r.toLowerCase().includes(app))))
      );
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.marbleType?.toLowerCase().includes(q) ||
          p.materialType?.toLowerCase().includes(q) ||
          p.color?.toLowerCase().includes(q) ||
          p.texturePattern?.toLowerCase().includes(q)
      );
    }

    if (featured === 'true') {
      filtered = filtered.filter((p) => p.isFeatured);
    }

    if (sort === 'name_asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name_desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    const total = filtered.length;
    const paginatedProducts = filtered.slice(skip, skip + limitNum);

    return res.json({
      success: true,
      products: paginatedProducts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/products/:id ────────────────────────────────────────────────────
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const product = await Product.findOne({ _id: id, isActive: true })
        .populate('category', 'name slug')
        .lean();

      if (product) {
        return res.json({ success: true, product });
      }
    }

    // Fallback to mock product search by ID or slug
    const mock = mockProducts.find(
      (p) => p._id === id || p.slug === id || p._id.toString() === id
    );

    if (mock) {
      return res.json({ success: true, product: mock });
    }

    return res.status(404).json({
      success: false,
      message: `Product not found with id: ${id}`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, getProductById };
