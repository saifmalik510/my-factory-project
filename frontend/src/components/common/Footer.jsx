import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'All Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact Us', to: '/contact' },
];

const CATEGORY_LINKS = [
  { label: 'Floor Marble & Granite', to: '/products?category=floor-marble-granite' },
  { label: 'Kitchen Marble & Granite', to: '/products?category=kitchen-marble-granite' },
  { label: 'Stairs Marble & Granite', to: '/products?category=stairs-marble-granite' },
  { label: 'Wall Marble & Granite', to: '/products?category=wall-marble-granite' },
  { label: 'Bathroom Marble & Granite', to: '/products?category=bathroom-marble-granite' },
  { label: 'Outdoor Marble & Granite', to: '/products?category=outdoor-marble-granite' },
  { label: 'Other Applications', to: '/products?category=other-applications' },
];

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-[#121211] text-[#EDE7DC] border-t border-[#C5A059]/30">
      {/* ── Gold Top Gradient Accent ── */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* ── Main Content Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
        
        {/* ── Brand Column with Minimal Logo ── */}
        <div className="lg:col-span-4">
          <Link to="/" id="footer-logo" className="flex items-center gap-3.5 mb-5 no-underline group">
            <div className="w-12 h-12 flex-shrink-0">
              <img
                src="/images/logo.svg"
                alt="Abdullah Marble Factory Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5F0] leading-none tracking-tight">
                ABDULLAH
              </div>
              <div className="font-sans text-[9.5px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] mt-1">
                MARBLE FACTORY • FORT ABBAS
              </div>
              <div className="font-sans text-[8.5px] text-[#A39D94] tracking-widest uppercase mt-0.5">
                ESTABLISHED SINCE 2012
              </div>
            </div>
          </Link>

          <p className="font-sans text-xs sm:text-sm text-[#8C8279] leading-relaxed max-w-sm mb-6 font-light">
            Premier marble, granite, and natural stone processing facility in Fort Abbas. Precision diamond gang-saw cutting, CNC profiling, mirror surface polishing, and nationwide crated delivery.
          </p>

          {/* WhatsApp Direct Action Button */}
          <a
            href="https://wa.me/923454792176"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1E6B37] hover:bg-[#16532a] text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors shadow-md rounded-md"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.818l-1.517 5.61 5.768-1.514c1.666.91 3.57 1.436 5.602 1.436 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
            </svg>
            <span>WhatsApp Malik Yasir</span>
          </a>
        </div>

        {/* ── Quick Links ── */}
        <div className="lg:col-span-2">
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[#8C8279] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 no-underline py-0.5 font-light"
                >
                  <span className="text-[#C5A059] text-[7px]">◆</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Product Categories ── */}
        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            Product Categories
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {CATEGORY_LINKS.map((cat) => (
              <li key={cat.label}>
                <Link
                  to={cat.to}
                  className="text-[#8C8279] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 no-underline py-0.5 font-light"
                >
                  <span className="text-[#C5A059] text-[7px]">◆</span>
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Factory Location & Contacts ── */}
        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            Factory Yard &amp; Owners
          </h3>
          <ul className="space-y-4 text-xs sm:text-sm">
            {/* Location */}
            <li className="flex items-start gap-2.5">
              <span className="text-base mt-0.5">📍</span>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#F8F5F0] tracking-wider">
                  Factory Location
                </div>
                <div className="text-[#D4AF37] font-semibold">Fort Abbas, Punjab, Pakistan</div>
                <div className="text-[#8C8279] text-xs mt-0.5 font-light">
                  Main Haroonabad Road, Near THQ Hospital
                </div>
              </div>
            </li>

            {/* Owner 1 */}
            <li className="flex items-start gap-2.5">
              <span className="text-base mt-0.5">👤</span>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#F8F5F0] tracking-wider">
                  Malik Yasir Bashir (Owner)
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <a href="tel:03454792176" className="text-[#EDE7DC] hover:text-[#D4AF37] font-medium">
                    📞 0345-4792176
                  </a>
                </div>
              </div>
            </li>

            {/* Owner 2 */}
            <li className="flex items-start gap-2.5">
              <span className="text-base mt-0.5">👤</span>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#F8F5F0] tracking-wider">
                  Malik Nasir Iqbal (Owner)
                </div>
                <a href="tel:03427150318" className="text-[#EDE7DC] hover:text-[#D4AF37] font-medium block mt-0.5">
                  📞 0342-7150318
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left text-xs text-[#8C8279]">
          <p>© {new Date().getFullYear()} Abdullah Marble Factory (Fort Abbas). Established Since 2012.</p>
          <p>
            Owners: <strong className="text-[#D4AF37]">Malik Yasir Bashir</strong> &amp; <strong className="text-[#D4AF37]">Malik Nasir Iqbal</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
