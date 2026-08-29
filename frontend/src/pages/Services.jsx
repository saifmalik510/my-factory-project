import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const SERVICES = [
  {
    icon: '📐',
    title: '1. Precision Block & Slab Cutting',
    desc: 'Equipped with heavy-duty multi-wire diamond gang saws and bridge cutting machines capable of slicing raw stone blocks into exact millimeter-calibrated slabs and custom tile dimensions.',
  },
  {
    icon: '✨',
    title: '2. High-Gloss & Texture Surface Polishing',
    desc: 'From ultra-reflective mirror polish to satin honed finishes, flamed non-slip outdoor textures, sandblasted textures, and antique brushed finishes.',
  },
  {
    icon: '🏛️',
    title: '3. Architectural Edge Profiling & Bullnosing',
    desc: 'Specialized profile routing including full bullnose, half bullnose, bevel chamfer, ogee, DuPont, and 45-degree mitered apron edges for luxury countertops.',
  },
  {
    icon: '🔪',
    title: '4. Custom Countertop & Vanity Fabrication',
    desc: 'Bespoke fabrication of kitchen island slabs, bathroom vanity tops, undermount and topmount sink cutouts, cooktop cutouts, and seamless waterfall edges.',
  },
  {
    icon: '🪜',
    title: '5. Stair Treads & Window Sill Cutting',
    desc: 'Custom length marble and granite stair steps, matching risers, anti-slip sandblasted safety grooves, and weather-resistant external window sill coping.',
  },
  {
    icon: '📏',
    title: '6. On-Site Measurement & Digital Templating',
    desc: 'Our technical surveying team provides precise physical and digital measurement support to ensure zero error during stone cutting and dry-lay arrangement.',
  },
  {
    icon: '🚚',
    title: '7. Nationwide Crated & Palletized Delivery',
    desc: 'Heavy-duty wooden crating with protective foam separation to ensure safe, chip-free logistics directly to your construction site anywhere in Pakistan.',
  },
  {
    icon: '🛠️',
    title: '8. Professional Stone Installation & Fitting',
    desc: 'Skilled stone masons experienced in bookmatched dry-lays, epoxy grout filling, stone sealing, and seamless floor joint grinding.',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-20">
      <SEO
        title="Stone Fabrication Services — Cutting, Polishing & Installation"
        description="Comprehensive marble and granite processing services in Pakistan: diamond slab cutting, edge profiling, kitchen countertop fabrication, and nationwide delivery."
        keywords="marble cutting services, marble polishing, countertop fabrication, stair treads cutting, Fort Abbas stone processing"
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A84C] block mb-2">
          Industrial Stone Processing
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-6">
          Factory Services & Fabrication Capabilities
        </h1>
        <p className="text-[#8C8279] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          From quarry block breakdown to custom architectural profiling and turnkey site delivery, our factory handles every phase of stone engineering.
        </p>
      </div>

      {/* 8 Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EDE7DC] hover:border-[#C9A84C] p-8 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <span className="text-4xl block mb-5">{srv.icon}</span>
                <h3 className="font-serif text-xl font-bold text-[#2C2C2C] mb-3 leading-snug">
                  {srv.title}
                </h3>
                <p className="text-[#8C8279] text-xs leading-relaxed mb-6">{srv.desc}</p>
              </div>

              <Link
                to={`/contact?type=quote&service=${encodeURIComponent(srv.title)}`}
                className="text-xs font-semibold text-[#C9A84C] hover:text-[#2C2C2C] uppercase tracking-wider flex items-center gap-1 pt-4 border-t border-[#EDE7DC]"
              >
                Inquire For This Service <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quotation CTA Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A] text-white p-8 sm:p-12 text-center border border-[#C9A84C]/40">
          <h2 className="font-serif text-3xl font-bold mb-4">Have Custom Architectural Specs?</h2>
          <p className="text-[#d4cecb] text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Send us your CAD files, hand sketches, or room measurements for an instant material & fabrication estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact?type=quote"
              className="px-8 py-3 bg-[#C9A84C] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A8873A] transition-colors"
            >
              Submit Specs for Estimate
            </Link>
            <a
              href="https://wa.me/923008765432"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#1E6B37] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#16532a] transition-colors"
            >
              WhatsApp Us Drawings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
