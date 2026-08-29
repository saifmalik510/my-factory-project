const mongoose = require('mongoose');
const SiteSettings = require('../models/SiteSettings');
const { mockSettings } = require('../data/mockData');

// ─── GET /api/settings ────────────────────────────────────────────────────────
// Returns ONLY public-safe fields
const getPublicSettings = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const settings = await SiteSettings.getSettings();

      if (settings) {
        const publicData = {
          factoryName: settings.factoryName,
          tagline: settings.tagline,
          contact: {
            phone: settings.contact?.phone || '',
            whatsapp: settings.contact?.whatsapp || '',
            email: settings.contact?.email || '',
          },
          location: {
            address: settings.location?.address || '',
            city: settings.location?.city || '',
            province: settings.location?.province || '',
            country: settings.location?.country || '',
            mapEmbedUrl: settings.location?.mapEmbedUrl || '',
          },
          socialLinks: settings.socialLinks || {},
          businessHours: settings.businessHours || {},
          seoTitle: settings.seoTitle || '',
          seoDescription: settings.seoDescription || '',
        };

        return res.json({ success: true, settings: publicData });
      }
    }

    return res.json({ success: true, settings: mockSettings });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPublicSettings };
