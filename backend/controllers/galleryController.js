const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');
const Product = require('../models/Product');
const { mockGallery, mockProducts } = require('../data/mockData');

// ─── Helper to generate rich gallery items from products ─────────────────────
function buildGalleryFromProducts(productsList) {
  const items = [];
  (productsList || []).forEach((p) => {
    const isGranite =
      (p.materialType || '').toLowerCase() === 'granite' ||
      p.name.toLowerCase().includes('granite');
    const matType = p.materialType || (isGranite ? 'Granite' : 'Marble');

    (p.images || []).forEach((imgUrl, idx) => {
      const caption =
        p.imageCaptions?.[idx] ||
        `${p.name} architectural view ${idx + 1}`;

      items.push({
        _id: `gal-${p.slug || p._id}-${idx}`,
        title: `${p.name} — Photo ${idx + 1}`,
        imagePath: imgUrl,
        productName: p.name,
        productSlug: p.slug || p._id,
        productId: p._id,
        materialType: matType,
        category: p.category,
        application: p.application || p.recommendedUses || [],
        description: caption,
        tags: [
          p.name,
          matType,
          p.category?.name || 'Natural Stone',
          ...(p.application || []),
          ...(p.recommendedUses || []),
        ],
        sortOrder: p.sortOrder ? p.sortOrder * 10 + idx : idx,
        isActive: true,
      });
    });
  });
  return items;
}

// ─── GET /api/gallery ─────────────────────────────────────────────────────────
const getGallery = async (req, res, next) => {
  try {
    const { category, material, limit = 200 } = req.query;

    let allItems = [];

    if (mongoose.connection.readyState === 1) {
      try {
        const dbProducts = await Product.find({ isActive: true })
          .populate('category', 'name slug')
          .lean();

        if (dbProducts && dbProducts.length > 0) {
          allItems = buildGalleryFromProducts(dbProducts);
        }

        const customGallery = await Gallery.find({ isActive: true })
          .populate('category', 'name slug')
          .lean();

        if (customGallery && customGallery.length > 0) {
          customGallery.forEach((cg) => {
            allItems.push({
              _id: cg._id.toString(),
              title: cg.title,
              imagePath: cg.imagePath,
              productName: cg.title,
              materialType: 'Marble',
              category: cg.category,
              description: cg.description || cg.title,
              tags: cg.tags || [],
              isActive: true,
            });
          });
        }
      } catch (dbErr) {
        console.warn('DB query in getGallery fallback to mockProducts:', dbErr.message);
      }
    }

    // Fallback to in-memory mock products (which has all 23 products with 10 images each)
    if (allItems.length === 0) {
      allItems = buildGalleryFromProducts(mockProducts);

      mockGallery.forEach((g) => {
        allItems.push({
          _id: g._id,
          title: g.title,
          imagePath: g.imagePath,
          productName: g.title,
          materialType: 'Marble',
          category: g.category,
          description: g.description,
          tags: g.tags,
          isActive: true,
        });
      });
    }

    // Apply filtering
    let filtered = allItems;

    if (category && category !== 'all' && category !== 'All') {
      const catLower = category.toLowerCase();

      filtered = filtered.filter((item) => {
        const catSlug = item.category?.slug?.toLowerCase() || '';
        const catName = item.category?.name?.toLowerCase() || '';
        const tagsLower = (item.tags || []).map((t) => t.toLowerCase());
        const appsLower = (item.application || []).map((a) => a.toLowerCase());

        if (catSlug === catLower || catName === catLower) return true;

        if (catLower === 'floor' || catLower.includes('floor')) {
          return (
            catSlug.includes('floor') ||
            appsLower.some((a) => a.includes('floor')) ||
            tagsLower.some((t) => t.includes('floor'))
          );
        }

        if (catLower === 'kitchen' || catLower.includes('kitchen')) {
          return (
            catSlug.includes('kitchen') ||
            appsLower.some((a) => a.includes('kitchen') || a.includes('countertop') || a.includes('island')) ||
            tagsLower.some((t) => t.includes('kitchen') || t.includes('countertop') || t.includes('island'))
          );
        }

        if (catLower === 'stairs' || catLower.includes('stair')) {
          return (
            catSlug.includes('stair') ||
            appsLower.some((a) => a.includes('stair') || a.includes('step')) ||
            tagsLower.some((t) => t.includes('stair') || t.includes('step'))
          );
        }

        if (catLower === 'wall' || catLower.includes('wall')) {
          return (
            catSlug.includes('wall') ||
            appsLower.some((a) => a.includes('wall') || a.includes('cladding') || a.includes('facade')) ||
            tagsLower.some((t) => t.includes('wall') || t.includes('cladding'))
          );
        }

        if (catLower === 'bathroom' || catLower.includes('bath')) {
          return (
            catSlug.includes('bath') ||
            appsLower.some((a) => a.includes('bath') || a.includes('vanity')) ||
            tagsLower.some((t) => t.includes('bath') || t.includes('vanity'))
          );
        }

        if (catLower === 'outdoor' || catLower.includes('outdoor')) {
          return (
            catSlug.includes('outdoor') ||
            appsLower.some((a) => a.includes('outdoor') || a.includes('patio')) ||
            tagsLower.some((t) => t.includes('outdoor') || t.includes('patio'))
          );
        }

        if (catLower === 'marble') {
          return (item.materialType || '').toLowerCase() === 'marble';
        }

        if (catLower === 'granite') {
          return (item.materialType || '').toLowerCase() === 'granite';
        }

        return false;
      });
    }

    if (material && material !== 'All' && material !== 'all') {
      const matLower = material.toLowerCase();
      filtered = filtered.filter(
        (i) => (i.materialType || '').toLowerCase() === matLower
      );
    }

    return res.json({
      success: true,
      totalCount: filtered.length,
      gallery: filtered.slice(0, parseInt(limit)),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGallery };
