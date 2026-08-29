import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/common/SEO';

const DEFAULT_CAPTIONS = [
  '1. Full Calibrated Slab View',
  '2. Macro Texture & Natural Crystal Vein Details',
  '3. Primary Application Installation View',
  '4. Secondary Angle & Edge Profiling',
  '5. Architectural Room Integration',
  '6. High-Gloss Polished Luster Under Natural Daylight',
  '7. Ambient Lighting & Surface Reflections',
  '8. Close-up Chamfer & Bullnose Joint Fitment',
  '9. Alternative Perspective & Texture Flow',
  '10. Completed Architectural Project Showcase',
];

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/products/${id}`);
        if (res.data?.success && res.data.product) {
          setProduct(res.data.product);
          setActiveImage(0);

          // Fetch other varieties for recommendations
          const relRes = await api.get(`/products?limit=12`);
          if (relRes.data?.success) {
            setRelated(
              (relRes.data.products || []).filter(
                (p) => p._id !== res.data.product._id && p.slug !== res.data.product.slug
              ).slice(0, 4)
            );
          }
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
        setError('Stone product not found or has been discontinued.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-serif text-xl text-[#2C2C2C]">Loading stone specifications & 10-image gallery...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#2C2C2C] mb-4">Stone Variety Not Found</h1>
        <p className="text-[#8C8279] mb-8">{error || 'The requested product is unavailable.'}</p>
        <Link
          to="/products"
          className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C59B27] transition-colors"
        >
          ← Return to Stone Catalog
        </Link>
      </div>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      ];

  const captions = Array.isArray(product.imageCaptions) && product.imageCaptions.length >= images.length
    ? product.imageCaptions
    : images.map((_, i) => DEFAULT_CAPTIONS[i] || `View ${i + 1} of ${product.name}`);

  const isGranite = (product.materialType || '').toLowerCase() === 'granite' || product.name.toLowerCase().includes('granite');

  const whatsappMessage = encodeURIComponent(
    `Hello Malik Yasir Bashir, I am inquiring about "${product.name}" (${product.materialType || (isGranite ? 'Granite' : 'Marble')}) at Abdullah Marble Factory (Fort Abbas). Please share pricing per sq.ft and availability.`
  );

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2C2C] pt-24 pb-20">
      <SEO
        title={`${product.name} — 10 Unique Views & Technical Specifications | Abdullah Marble Factory`}
        description={`Explore 10 unique photos, slab views, and installations of ${product.name}. Material: ${product.materialType || 'Marble'}, Color: ${product.color}, Pattern: ${product.texturePattern}. Fort Abbas processing facility.`}
        keywords={`${product.name}, ${product.name} 10 photos, ${product.name} stairs, ${product.name} kitchen, Fort Abbas marble`}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-xs uppercase tracking-wider text-[#8C8279] flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[#C59B27] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#C59B27] transition-colors">Products</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link
                to={`/products?category=${product.category.slug || product.category._id}`}
                className="hover:text-[#C59B27] transition-colors"
              >
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#141311] font-bold">{product.name}</span>
        </nav>
      </div>

      {/* ─── Main Product Showcase ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#EDE7DC] p-6 sm:p-10 shadow-sm">
          
          {/* Left Column: Interactive 10-Image Gallery Viewer */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* View Selector Ribbon (10 Views) */}
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none border-b border-[#EDE7DC]">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`px-3 py-1.5 text-[10.5px] font-bold tracking-wider uppercase whitespace-nowrap transition-all rounded-sm ${
                    activeImage === idx
                      ? 'bg-[#141311] text-[#E5C158] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#8C8279] hover:bg-[#EDE7DC] hover:text-[#2C2C2C]'
                  }`}
                >
                  View {idx + 1}
                </button>
              ))}
            </div>

            {/* Main Interactive Preview with Arrow Nav & Fullscreen Trigger */}
            <div className="relative aspect-[4/3] bg-[#FAF7F2] border border-[#EDE7DC] overflow-hidden group">
              <img
                src={images[activeImage]}
                alt={`${product.name} — ${captions[activeImage] || 'Display'}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/ziarat-white.jpg';
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 cursor-zoom-in"
                onClick={() => openLightbox(activeImage)}
              />

              {/* Prev / Next Image Overlays */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-[#C59B27] hover:text-[#141311] text-white flex items-center justify-center text-lg font-bold transition-all rounded-full shadow-lg opacity-80 group-hover:opacity-100"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-[#C59B27] hover:text-[#141311] text-white flex items-center justify-center text-lg font-bold transition-all rounded-full shadow-lg opacity-80 group-hover:opacity-100"
                aria-label="Next image"
              >
                ›
              </button>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#141311]/90 text-[#E5C158] text-[10.5px] uppercase font-bold tracking-widest px-3 py-1.5 backdrop-blur-sm shadow-md">
                  {product.category?.name || 'Natural Stone'}
                </span>
                <span
                  className={`text-[10.5px] uppercase font-bold tracking-widest px-3 py-1.5 backdrop-blur-sm shadow-md ${
                    isGranite ? 'bg-[#C59B27] text-[#141311]' : 'bg-[#2C2C2C]/90 text-white'
                  }`}
                >
                  {product.materialType || (isGranite ? 'Granite' : 'Marble')}
                </span>
              </div>

              {/* Zoom Trigger Button */}
              <button
                onClick={() => openLightbox(activeImage)}
                className="absolute top-4 right-4 bg-[#141311]/85 text-white text-[10.5px] font-semibold px-3 py-1.5 backdrop-blur-sm flex items-center gap-1.5 hover:bg-[#C59B27] hover:text-[#141311] transition-colors"
              >
                <span>🔍</span> Expand (Photo {activeImage + 1}/10)
              </button>

              {/* Caption Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
                <div className="flex items-center justify-between text-xs font-bold text-[#E5C158] mb-0.5">
                  <span>Photo {activeImage + 1} of {images.length}</span>
                  <span className="text-[10px] text-white/80">Click image for fullscreen view</span>
                </div>
                <p className="text-[11.5px] text-[#EDE7DC] line-clamp-1">
                  {captions[activeImage] || `${product.name} authentic view`}
                </p>
              </div>
            </div>

            {/* 10-Thumbnail Strip */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-[4/3] border-2 overflow-hidden transition-all rounded-sm ${
                    activeImage === idx
                      ? 'border-[#C59B27] ring-2 ring-[#C59B27]/40 opacity-100'
                      : 'border-[#EDE7DC] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumb ${idx + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/ziarat-white.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[8.5px] font-bold text-center py-0.2">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Complete Technical Specifications & Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Stock Status */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                  {product.materialType || (isGranite ? 'Natural Granite' : 'Natural Marble')} • {product.marbleType}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B37] bg-[#D1FAE5] px-2.5 py-1">
                  ● {product.availability || 'In Stock'}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141311] mb-3">
                {product.name}
              </h1>

              {/* Professional Description */}
              <p className="text-[#8C8279] text-sm sm:text-base leading-relaxed mb-5 font-light">
                {product.description ||
                  'High-density natural stone quarried with exceptional structural integrity, calibrated and diamond-cut to millimeter precision at our Fort Abbas facility.'}
              </p>

              {/* Application Suitability Highlight Box */}
              <div className="bg-[#FAF7F2] border border-[#EDE7DC] p-4 mb-5 space-y-2.5">
                {product.stairSuitability && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C59B27] flex items-center gap-1.5 mb-0.5">
                      <span>🪜</span> Stair Suitability
                    </div>
                    <p className="text-xs text-[#2C2C2C] font-semibold leading-relaxed">
                      {product.stairSuitability}
                    </p>
                  </div>
                )}

                {product.kitchenSuitability && (
                  <div className="pt-2 border-t border-[#EDE7DC]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C59B27] flex items-center gap-1.5 mb-0.5">
                      <span>🍳</span> Kitchen &amp; Island Suitability
                    </div>
                    <p className="text-xs text-[#2C2C2C] font-semibold leading-relaxed">
                      {product.kitchenSuitability}
                    </p>
                  </div>
                )}

                {product.flooringSuitability && (
                  <div className="pt-2 border-t border-[#EDE7DC]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C59B27] flex items-center gap-1.5 mb-0.5">
                      <span>✦</span> Flooring Suitability
                    </div>
                    <p className="text-xs text-[#2C2C2C] font-semibold leading-relaxed">
                      {product.flooringSuitability}
                    </p>
                  </div>
                )}
              </div>

              {/* Technical Specifications Table */}
              <div className="border-t border-b border-[#EDE7DC] py-3.5 my-3 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#8C8279] font-medium min-w-[120px]">Suitable Category:</span>
                  <span className="text-[#141311] font-bold text-right">{product.category?.name || 'Floor Marble & Granite'}</span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#8C8279] font-medium min-w-[120px]">Material Type:</span>
                  <span className="text-[#141311] font-bold text-right">{product.materialType || (isGranite ? 'Granite' : 'Marble')}</span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#8C8279] font-medium min-w-[120px]">Color Profile:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">{product.color || 'Natural'}</span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#8C8279] font-medium min-w-[120px]">Texture / Pattern:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">{product.texturePattern || 'Natural Stone Veining'}</span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#8C8279] font-medium min-w-[120px]">Indoor / Outdoor:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">{product.indoorOutdoorSuitability || 'Indoor & Covered Outdoor'}</span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#8C8279] font-medium min-w-[120px]">Available Finishes:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">
                    {Array.isArray(product.finish) && product.finish.length > 0
                      ? product.finish.join(', ')
                      : 'Polished, Honed, Flamed'}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#8C8279] font-medium min-w-[120px]">Standard Sizing:</span>
                  <span className="text-[#2C2C2C] font-semibold text-right">
                    {Array.isArray(product.size) && product.size.length > 0
                      ? product.size.join(', ')
                      : 'Custom Countertops, 12"x24", 24"x24", Jumbo Slabs'}
                  </span>
                </div>
              </div>

              {/* Recommended Applications Badges */}
              <div className="mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C8279] block mb-1.5">
                  Recommended Applications:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(product.recommendedUses || product.application || ['Kitchen Countertops', 'Stairs', 'Flooring']).map((use) => (
                    <span
                      key={use}
                      className="bg-[#FAF7F2] border border-[#EDE7DC] text-[#2C2C2C] text-xs font-semibold px-2.5 py-1"
                    >
                      ✓ {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/contact?type=quote&stone=${encodeURIComponent(product.name)}`}
                  className="flex-1 text-center py-3.5 px-6 bg-[#141311] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C59B27] hover:text-[#141311] transition-colors shadow-sm rounded-sm"
                >
                  Request Factory Quote
                </Link>
                <a
                  href={`https://wa.me/923454792176?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-3.5 px-6 bg-[#1E6B37] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#16532a] transition-colors flex items-center justify-center gap-2 shadow-sm rounded-sm"
                >
                  <span>💬</span> WhatsApp Malik Yasir (0345-4792176)
                </a>
              </div>
              <div className="text-[11px] text-[#8C8279] text-center">
                📍 Factory Yard: Main Haroonabad Road, Near THQ Hospital, Fort Abbas
              </div>
            </div>
          </div>
        </div>

        {/* ─── Dedicated 10-Image High-Resolution Photographic Showcase ─── */}
        <div className="mt-16 bg-white border border-[#EDE7DC] p-8 sm:p-10 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C59B27] block mb-2">
              10 Dedicated Unique Photographic Views
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141311] mb-3">
              Full Visual Showcase of {product.name}
            </h2>
            <p className="text-[#8C8279] text-sm leading-relaxed font-light">
              Genuinely different photographic perspectives: full calibrated slab, close-up texture, kitchen countertop installations, staircase bullnosing, daylight reflections, and completed projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group border border-[#EDE7DC] hover:border-[#C59B27] transition-all cursor-zoom-in bg-[#FAF7F2] flex flex-col rounded-sm overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={img}
                    alt={`${product.name} — Photo ${idx + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/ziarat-white.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#141311]/90 text-[#E5C158] text-[9px] font-bold px-2 py-0.5">
                    View {idx + 1} of 10
                  </div>
                </div>
                <div className="p-3 bg-white flex-1 flex flex-col justify-between border-t border-[#EDE7DC]">
                  <span className="text-xs font-bold text-[#141311] group-hover:text-[#C59B27] transition-colors block mb-1">
                    Photo {idx + 1}
                  </span>
                  <span className="text-[10.5px] text-[#8C8279] line-clamp-2">
                    {captions[idx] || `${product.name} dedicated angle`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Related Products ─── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141311] mb-6">
              Explore More Marble &amp; Granite Varieties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  to={`/products/${rel.slug || rel._id}`}
                  className="group bg-white border border-[#EDE7DC] hover:border-[#C59B27] p-4 transition-all block shadow-sm hover:shadow-xl rounded-sm"
                >
                  <div className="aspect-[4/3] bg-[#FAF7F2] overflow-hidden mb-3">
                    <img
                      src={rel.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80'}
                      alt={`${rel.name} preview`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/ziarat-white.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C59B27] mb-1">
                    {rel.materialType || 'Natural Stone'} • {rel.category?.name || 'Marble & Granite'}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#141311] group-hover:text-[#C59B27] transition-colors mb-1">
                    {rel.name}
                  </h3>
                  <p className="text-[#8C8279] text-xs">10 Dedicated Photos →</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Fullscreen Lightbox Modal with 10 Thumbnails ─── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Controls */}
          <div className="flex justify-between items-center text-white" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="text-xs font-bold text-[#E5C158] uppercase tracking-widest">
                {product.name} • Photo {lightboxIndex + 1} of {images.length}
              </span>
              <p className="text-xs text-[#d4cecb]">
                {captions[lightboxIndex]}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="text-white hover:text-[#C59B27] text-2xl p-2 font-bold"
              aria-label="Close Fullscreen View"
            >
              ✕
            </button>
          </div>

          {/* Main Image with Navigation Arrows */}
          <div
            className="flex-1 flex items-center justify-center py-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-2 sm:left-6 text-white hover:text-[#C59B27] text-3xl sm:text-5xl font-bold p-3 bg-black/50 rounded-full z-10"
              aria-label="Previous View"
            >
              ‹
            </button>

            <img
              src={images[lightboxIndex]}
              alt={`${product.name} fullscreen view ${lightboxIndex + 1}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/ziarat-white.jpg';
              }}
              className="max-h-[72vh] max-w-full object-contain shadow-2xl border border-white/10"
            />

            <button
              onClick={() => setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-2 sm:right-6 text-white hover:text-[#C59B27] text-3xl sm:text-5xl font-bold p-3 bg-black/50 rounded-full z-10"
              aria-label="Next View"
            >
              ›
            </button>
          </div>

          {/* 10 Thumbnails in Lightbox */}
          <div className="text-center text-white space-y-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center gap-1.5 overflow-x-auto max-w-4xl mx-auto py-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-12 h-9 flex-shrink-0 border overflow-hidden transition-all rounded-sm ${
                    lightboxIndex === idx ? 'border-[#C59B27] ring-2 ring-[#C59B27]' : 'border-white/30 opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
