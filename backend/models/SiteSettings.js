const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    // ── Singleton key — only one document ever exists ──
    _key: {
      type: String,
      default: 'global',
      unique: true,
      immutable: true,
    },

    factoryName: {
      type: String,
      required: [true, 'Factory name is required'],
      trim: true,
      maxlength: [150, 'Factory name cannot exceed 150 characters'],
      default: 'Abdullah Marble Factory',
    },

    tagline: {
      type: String,
      trim: true,
      maxlength: [250, 'Tagline cannot exceed 250 characters'],
      default: 'Crafting Timeless Spaces with Premium Natural Stone',
    },

    location: {
      address: { type: String, trim: true, default: 'Main Haroonabad Road, Near THQ Hospital' },
      city: { type: String, trim: true, default: 'Fort Abbas' },
      district: { type: String, trim: true, default: 'Bahawalnagar' },
      province: { type: String, trim: true, default: 'Punjab' },
      country: { type: String, trim: true, default: 'Pakistan' },
      mapEmbedUrl: { type: String, trim: true, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55835.45268482476!2d72.825227!3d29.192518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c8340d860d5b5%3A0x6b1cfb8849ad7e59!2sFort%20Abbas%2C%20Bahawalnagar%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s' },
    },

    owners: [
      {
        name: { type: String, trim: true, default: 'Malik Yasir Bashir' },
        phone: { type: String, trim: true, default: '0345-4792176' },
        whatsapp: { type: String, trim: true, default: '0345-4792176' },
        role: { type: String, trim: true, default: 'Owner / Managing Director' },
      },
      {
        name: { type: String, trim: true, default: 'Malik Nasir Iqbal' },
        phone: { type: String, trim: true, default: '0342-7150318' },
        whatsapp: { type: String, trim: true, default: '0342-7150318' },
        role: { type: String, trim: true, default: 'Owner / Factory Operations' },
      },
    ],

    contact: {
      phone: {
        type: String,
        trim: true,
        default: '0345-4792176',
      },
      secondaryPhone: {
        type: String,
        trim: true,
        default: '0342-7150318',
      },
      whatsapp: {
        type: String,
        trim: true,
        default: '0345-4792176',
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'info@abdullahmarble.com',
      },
      owner1Name: { type: String, default: 'Malik Yasir Bashir' },
      owner1Phone: { type: String, default: '0345-4792176' },
      owner2Name: { type: String, default: 'Malik Nasir Iqbal' },
      owner2Phone: { type: String, default: '0342-7150318' },
    },

    socialLinks: {
      facebook: { type: String, trim: true, default: '' },
      instagram: { type: String, trim: true, default: '' },
      youtube: { type: String, trim: true, default: '' },
      twitter: { type: String, trim: true, default: '' },
      tiktok: { type: String, trim: true, default: '' },
    },

    businessHours: {
      monday:    { type: String, default: '9:00 AM – 6:00 PM' },
      tuesday:   { type: String, default: '9:00 AM – 6:00 PM' },
      wednesday: { type: String, default: '9:00 AM – 6:00 PM' },
      thursday:  { type: String, default: '9:00 AM – 6:00 PM' },
      friday:    { type: String, default: '9:00 AM – 12:00 PM' },
      saturday:  { type: String, default: '9:00 AM – 6:00 PM' },
      sunday:    { type: String, default: 'Closed' },
    },

    seoTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'SEO title cannot exceed 70 characters'],
      default: 'Abdullah Marble Factory — Premium Natural Marble & Stone',
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'SEO description cannot exceed 160 characters'],
      default: 'Premium natural marble, granite, and stone products crafted with precision.',
    },
  },
  { timestamps: true }
);

// Static helper: get the singleton document, creating it if it doesn't exist
siteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne({ _key: 'global' });
  if (!settings) {
    settings = await this.create({ _key: 'global' });
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
