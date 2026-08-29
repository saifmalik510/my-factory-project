const mongoose = require('mongoose');
const SiteSettings = require('../models/SiteSettings');
const { mockSettings } = require('../data/mockData');

// ─── GET /api/admin/settings ──────────────────────────────────────────────────
const getAdminSettings = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const settings = await SiteSettings.getSettings();
      return res.json({ success: true, settings });
    }
    return res.json({ success: true, settings: mockSettings });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/admin/settings ──────────────────────────────────────────────────
const updateAdminSettings = async (req, res, next) => {
  try {
    const {
      factoryName,
      tagline,
      contact,
      location,
      socialLinks,
      businessHours,
      seoTitle,
      seoDescription,
    } = req.body;

    const updateFields = {};
    if (factoryName) updateFields.factoryName = factoryName.trim();
    if (tagline !== undefined) updateFields.tagline = tagline.trim();
    if (contact) updateFields.contact = contact;
    if (location) updateFields.location = location;
    if (socialLinks) updateFields.socialLinks = socialLinks;
    if (businessHours) updateFields.businessHours = businessHours;
    if (seoTitle) updateFields.seoTitle = seoTitle.trim();
    if (seoDescription) updateFields.seoDescription = seoDescription.trim();

    if (mongoose.connection.readyState === 1) {
      let settings = await SiteSettings.findOne({ _key: 'global' });
      if (!settings) {
        settings = new SiteSettings({ _key: 'global', ...updateFields });
      } else {
        Object.assign(settings, updateFields);
      }
      await settings.save();

      return res.json({
        success: true,
        message: 'Site settings updated successfully',
        settings,
      });
    }

    // Mock update
    Object.assign(mockSettings, updateFields);

    return res.json({
      success: true,
      message: 'Site settings updated successfully (in-memory)',
      settings: mockSettings,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminSettings,
  updateAdminSettings,
};
