import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/common/SEO';

const GALLERY_CATEGORIES = [
  { label: 'All Projects', slug: 'All', icon: '🏛️' },
  { label: 'Floor', slug: 'Floor', icon: '✦' },
  { label: 'Kitchen', slug: 'Kitchen', icon: '🍳' },
  { label: 'Stairs', slug: 'Stairs', icon: '🪜' },
  { label: 'Wall', slug: 'Wall', icon: '🧱' },
  { label: 'Bathroom', slug: 'Bathroom', icon: '🛁' },
  { label: 'Outdoor', slug: 'Outdoor', icon: '🌿' },
  { label: 'Marble', slug: 'Marble', icon: '🏛️' },
  { label: 'Granite', slug: 'Granite', icon: '💎' },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    async function fetchGalleryData() {
      setLoading(true);
      try {
        const res = await api.get('/gallery', {
          params: {
            category: selectedCat !== 'All' ? selectedCat : undefined,
            limit: 250,
          },
        });
        if (res.data?.success) {
          setItems(res.data.gallery || []);
          setTotalCount(res.data.totalCount || (res.data.gallery || []).length);
        }
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleryData();
  }, [selectedCat]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, items]);

  const handleNext = () => {
    if (lightboxIndex !== null && items.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % items.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null && items.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    }
  };

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C] pt-24 pb-20">
      <SEO
        title="Architectural Stone Installation Gallery — 230+ Photos | Abdullah Marble Factory"
        description="Explore 230+ high-resolution photographs of marble and granite installations across Floor, Kitchen, Stairs, Wall Cladding, Bathroom, and Outdoor projects."
        keywords="marble gallery, marble flooring photos, granite kitchen photos, stairs marble pictures, Fort Abbas marble installations"
      />

      {/* ─── Hero Header ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-[#C5A059]/40 px-3.5 py-1 mb-3 rounded-full shadow-sm">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#A68038]">
            Architectural Portfolio &amp; Real Stone Views
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#141312] mb-4 tracking-tight">
          Natural Stone Gallery &amp; Installations
        </h1>
        <p className="text-[#8C8279] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-light">
          Browse actual photographs of our natural marble and granite slabs, kitchen waterfall islands, precision bullnosed staircases, bookmatched feature walls, and luxury floorings.
        </p>

        {/* ─── Category Filter Navigation Bar ─── */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
          {GALLERY_CATEGORIES.map((cat) => {
            const active = selectedCat === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCat(cat.slug)}
                className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all rounded-md flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#141312] text-[#D4AF37] shadow-md'
                    : 'bg-white text-[#2C2C2C] border border-[#E5E0D8] hover:border-[#C5A059] hover:bg-[#FAF9F6]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Counter Tag */}
        <div className="mt-4 text-xs text-[#8C8279] font-medium">
          Showing <strong className="text-[#141312]">{items.length}</strong> photographs in <strong className="text-[#A68038]">{selectedCat}</strong>
        </div>
      </div>

      {/* ─── Gallery Grid ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <div key={n} className="bg-white border border-[#E5E0D8] p-3 rounded-lg animate-pulse">
                <div className="aspect-[4/3] bg-[#EAE7E1] mb-3 rounded-md" />
                <div className="h-4 bg-[#EAE7E1] w-3/4 mb-2" />
                <div className="h-3 bg-[#EAE7E1] w-1/2" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E5E0D8] p-8 rounded-lg">
            <span className="text-5xl block mb-4">🏛️</span>
            <h3 className="font-serif text-2xl font-bold text-[#141312] mb-2">No Images Available in this Category Yet</h3>
            <p className="text-[#8C8279] text-sm max-w-md mx-auto mb-6">
              We couldn't find any stone installation photos under &ldquo;{selectedCat}&rdquo;. Try selecting &ldquo;All Projects&rdquo;.
            </p>
            <button
              onClick={() => setSelectedCat('All')}
              className="px-6 py-2.5 bg-[#C5A059] text-[#141312] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors rounded-md"
            >
              View All Projects ({totalCount})
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, idx) => {
              const isGranite = (item.materialType || '').toLowerCase() === 'granite';
              const cleanLink = item.productSlug ? `/products/${item.productSlug}` : '/products';

              return (
                <div
                  key={item._id || idx}
                  className="group bg-white border border-[#E5E0D8] hover:border-[#C5A059] transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl rounded-lg"
                >
                  <div>
                    {/* Clickable Image to Open Lightbox */}
                    <div
                      onClick={() => setLightboxIndex(idx)}
                      className="relative aspect-[4/3] bg-[#FAF9F6] overflow-hidden cursor-zoom-in block"
                    >
                      <img
                        src={item.imagePath}
                        alt={item.title || 'Marble and Granite Installation'}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/ziarat-white.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 bg-[#141312]/90 text-[#D4AF37] text-[9.5px] uppercase font-bold tracking-widest px-2.5 py-1 backdrop-blur-sm rounded-sm">
                        {item.category?.name || 'Natural Stone'}
                      </div>

                      <div
                        className={`absolute top-2.5 right-2.5 text-[9.5px] uppercase font-bold tracking-widest px-2 py-0.5 backdrop-blur-sm rounded-sm ${
                          isGranite ? 'bg-[#C5A059] text-[#141312]' : 'bg-[#2C2C2C]/90 text-white'
                        }`}
                      >
                        {item.materialType || 'Stone'}
                      </div>

                      {/* Click to Zoom Overlay Indicator */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-[#141312] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          🔍 Click to Enlarge
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {item.productName && (
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#A68038] mb-1">
                          {item.productName}
                        </div>
                      )}

                      <h3
                        onClick={() => setLightboxIndex(idx)}
                        className="font-serif text-lg font-bold text-[#141312] group-hover:text-[#A68038] transition-colors mb-1.5 cursor-pointer line-clamp-1"
                      >
                        {item.title}
                      </h3>

                      <p className="text-[#8C8279] text-xs leading-relaxed line-clamp-2 mb-3 font-light">
                        {item.description || `${item.productName || 'Stone'} installation in luxury residence.`}
                      </p>

                      {/* Applications Chips */}
                      {Array.isArray(item.application) && item.application.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.application.slice(0, 2).map((app) => (
                            <span key={app} className="bg-[#FAF9F6] border border-[#E5E0D8] text-[#2C2C2C] text-[9.5px] px-1.5 py-0.5 rounded-sm">
                              {app}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 pt-0 border-t border-[#F4F1EA] flex items-center justify-between mt-auto">
                    <Link
                      to={cleanLink}
                      className="text-xs font-semibold text-[#141312] hover:text-[#C5A059] transition-colors flex items-center gap-1"
                    >
                      View Product <span>→</span>
                    </Link>

                    <a
                      href={`https://wa.me/923454792176?text=${encodeURIComponent(
                        `Hello Malik Yasir, I saw "${item.title}" in your gallery and would like to inquire about pricing and availability.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#25D366] hover:underline"
                    >
                      💬 Quote
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Fullscreen Lightbox Modal ─── */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header Controls */}
          <div className="flex justify-between items-center text-white" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                  {currentItem.productName || 'Abdullah Marble Factory'} • Photo {lightboxIndex + 1} of {items.length}
                </span>
                <span className="bg-white/20 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">
                  {currentItem.category?.name || currentItem.materialType}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-[#EDE7DC]">
                {currentItem.title}
              </h2>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white hover:text-[#D4AF37] text-2xl p-2 font-bold focus:outline-none"
              aria-label="Close Fullscreen Gallery View"
            >
              ✕
            </button>
          </div>

          {/* Main Expanded Image with Nav Arrows */}
          <div
            className="flex-1 flex items-center justify-center py-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 text-white hover:text-[#D4AF37] text-3xl sm:text-5xl font-bold p-3 bg-black/50 hover:bg-black/80 rounded-full z-10 transition-all"
              aria-label="Previous Image"
            >
              ‹
            </button>

            <img
              src={currentItem.imagePath}
              alt={currentItem.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/ziarat-white.jpg';
              }}
              className="max-h-[72vh] max-w-full object-contain shadow-2xl border border-white/10 rounded-sm"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 text-white hover:text-[#D4AF37] text-3xl sm:text-5xl font-bold p-3 bg-black/50 hover:bg-black/80 rounded-full z-10 transition-all"
              aria-label="Next Image"
            >
              ›
            </button>
          </div>

          {/* Footer Bar & Quick Action */}
          <div
            className="text-center text-white space-y-3 max-w-3xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-[#EDE7DC] font-light">
              {currentItem.description || currentItem.title}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3">
              {currentItem.productSlug && (
                <Link
                  to={`/products/${currentItem.productSlug}`}
                  className="px-4 py-2 bg-white text-[#141312] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors rounded-md"
                >
                  View Full Product Details (10 Photos) →
                </Link>
              )}

              <a
                href={`https://wa.me/923454792176?text=${encodeURIComponent(
                  `Hello Malik Yasir, I am inquiring about "${currentItem.title}" shown in your gallery.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1E6B37] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#16532a] transition-colors flex items-center gap-1.5 rounded-md"
              >
                <span>💬</span> WhatsApp Malik Yasir (0345-4792176)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
