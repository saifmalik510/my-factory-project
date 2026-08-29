import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/common/SEO';

const CATEGORY_TABS = [
  { label: 'All Products', slug: 'all' },
  { label: 'Floor Marble & Granite', slug: 'floor-marble-granite' },
  { label: 'Kitchen Marble & Granite', slug: 'kitchen-marble-granite' },
  { label: 'Stairs Marble & Granite', slug: 'stairs-marble-granite' },
  { label: 'Wall Marble & Granite', slug: 'wall-marble-granite' },
  { label: 'Bathroom Marble & Granite', slug: 'bathroom-marble-granite' },
  { label: 'Outdoor Marble & Granite', slug: 'outdoor-marble-granite' },
  { label: 'Other Applications', slug: 'other-applications' },
];

const MATERIAL_OPTIONS = ['All', 'Marble', 'Granite'];
const FINISH_OPTIONS = ['All', 'Polished', 'Honed', 'Brushed', 'Leathered', 'Flamed', 'Sandblasted', 'Natural'];
const APPLICATION_OPTIONS = [
  'All',
  'Stairs',
  'Kitchen Countertops',
  'Kitchen Islands',
  'Flooring',
  'Wall Cladding',
  'Bathroom',
  'Outdoor',
  'Backlit Feature Walls',
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters from URL
  const categoryParam = searchParams.get('category') || 'all';
  const materialParam = searchParams.get('material') || 'All';
  const finishParam = searchParams.get('finish') || 'All';
  const appParam = searchParams.get('application') || 'All';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'featured';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchTerm, setSearchTerm] = useState(searchParam);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'All' || (key === 'page' && value === 1)) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    if (key !== 'page') newParams.delete('page');
    setSearchParams(newParams);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products', {
            params: {
              category: categoryParam,
              finish: finishParam !== 'All' ? finishParam : undefined,
              application: appParam !== 'All' ? appParam : undefined,
              search: searchParam || undefined,
              sort: sortParam,
              page: pageParam,
              limit: 50,
            },
          }),
          api.get('/categories'),
        ]);

        if (prodRes.data?.success) {
          let list = prodRes.data.products || [];
          if (materialParam !== 'All') {
            list = list.filter((p) =>
              (p.materialType || '').toLowerCase() === materialParam.toLowerCase() ||
              (p.name || '').toLowerCase().includes(materialParam.toLowerCase())
            );
          }
          setProducts(list);
          setTotalCount(list.length);
        }
        if (catRes.data?.success) {
          setCategories(catRes.data.categories || []);
        }
      } catch (err) {
        console.error('Failed to load products catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryParam, materialParam, finishParam, appParam, searchParam, sortParam, pageParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', searchTerm.trim());
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2C2C] pt-24 pb-20">
      <SEO
        title="Marble & Granite Products — 7 Distinct Categories | Abdullah Marble Factory"
        description="Explore 10 unique photos per product across Floor, Kitchen, Stairs, Wall, Bathroom, Outdoor, and Exotic Onyx stone collections in Fort Abbas."
        keywords="Floor marble, Kitchen granite, Stairs marble, Wall cladding, Bathroom marble, Outdoor granite, Fort Abbas marble factory"
      />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="border-b border-[#EDE7DC] pb-8">
          <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#C59B27]/40 px-3.5 py-1 mb-3">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C59B27]">
              7 Categorized Collections • 10 Unique Photos Per Product
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#141311] mb-4 tracking-tight">
            Marble &amp; Granite Product Collections
          </h1>
          <p className="text-[#8C8279] max-w-3xl text-base sm:text-lg leading-relaxed font-light">
            Explore our curated inventory of natural stone varieties organized by application: <strong>Floor</strong>, <strong>Kitchen Countertops</strong>, <strong>Stairs</strong>, <strong>Wall Cladding</strong>, <strong>Bathroom</strong>, and <strong>Outdoor</strong>. Every product includes 10 dedicated high-resolution views.
          </p>
        </div>

        {/* 7 Distinct Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none border-b border-[#EDE7DC]">
          {CATEGORY_TABS.map((cat) => {
            const active =
              categoryParam === cat.slug ||
              (cat.slug === 'all' && (categoryParam === 'all' || !categoryParam));
            return (
              <button
                key={cat.slug}
                onClick={() => updateParam('category', cat.slug)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold tracking-wider whitespace-nowrap transition-all rounded-sm ${
                  active
                    ? 'bg-[#141311] text-[#E5C158] shadow-md'
                    : 'bg-white text-[#2C2C2C] border border-[#EDE7DC] hover:border-[#C59B27] hover:bg-[#FAF7F2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Controls & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6 bg-white p-5 border border-[#EDE7DC] shadow-sm">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="col-span-1 sm:col-span-2 flex gap-2">
            <input
              type="text"
              placeholder="Search stone (e.g. Tropical, Black Granite, Tavera, Carrara)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3.5 py-2 text-sm border border-[#d4cecb] focus:outline-none focus:border-[#C59B27]"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#141311] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C59B27] hover:text-[#141311] transition-colors rounded-sm"
            >
              Search
            </button>
          </form>

          {/* Material Select */}
          <div>
            <select
              value={materialParam}
              onChange={(e) => updateParam('material', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#d4cecb] bg-white focus:outline-none focus:border-[#C59B27]"
            >
              {MATERIAL_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  Material: {m === 'All' ? 'All Materials' : m}
                </option>
              ))}
            </select>
          </div>

          {/* Application Select */}
          <div>
            <select
              value={appParam}
              onChange={(e) => updateParam('application', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#d4cecb] bg-white focus:outline-none focus:border-[#C59B27]"
            >
              <option value="All">All Applications</option>
              {APPLICATION_OPTIONS.filter((a) => a !== 'All').map((a) => (
                <option key={a} value={a}>
                  Usage: {a}
                </option>
              ))}
            </select>
          </div>

          {/* Finish Select */}
          <div>
            <select
              value={finishParam}
              onChange={(e) => updateParam('finish', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#d4cecb] bg-white focus:outline-none focus:border-[#C59B27]"
            >
              <option value="All">All Finishes</option>
              {FINISH_OPTIONS.filter((f) => f !== 'All').map((f) => (
                <option key={f} value={f}>
                  Finish: {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white border border-[#EDE7DC] p-4 animate-pulse">
                <div className="h-60 bg-[#EDE7DC] mb-4" />
                <div className="h-5 bg-[#EDE7DC] w-3/4 mb-2" />
                <div className="h-3 bg-[#EDE7DC] w-1/2 mb-4" />
                <div className="h-8 bg-[#EDE7DC] w-full" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EDE7DC] p-8">
            <span className="text-5xl block mb-4">🏛️</span>
            <h3 className="font-serif text-2xl font-bold text-[#141311] mb-2">No Matching Stone Varieties Found</h3>
            <p className="text-[#8C8279] text-sm max-w-md mx-auto mb-6">
              We couldn't find any stone varieties matching your current filter criteria. Try resetting your search filters.
            </p>
            <button
              onClick={() => setSearchParams(new URLSearchParams())}
              className="px-6 py-2.5 bg-[#C59B27] text-[#141311] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C158] transition-colors rounded-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => {
              const imgUrl = p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
              const cleanLink = `/products/${p.slug || p._id}`;
              const imageCount = (p.images && p.images.length) || 10;
              const isGranite = (p.materialType || '').toLowerCase() === 'granite' || p.name.toLowerCase().includes('granite');

              return (
                <div
                  key={p._id}
                  className="group bg-white border border-[#EDE7DC] hover:border-[#C59B27] transition-all duration-500 flex flex-col justify-between hover:shadow-2xl overflow-hidden rounded-sm"
                >
                  <div>
                    {/* Thumbnail with Badge Overlays */}
                    <Link to={cleanLink} className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2] block">
                      <img
                        src={imgUrl}
                        alt={`${p.name} natural stone slab and application`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      
                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3 bg-[#141311]/90 text-[#E5C158] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 backdrop-blur-sm shadow-sm">
                        {p.category?.name || 'Natural Stone'}
                      </div>

                      {/* Material Badge */}
                      <div
                        className={`absolute top-3 right-3 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 backdrop-blur-sm shadow-sm ${
                          isGranite ? 'bg-[#C59B27] text-[#141311]' : 'bg-[#2C2C2C]/90 text-white'
                        }`}
                      >
                        {p.materialType || (isGranite ? 'Granite' : 'Marble')}
                      </div>

                      {/* 10-Image Gallery Tag */}
                      <div className="absolute bottom-3 right-3 bg-[#141311]/85 text-white text-[10px] font-semibold px-2 py-0.5 backdrop-blur-sm flex items-center gap-1">
                        <span>📷</span> {imageCount} Photos
                      </div>
                    </Link>

                    {/* Body Content */}
                    <div className="p-5">
                      <div className="text-[10.5px] font-semibold text-[#C59B27] uppercase tracking-wider mb-1">
                        {p.marbleType || (isGranite ? 'Natural Granite' : 'Natural Marble')}
                      </div>

                      <Link to={cleanLink}>
                        <h3 className="font-serif text-2xl font-bold text-[#141311] group-hover:text-[#C59B27] transition-colors mb-2">
                          {p.name}
                        </h3>
                      </Link>

                      {/* Color & Pattern Line */}
                      {p.color && (
                        <p className="text-[#8C8279] text-xs leading-relaxed mb-2.5 line-clamp-1">
                          <strong className="text-[#2C2C2C]">Color:</strong> {p.color}
                        </p>
                      )}

                      <p className="text-[#8C8279] text-xs leading-relaxed line-clamp-2 mb-3.5 font-light">
                        {p.description || 'Natural quarried stone fabricated to exact architectural specifications in Fort Abbas.'}
                      </p>

                      {/* Suitability Badges */}
                      <div className="space-y-1 mb-3.5 bg-[#FAF7F2] p-2.5 border border-[#EDE7DC]">
                        {p.stairSuitability && (
                          <div className="flex items-center gap-1.5 text-[10px] text-[#2C2C2C] font-semibold">
                            <span className="text-[#C59B27]">🪜</span>
                            <span className="line-clamp-1">{p.stairSuitability}</span>
                          </div>
                        )}
                        {p.kitchenSuitability && (
                          <div className="flex items-center gap-1.5 text-[10px] text-[#2C2C2C] font-semibold">
                            <span className="text-[#C59B27]">🍳</span>
                            <span className="line-clamp-1">{p.kitchenSuitability}</span>
                          </div>
                        )}
                      </div>

                      {/* Recommended Uses Pills */}
                      <div className="flex flex-wrap gap-1 mb-1">
                        {(p.application || ['Flooring', 'Stairs', 'Kitchen Countertops']).slice(0, 3).map((app) => (
                          <span
                            key={app}
                            className="bg-white border border-[#EDE7DC] text-[#2C2C2C] text-[10px] px-2 py-0.5 font-medium"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Card Actions */}
                  <div className="p-5 pt-0 border-t border-[#F4F1EA] flex items-center justify-between mt-auto">
                    <Link
                      to={cleanLink}
                      className="text-xs font-bold text-[#141311] hover:text-[#C59B27] transition-colors flex items-center gap-1"
                    >
                      10 Dedicated Views <span>→</span>
                    </Link>
                    <a
                      href={`https://wa.me/923454792176?text=${encodeURIComponent(
                        `Hello Malik Yasir, I am inquiring about "${p.name}" at Abdullah Marble Factory (Fort Abbas).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#25D366] hover:underline"
                    >
                      💬 WhatsApp Quote
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Total Count Summary */}
        {!loading && products.length > 0 && (
          <div className="mt-16 text-center pt-8 border-t border-[#EDE7DC]">
            <span className="text-xs text-[#8C8279] tracking-wider uppercase font-semibold">
              Showing all {products.length} of {totalCount} Marble &amp; Granite Varieties • Direct Quarry Slabs • 10 Unique Photos Each
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
