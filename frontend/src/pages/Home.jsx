import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const STATS = [
  { value: 'Since 2012', label: 'Established Stone Heritage' },
  { value: '23+', label: 'Marble & Granite Varieties' },
  { value: '100%', label: 'Diamond Gang Saw Slabs' },
  { value: '500+', label: 'Delivered Projects Across Pakistan' },
];

const CATEGORIES_SHOWCASE = [
  {
    title: 'Floor Marble & Granite',
    desc: 'High-density slabs and calibrated tiles for luxury residential and commercial floors.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    slug: 'floor-marble-granite',
    tag: 'Flooring',
  },
  {
    title: 'Kitchen Marble & Granite',
    desc: 'Scratch and heat-resistant granite and high-density marble for countertops and islands.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80',
    slug: 'kitchen-marble-granite',
    tag: 'Countertops',
  },
  {
    title: 'Stairs Marble & Granite',
    desc: 'Custom length marble steps, bullnosed treads, matching risers, and anti-slip safety grooves.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    slug: 'stairs-marble-granite',
    tag: 'Stairs & Steps',
  },
  {
    title: 'Wall Marble & Granite',
    desc: 'Bookmatched feature walls, drawing room centerpieces, and exterior building facades.',
    image: '/images/black-gold.jpg',
    slug: 'wall-marble-granite',
    tag: 'Wall Cladding',
  },
  {
    title: 'Bathroom Marble & Granite',
    desc: 'Luminous vanity surfaces, walk-in shower claddings, and spa wet-room installations.',
    image: '/images/calacatta-gold.jpg',
    slug: 'bathroom-marble-granite',
    tag: 'Bathrooms',
  },
  {
    title: 'Outdoor Marble & Granite',
    desc: 'Flamed non-slip patio pavers, exterior step coping, and all-weather outdoor kitchen tops.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    slug: 'outdoor-marble-granite',
    tag: 'Outdoor & Patios',
  },
  {
    title: 'Other Applications',
    desc: 'Translucent backlit Green Onyx, custom dining tables, and bespoke stone inlays.',
    image: '/images/green-onyx.jpg',
    slug: 'other-applications',
    tag: 'Exotic Stone',
  },
];

const FEATURED_STONES = [
  {
    name: 'Tropical Granite',
    material: 'Granite',
    origin: 'Natural Magmatic Stone',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    tag: 'Top Kitchen Choice',
    desc: 'Exotic golden waves with burgundy crystals. 100% heat & scratch proof for islands.',
    slug: 'tropical-granite',
    applications: ['Kitchen Countertops', 'Stairs', 'Kitchen Islands'],
  },
  {
    name: 'Black Granite',
    material: 'Granite',
    origin: 'Absolute Pure Black Granite',
    image: '/images/black-galaxy.jpg',
    tag: 'High Density',
    desc: 'Deep midnight black mirror finish. The supreme standard for modern kitchens & stair treads.',
    slug: 'black-granite',
    applications: ['Kitchen Countertops', 'Stairs', 'Flooring'],
  },
  {
    name: 'Tavera Marble',
    material: 'Marble',
    origin: 'Balochistan, Pakistan',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    tag: 'Best Seller',
    desc: 'Warm cream & beige crystalline stone with high abrasion strength for luxury floors.',
    slug: 'tavera-marble',
    applications: ['Flooring', 'Stairs', 'Indoor'],
  },
  {
    name: 'Verona Marble',
    material: 'Marble',
    origin: 'Balochistan, Pakistan',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    tag: 'Rosy Elegance',
    desc: 'Sophisticated warm fawn and blush amber veins for grand foyers and curved staircases.',
    slug: 'verona-marble',
    applications: ['Flooring', 'Stairs', 'Wall Cladding'],
  },
  {
    name: 'Snow White Marble',
    material: 'Marble',
    origin: 'Pakistani Mountain Seams',
    image: '/images/ziarat-white.jpg',
    tag: 'Pure Radiance',
    desc: 'Pristine icy white calcite matrix reflecting natural light to illuminate expansive halls.',
    slug: 'snow-white-marble',
    applications: ['Flooring', 'Stairs', 'Bathroom'],
  },
  {
    name: 'Indian Galaxy Granite',
    material: 'Granite',
    origin: 'Dense Natural Igneous Stone',
    image: '/images/black-galaxy.jpg',
    tag: 'Star Gold Flecks',
    desc: 'Glittering golden-bronze bronzite crystals embedded in a dense midnight black matrix.',
    slug: 'indian-galaxy-granite',
    applications: ['Kitchen Countertops', 'Stairs', 'Kitchen Islands'],
  },
  {
    name: 'Carrara White Marble',
    material: 'Marble',
    origin: 'Carrara, Tuscany (Italy)',
    image: '/images/calacatta-gold.jpg',
    tag: 'Italian Masterpiece',
    desc: 'Iconic feather-soft grey veining on pure white stone for waterfall islands & master baths.',
    slug: 'carrara-white-marble',
    applications: ['Kitchen Countertops', 'Flooring', 'Bathroom'],
  },
  {
    name: 'Ziarat White Super Prime',
    material: 'Marble',
    origin: 'Balochistan, Pakistan',
    image: '/images/ziarat-white.jpg',
    tag: 'Heritage Classic',
    desc: 'Pakistan’s celebrated pure crystalline marble with delicate gold & grey quartz striations.',
    slug: 'ziarat-white-classic',
    applications: ['Flooring', 'Stairs', 'Wall Cladding'],
  },
];

const WHY_CHOOSE_US = [
  {
    icon: '🏛️',
    title: 'Direct Quarry Sourcing',
    desc: 'Direct block extraction from prime Balochistan, KPK, and Italian quarries without middleman markups.',
  },
  {
    icon: '📐',
    title: 'Precision Gang Saw Slicing',
    desc: 'Heavy-duty multi-wire saws and computerized bridge cutting deliver exact millimeter slab tolerances.',
  },
  {
    icon: '✨',
    title: 'Diamond Mirror Polish',
    desc: 'Multi-head surface polishers ensure long-lasting reflectivity, natural stain resistance, and enduring beauty.',
  },
  {
    icon: '🚚',
    title: 'Crated Transport Nationwide',
    desc: 'Foam-cushioned wooden crating dispatched directly from our Fort Abbas yard to your construction site.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C]">
      <SEO
        title="Abdullah Marble Factory — Premium Marble & Granite for Exceptional Spaces"
        description="Direct quarriers and master fabricators of Tavera, Verona, Tropical Granite, Black Granite, Ziarat White, and Carrara White in Fort Abbas, Punjab. Contact Malik Yasir: 0345-4792176."
        keywords="Abdullah Marble Factory, Fort Abbas marble, Tropical Granite, Black Granite, Tavera Marble, Verona Marble, Ziarat White, Malik Yasir Bashir"
      />

      {/* ─── 1. HERO SECTION: High-End Architectural Stone Atmosphere ─── */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#141312] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Real Stone Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 opacity-28 transition-transform duration-1000"
          style={{ backgroundImage: "url('/images/black-gold.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/80 to-[#141312]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-28 pb-16">
          
          {/* Logo Emblem Header Crest */}
          <div className="inline-flex items-center gap-2.5 bg-[#1C1B19]/85 border border-[#C5A059]/50 px-4 py-1.5 backdrop-blur-md mb-6 shadow-xl rounded-full">
            <div className="w-5 h-5 flex-shrink-0">
              <img src="/images/logo.svg" alt="Emblem" className="w-full h-full object-contain" />
            </div>
            <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              Abdullah Marble Factory • Fort Abbas, Punjab • Est. 2012
            </span>
          </div>

          {/* Requested Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.12]">
            Premium Marble &amp; Granite for <span className="italic font-normal text-[#D4AF37]">Exceptional Spaces</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#d4cecb] max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Direct quarry block selection, precision diamond gang-saw cutting, and custom architectural fabrication at our Fort Abbas processing yard.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap gap-3.5 justify-center items-center">
            <Link
              to="/products"
              className="px-7 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#141312] text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:-translate-y-0.5 rounded-md"
            >
              Explore Our Products
            </Link>

            <Link
              to="/contact"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs uppercase tracking-widest font-semibold backdrop-blur-sm transition-all rounded-md"
            >
              Contact Us
            </Link>

            <a
              href="https://wa.me/923454792176"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#1E6B37] hover:bg-[#16532a] text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md rounded-md"
            >
              <span>💬</span> WhatsApp Malik Yasir
            </a>
          </div>

          {/* Owner & Location Ribbon */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-xs text-[#A39D94]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4AF37] font-semibold">Owner:</span>
              <a href="tel:03454792176" className="text-white hover:underline font-medium">
                Malik Yasir Bashir (0345-4792176)
              </a>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4AF37] font-semibold">Owner:</span>
              <a href="tel:03427150318" className="text-white hover:underline font-medium">
                Malik Nasir Iqbal (0342-7150318)
              </a>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4AF37] font-semibold">Yard:</span> Main Haroonabad Road, Fort Abbas
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS & QUALITY BAR ─── */}
      <section className="bg-[#181716] text-white py-8 border-t border-b border-[#C5A059]/30 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, idx) => (
              <div key={idx} className="p-2 border-r last:border-r-0 border-white/5">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] text-[#A39D94] tracking-wider uppercase font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. CATEGORIES SHOWCASE: Visual Image-Based Cards ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C5A059] block mb-2">
            Organized Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#141312] mb-4">
            Browse Slabs by Application
          </h2>
          <p className="text-[#8C8279] text-base leading-relaxed font-light">
            Engineered natural stones tailored for heavy-traffic floorings, scratch-proof kitchen countertops, illuminated onyx walls, and architectural staircases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_SHOWCASE.map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?category=${cat.slug}`}
              className="group bg-white border border-[#E5E0D8] hover:border-[#C5A059] transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl rounded-lg"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF9F6]">
                  <img
                    src={cat.image}
                    alt={`${cat.title} preview`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#141312]/90 text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 backdrop-blur-sm rounded-sm">
                    {cat.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#141312] group-hover:text-[#A68038] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-[#8C8279] text-xs sm:text-sm leading-relaxed mb-4 font-light">{cat.desc}</p>
                </div>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#F4F1EA]">
                <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider group-hover:text-[#141312] transition-colors">
                  Explore Collection →
                </span>
                <span className="text-xs text-[#8C8279] group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 4. FEATURED PRODUCTS: High-Resolution Real Marble & Granite ─── */}
      <section className="py-20 bg-[#F4F2EC] border-t border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C5A059] block mb-2">
                Factory Direct Stock
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#141312]">
                Featured Marble &amp; Granite Varieties
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:text-[#141312] transition-colors self-start md:self-end"
            >
              <span>View All 23 Varieties</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_STONES.map((stone, idx) => (
              <div
                key={idx}
                className="group bg-white border border-[#E5E0D8] hover:border-[#C5A059] transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl rounded-lg"
              >
                <div>
                  <Link to={`/products/${stone.slug}`} className="relative aspect-[4/3] overflow-hidden bg-[#FAF9F6] block">
                    <img
                      src={stone.image}
                      alt={`${stone.name} slab display`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#141312]/90 text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 backdrop-blur-sm rounded-sm">
                      {stone.material}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#C5A059] text-[#141312] text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm">
                      {stone.tag}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] font-semibold px-2 py-0.5 rounded-sm">
                      📷 10 Photos
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8279] mb-1">
                      📍 {stone.origin}
                    </div>
                    <Link to={`/products/${stone.slug}`}>
                      <h3 className="font-serif text-xl font-bold text-[#141312] group-hover:text-[#A68038] transition-colors mb-1.5">
                        {stone.name}
                      </h3>
                    </Link>
                    <p className="text-[#8C8279] text-xs leading-relaxed line-clamp-2 mb-3 font-light">{stone.desc}</p>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {stone.applications.map((app) => (
                        <span key={app} className="bg-[#FAF9F6] border border-[#E5E0D8] text-[#2C2C2C] text-[10px] px-2 py-0.5 rounded-sm">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#F4F1EA] flex items-center justify-between mt-auto">
                  <Link
                    to={`/products/${stone.slug}`}
                    className="text-xs font-semibold text-[#141312] hover:text-[#C5A059] transition-colors"
                  >
                    View Details →
                  </Link>
                  <a
                    href={`https://wa.me/923454792176?text=${encodeURIComponent(
                      `Hello Malik Yasir, I am inquiring about "${stone.name}" at Abdullah Marble Factory (Fort Abbas).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#25D366] hover:underline"
                  >
                    💬 WhatsApp Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. WHY CHOOSE ABDULLAH MARBLE FACTORY ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] block mb-2">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141312] mb-4">
            Industrial Precision &amp; Established Heritage
          </h2>
          <p className="text-[#8C8279] text-sm sm:text-base leading-relaxed font-light">
            Founded on direct quarry connections, high-precision computerized cutting, and trusted service for homeowners, architects, and builders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 border border-[#E5E0D8] hover:border-[#C5A059] transition-all shadow-sm flex flex-col justify-between rounded-lg"
            >
              <div>
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-serif text-xl font-bold text-[#141312] mb-2">{item.title}</h3>
                <p className="text-[#8C8279] text-xs sm:text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. ABOUT US & FACTORY LEADERSHIP ─── */}
      <section className="py-20 bg-[#F4F2EC] border-t border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] block">
                About Our Factory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141312]">
                Serving Pakistan Since 2012 from Fort Abbas
              </h2>
              <p className="text-[#8C8279] text-sm sm:text-base leading-relaxed font-light">
                Abdullah Marble Factory is an established processing facility located on <strong>Main Haroonabad Road, near THQ Hospital, Fort Abbas</strong>. We house advanced multi-blade gang saws, CNC profile routers, and mirror surface polishers.
              </p>
              <p className="text-[#8C8279] text-sm sm:text-base leading-relaxed font-light">
                Directly overseen by owners <strong className="text-[#141312]">Malik Yasir Bashir</strong> and <strong className="text-[#141312]">Malik Nasir Iqbal</strong>, we ensure that every square foot of marble and granite delivered to your job site meets the highest standards of durability and beauty.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="px-6 py-3 bg-[#1A1918] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] hover:text-[#141312] transition-colors rounded-md"
                >
                  Learn More About Us
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-[#1A1918] text-[#1A1918] text-xs uppercase tracking-widest font-semibold hover:bg-[#1A1918] hover:text-white transition-colors rounded-md"
                >
                  Visit Our Factory Yard
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] bg-[#E5E0D8] overflow-hidden border border-[#E5E0D8] shadow-xl rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Abdullah Marble Factory processing yard Fort Abbas"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. CONTACT & INQUIRY BANNER ─── */}
      <section className="py-20 bg-[#141312] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4AF37] block mb-2">
            Get in Touch With Factory Owners
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4 text-white">
            Need Stone Sizing, Custom Profiling, or Project Pricing?
          </h2>
          <p className="text-[#d4cecb] text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Contact Malik Yasir Bashir or Malik Nasir Iqbal directly. We provide instant rates per sq.ft, block availability, and nationwide delivery schedules.
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center">
            <Link
              to="/contact?type=quote"
              className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#141312] text-xs uppercase tracking-widest font-bold transition-all shadow-xl rounded-md"
            >
              Send Inquiry / Get Quote
            </Link>
            <a
              href="https://wa.me/923454792176"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#1E6B37] hover:bg-[#16532a] text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-lg rounded-md"
            >
              <span>💬</span> WhatsApp Malik Yasir (0345-4792176)
            </a>
            <a
              href="tel:03427150318"
              className="px-8 py-3.5 bg-[#1C1B19] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-all border border-white/20 rounded-md"
            >
              📞 Call Malik Nasir (0342-7150318)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
