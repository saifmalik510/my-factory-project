require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Gallery = require('./models/Gallery');
const SiteSettings = require('./models/SiteSettings');
const {
  mockCategories,
  mockProducts,
  mockGallery,
  mockSettings,
} = require('./data/mockData');

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri || uri.includes('<username>')) {
      console.log('⚠️  MONGO_URI is not set or contains placeholders. Skipping database seeding.');
      process.exit(0);
    }

    console.log('⏳ Connecting to MongoDB for seeding...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB.');

    // Clear existing data
    await Promise.all([
      Category.deleteMany({}),
      Product.deleteMany({}),
      Gallery.deleteMany({}),
      SiteSettings.deleteMany({}),
    ]);
    console.log('🧹 Cleaned old database entries.');

    // Insert categories
    const createdCategories = await Category.insertMany(
      mockCategories.map((c) => ({
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image,
        isActive: true,
        sortOrder: c.sortOrder,
      }))
    );
    console.log(`✅ Inserted ${createdCategories.length} categories.`);

    const catMap = {};
    createdCategories.forEach((cat) => {
      catMap[cat.slug] = cat._id;
    });

    // Insert products with actual category ObjectId refs
    const productsToInsert = mockProducts.map((p) => {
      const catSlug = p.category?.slug || 'stairs-kitchen';
      return {
        name: p.name,
        slug: p.slug,
        category: catMap[catSlug] || createdCategories[0]._id,
        materialType: p.materialType || 'Marble',
        marbleType: p.marbleType,
        color: p.color,
        texturePattern: p.texturePattern,
        recommendedUses: p.recommendedUses,
        stairSuitability: p.stairSuitability,
        kitchenSuitability: p.kitchenSuitability,
        flooringSuitability: p.flooringSuitability,
        indoorOutdoorSuitability: p.indoorOutdoorSuitability,
        description: p.description,
        images: p.images,
        finish: p.finish,
        size: p.size,
        application: p.application,
        availability: p.availability,
        isFeatured: p.isFeatured,
        isActive: true,
        sortOrder: p.sortOrder,
      };
    });

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`✅ Inserted ${createdProducts.length} products.`);

    // Insert Gallery
    const galleryToInsert = mockGallery.map((g) => {
      const catSlug = g.category?.slug || 'pakistani-marble';
      return {
        title: g.title,
        imagePath: g.imagePath,
        category: catMap[catSlug] || createdCategories[0]._id,
        description: g.description,
        tags: g.tags,
        isActive: true,
      };
    });
    const createdGallery = await Gallery.insertMany(galleryToInsert);
    console.log(`✅ Inserted ${createdGallery.length} gallery items.`);

    // Insert SiteSettings
    await SiteSettings.create({
      _key: 'global',
      ...mockSettings,
    });
    console.log('✅ Created default SiteSettings.');

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

seedDB();
