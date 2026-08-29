const http = require('http');
const fs = require('fs');
const path = require('path');

function get(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), ok: res.statusCode >= 200 && res.statusCode < 400 });
        } catch {
          resolve({ status: res.statusCode, raw: data, ok: res.statusCode >= 200 && res.statusCode < 400 });
        }
      });
    }).on('error', (err) => resolve({ error: err.message, ok: false }));
  });
}

async function runAudit() {
  console.log('================================================================');
  console.log('🏛️ ABDULLAH MARBLE FACTORY — MASTER PRODUCTION QUALITY AUDIT');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(name, condition, extra = '') {
    if (condition) {
      console.log(`✅ [PASS] ${name} ${extra}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name} ${extra}`);
      failed++;
    }
  }

  // 1. Health API
  const health = await get('http://localhost:5000/api/health');
  assert('Backend Health Endpoint (/api/health)', health.status === 200);

  // 2. Settings API
  const settings = await get('http://localhost:5000/api/settings');
  assert('Site Settings API (/api/settings)', settings.status === 200 && settings.data?.success);
  const locCity = settings.data?.settings?.location?.city || settings.data?.settings?.address?.city;
  assert('Factory Location in Settings (Fort Abbas)', locCity === 'Fort Abbas');
  const ownerPhone = settings.data?.settings?.contact?.owner1Phone || settings.data?.settings?.phones?.[0]?.number;
  assert('Managing Director Contact (0345-4792176)', ownerPhone === '0345-4792176');

  // 3. Categories API
  const categories = await get('http://localhost:5000/api/categories');
  assert('Categories API (/api/categories)', categories.status === 200 && categories.data?.success);
  assert('Category Count is 7', categories.data?.categories?.length === 7);

  // 4. Products API
  const products = await get('http://localhost:5000/api/products?limit=50');
  assert('Products API (/api/products)', products.status === 200 && products.data?.success);
  const prodList = products.data?.products || [];
  assert('Total Products in Catalog is 23', prodList.length === 23);

  // 5. Audit all 23 products for 10 unique images
  const allImages = [];
  let allHave10 = true;
  let allHaveCaptions = true;

  prodList.forEach((p) => {
    if (!p.images || p.images.length < 10) allHave10 = false;
    if (!p.imageCaptions || p.imageCaptions.length < 10) allHaveCaptions = false;
    (p.images || []).forEach((img) => allImages.push(img));
  });

  assert('Every Product has at least 10 Images', allHave10);
  assert('Every Product has 10 Descriptive View Captions', allHaveCaptions);
  assert('Total Images Recorded is 230', allImages.length === 230);
  assert('Strictly Zero Duplicate Images Across Products', new Set(allImages).size === 230);

  // 6. Gallery API
  const gallery = await get('http://localhost:5000/api/gallery?limit=300');
  assert('Gallery API (/api/gallery)', gallery.status === 200 && gallery.data?.success);
  assert('Gallery Contains 230+ High-Res Photos', (gallery.data?.gallery || []).length >= 230);

  // 7. Test Gallery Category Filters
  const galleryCats = ['Floor', 'Kitchen', 'Stairs', 'Wall', 'Bathroom', 'Outdoor', 'Marble', 'Granite'];
  for (const gc of galleryCats) {
    const gFiltered = await get(`http://localhost:5000/api/gallery?category=${encodeURIComponent(gc)}`);
    assert(`Gallery Filter for "${gc}"`, gFiltered.status === 200 && (gFiltered.data?.gallery || []).length > 0, `(${gFiltered.data?.totalCount} items)`);
  }

  // 8. Frontend Route Availability
  const frontendRoutes = [
    'http://localhost:3000',
    'http://localhost:3000/products',
    'http://localhost:3000/products/tropical-granite',
    'http://localhost:3000/products/black-granite',
    'http://localhost:3000/about',
    'http://localhost:3000/gallery',
    'http://localhost:3000/services',
    'http://localhost:3000/contact',
    'http://localhost:3000/faqs',
  ];

  for (const fr of frontendRoutes) {
    const res = await get(fr);
    assert(`Frontend Route (${fr.replace('http://localhost:3000', '') || '/'})`, res.status === 200);
  }

  // 9. Check Local Static Assets
  const requiredLocalAssets = [
    'frontend/public/images/logo.svg',
    'frontend/public/images/logo-horizontal.svg',
    'frontend/public/images/black-gold.jpg',
    'frontend/public/images/calacatta-gold.jpg',
    'frontend/public/images/green-onyx.jpg',
    'frontend/public/images/ziarat-white.jpg',
    'frontend/public/images/badal-grey.jpg',
    'frontend/public/images/black-galaxy.jpg',
  ];

  requiredLocalAssets.forEach((assetPath) => {
    const exists = fs.existsSync(path.join(__dirname, '..', assetPath));
    assert(`Local Asset (${assetPath})`, exists);
  });

  console.log('\n================================================================');
  console.log(`MASTER AUDIT SUMMARY: ${passed} Passed, ${failed} Failed.`);
  if (failed === 0) {
    console.log('🎉 100% PRODUCTION READY & VERIFIED: ALL CHECKS PASSED!');
  }
  console.log('================================================================\n');
}

runAudit();
