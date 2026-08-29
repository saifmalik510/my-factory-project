const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Memory storage for incoming files before compression
const memoryStorage = multer.memoryStorage();

// File filter: accept only image formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|avif|gif/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file format. Only JPEG, JPG, PNG, WEBP, and AVIF image files are allowed.'
      ),
      false
    );
  }
};

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB upload limit
  },
  fileFilter,
});

/**
 * Middleware to compress single or multiple uploaded images with Sharp
 * Resizes max width to 1920px, converts to optimized WebP format with 82% quality
 */
const compressImages = async (req, res, next) => {
  try {
    const processFile = async (file) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const cleanBase = path
        .basename(file.originalname, path.extname(file.originalname))
        .replace(/[^a-zA-Z0-9]/g, '-')
        .toLowerCase();

      const outputFilename = `${cleanBase}-${uniqueSuffix}.webp`;
      const outputPath = path.join(uploadDir, outputFilename);

      await sharp(file.buffer)
        .resize({ width: 1920, withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      // Attach formatted filename and path
      file.filename = outputFilename;
      file.path = outputPath;
      return file;
    };

    if (req.file) {
      await processFile(req.file);
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      await Promise.all(req.files.map((file) => processFile(file)));
    }

    next();
  } catch (err) {
    console.error('Image compression error:', err);
    next(err);
  }
};

module.exports = {
  upload,
  compressImages,
};
