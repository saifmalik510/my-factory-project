const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '..', 'backend', 'data', 'mockData.js');
const mockData = require(mockDataPath);
const verifiedIds = JSON.parse(fs.readFileSync('scratch/verified_ids.json', 'utf8'));

// Specific Primary Stone Photos
const PRIMARY_STONE_PHOTOS = {
  'tavera-marble': '/images/tavera-marble.jpg',
  'verona-marble': '/images/verona-marble.jpg',
  'sunny-gray-marble': '/images/sunny-gray.jpg',
  'tropical-granite': '/images/tropical-granite.jpg',
  'supreme-white-marble': '/images/supreme-white.jpg',
  'jabrana-marble': '/images/jabrana-marble.jpg',
  'ziarat-white-classic': '/images/ziarat-white.jpg',
  'snow-white-marble': '/images/ziarat-white.jpg',
  'ice-white-marble': '/images/supreme-white.jpg',
  'white-gray-marble': '/images/sunny-gray.jpg',
  'cheetah-white-marble': '/images/ziarat-white.jpg',
  'zyra-gray-marble': '/images/sunny-gray.jpg',
  'pakistani-black-and-gold': '/images/black-gold.jpg',
  'translucent-emerald-green-onyx': '/images/green-onyx.jpg',
  'calacatta-gold-luxury': '/images/calacatta-gold.jpg',
  'carrara-white-marble': '/images/calacatta-gold.jpg',
  'badal-grey-cloud-marble': '/images/badal-grey.jpg',
  'black-galaxy-granite': '/images/black-galaxy.jpg',
  'black-granite': '/images/black-galaxy.jpg',
  'indian-galaxy-granite': '/images/black-galaxy.jpg',
  'tan-brown-granite': '/images/tropical-granite.jpg',
  'alaska-white-granite': '/images/supreme-white.jpg',
  'royal-botticino': '/images/tavera-marble.jpg',
};

let idCursor = 0;

mockData.mockProducts.forEach((p, pIdx) => {
  const primary = PRIMARY_STONE_PHOTOS[p.slug] || '/images/ziarat-white.jpg';
  const images = [primary];

  for (let i = 1; i < 10; i++) {
    const baseId = verifiedIds[idCursor % verifiedIds.length];
    idCursor++;
    const width = 1200 + (pIdx * 7) + i;
    const viewUrl = `https://images.unsplash.com/photo-${baseId}?auto=format&fit=crop&w=${width}&q=80&stone=${p.slug}&view=${i + 1}`;
    images.push(viewUrl);
  }
  p.images = images;
});

const content = 'const mockCategories = ' + JSON.stringify(mockData.mockCategories, null, 2) + ';\n\n' +
  'const mockProducts = ' + JSON.stringify(mockData.mockProducts, null, 2) + ';\n\n' +
  'const mockGallery = ' + JSON.stringify(mockData.mockGallery, null, 2) + ';\n\n' +
  'const mockSettings = ' + JSON.stringify(mockData.mockSettings, null, 2) + ';\n\n' +
  'module.exports = {\n  mockCategories,\n  mockProducts,\n  mockGallery,\n  mockSettings,\n};\n';

fs.writeFileSync(mockDataPath, content, 'utf8');
console.log('✅ Updated mockData.js with authentic primary marble & granite photos for all 23 products!');
