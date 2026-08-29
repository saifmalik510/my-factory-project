import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const VALUES = [
  { icon: '💎', title: 'Uncompromising Quality', desc: 'Every block and slab undergoes density calibration and surface defect inspection before delivery.' },
  { icon: '📐', title: 'Precision Fabrication', desc: 'State-of-the-art multi-blade diamond cutting saws deliver accurate millimeter tolerances.' },
  { icon: '🤝', title: 'Transparent Pricing', desc: 'Factory-direct rates without middleman markups for homeowners, architects, and commercial developers.' },
  { icon: '🚚', title: 'Reliable Nationwide Logistics', desc: 'Carefully crated and palletized shipping from Fort Abbas across Punjab, Sindh, KPK, and Balochistan.' },
];

const OWNERS = [
  {
    name: 'Malik Yasir Bashir',
    role: 'Owner & Managing Director',
    phone: '0345-4792176',
    whatsapp: '0345-4792176',
    desc: 'Oversees marble sourcing, custom architectural orders, client relations, and commercial quotation scheduling.',
  },
  {
    name: 'Malik Nasir Iqbal',
    role: 'Owner & Operations Director',
    phone: '0342-7150318',
    whatsapp: '0342-7150318',
    desc: 'Manages factory floor cutting, slab calibration, gang saw maintenance, and nationwide transport logistics.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-20">
      <SEO
        title="About Us — Stone Heritage & Leadership in Fort Abbas"
        description="Learn about Abdullah Marble Factory in Fort Abbas, Bahawalnagar. Founded and operated by Malik Yasir Bashir (0345-4792176) & Malik Nasir Iqbal (0342-7150318)."
        keywords="about Abdullah marble, Malik Yasir Bashir, Malik Nasir Iqbal, Fort Abbas marble factory, stone craftsmen Pakistan"
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A84C] block mb-2">
          Our Heritage & Craftsmanship
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-6">
          Three Decades of Natural Stone Excellence
        </h1>
        <p className="text-[#8C8279] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Based in <strong className="text-[#2C2C2C]">Fort Abbas, Bahawalnagar District</strong>, Abdullah Marble Factory is a premier stone processor and supplier providing quarried Pakistani marble and imported Italian varieties across the nation.
        </p>
      </div>

      {/* Story & Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-[#EDE7DC] p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#8C8279] leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2C2C]">
              From Raw Mountain Blocks to Polished Architectural Masterpieces
            </h2>
            <p>
              Located along Main Haroonabad Road, near THQ Hospital in Fort Abbas, our advanced processing plant houses heavy-duty block cutters, multi-blade bridge saws, slab calibrators, and edge polishers.
            </p>
            <p>
              We source directly from prime quarries in Balochistan (Ziarat, Lasbela, Khuzdar) and Khyber Pakhtunkhwa, alongside premium imported Italian Calacatta, Carrara, and Brazilian granite varieties.
            </p>
            <p>
              Under the active leadership of our owners, <strong className="text-[#2C2C2C]">Malik Yasir Bashir</strong> and <strong className="text-[#2C2C2C]">Malik Nasir Iqbal</strong>, our team delivers high-precision flooring, stairs, kitchen islands, and bookmatched feature walls.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-6 py-3 bg-[#2C2C2C] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C9A84C] transition-colors"
              >
                View Stone Catalog
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-[#2C2C2C] text-[#2C2C2C] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2C2C] hover:text-white transition-colors"
              >
                Visit Factory in Fort Abbas
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#EDE7DC] overflow-hidden border border-[#EDE7DC]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Abdullah Marble Factory processing yard in Fort Abbas"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Factory Leadership / Owners Section ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A84C] block mb-2">
            Executive Leadership
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2C2C]">
            Meet the Factory Owners
          </h2>
          <p className="text-[#8C8279] text-sm mt-2">
            Directly overseeing quality assurance, cutting precision, and customer satisfaction in Fort Abbas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {OWNERS.map((owner, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EDE7DC] hover:border-[#C9A84C] p-8 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl block mb-4">👤</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] block mb-1">
                  {owner.role}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2C2C2C] mb-3">
                  {owner.name}
                </h3>
                <p className="text-[#8C8279] text-xs sm:text-sm leading-relaxed mb-6">
                  {owner.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EDE7DC] flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`tel:${owner.phone.replace(/[^0-9]/g, '')}`}
                  className="text-xs font-bold text-[#2C2C2C] hover:text-[#C9A84C] transition-colors"
                >
                  📞 {owner.phone}
                </a>

                {idx === 0 && (
                  <a
                    href={`https://wa.me/92${owner.whatsapp.replace(/^0+/, '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1E6B37] hover:bg-[#16532a] px-3 py-1.5 rounded transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.818l-1.517 5.61 5.768-1.514c1.666.91 3.57 1.436 5.602 1.436 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                    </svg>
                    WhatsApp Malik Yasir
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A84C] block mb-2">
            Why Partner With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2C2C]">
            Our Guiding Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, idx) => (
            <div key={idx} className="bg-white p-6 border border-[#EDE7DC] shadow-sm">
              <span className="text-3xl block mb-4">{val.icon}</span>
              <h3 className="font-serif text-xl font-bold text-[#2C2C2C] mb-2">{val.title}</h3>
              <p className="text-[#8C8279] text-xs leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
