const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    images: {
      type: [String], // array of file paths / URLs
      validate: {
        validator: (arr) => arr.length <= 10,
        message: 'A product can have at most 10 images',
      },
      default: [],
    },
    materialType: {
      type: String,
      trim: true,
      default: 'Marble', // 'Marble' | 'Granite'
    },
    marbleType: {
      type: String,
      trim: true,
      default: 'Natural Stone',
    },
    color: {
      type: String,
      trim: true,
      default: 'White / Grey',
    },
    texturePattern: {
      type: String,
      trim: true,
      default: 'Natural Veined',
    },
    recommendedUses: {
      type: [String],
      default: [],
    },
    stairSuitability: {
      type: String,
      trim: true,
      default: 'Highly Recommended for Stair Treads, Risers & Landings',
    },
    kitchenSuitability: {
      type: String,
      trim: true,
      default: 'Highly Recommended for Kitchen Countertops & Islands',
    },
    flooringSuitability: {
      type: String,
      trim: true,
      default: 'Highly Recommended for High-Traffic Residential & Commercial Flooring',
    },
    indoorOutdoorSuitability: {
      type: String,
      trim: true,
      default: 'Suitable for Indoor & Covered Outdoor spaces',
    },
    finish: {
      type: [String],
      enum: {
        values: ['Polished', 'Honed', 'Brushed', 'Sandblasted', 'Flamed', 'Natural', 'Other'],
        message: '{VALUE} is not a valid finish type',
      },
      default: ['Polished', 'Honed'],
    },
    size: {
      // Represents available slab / tile sizes
      type: [String],
      default: ['12" x 12"', '12" x 24"', '24" x 24"', 'Custom Slabs'],
    },
    application: {
      type: [String],
      default: ['Flooring', 'Wall Cladding'],
    },
    availability: {
      type: String,
      enum: {
        values: ['In Stock', 'Out of Stock', 'Made to Order', 'Limited Stock'],
        message: '{VALUE} is not a valid availability status',
      },
      default: 'In Stock',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from name
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for common queries
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Product', productSchema);
