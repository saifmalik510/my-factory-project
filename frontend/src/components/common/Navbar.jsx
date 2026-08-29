import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Categories', to: '/products?category=floor-marble-granite' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      id="main-navbar"
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-xl shadow-md border-b border-[#E5E0D8]'
          : 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE7E1]'
      }`}
    >
      {/* ── Top Bar: Location & Direct Contact ── */}
      <div className="bg-[#141312] text-[#EDE7DC] text-[11px] font-sans px-4 py-1.5 border-b border-[#C5A059]/25">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center text-center">
            <span className="text-[#D4AF37] font-semibold flex items-center gap-1 tracking-wider uppercase text-[10px]">
              📍 Fort Abbas, Punjab, Pakistan
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-[11px]">
              <span className="text-[#A39D94]">Owner:</span>{' '}
              <strong className="text-[#EDE7DC]">Malik Yasir:</strong>{' '}
              <a href="tel:03454792176" className="text-[#D4AF37] hover:underline font-medium">
                0345-4792176
              </a>
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-[11px] hidden xs:inline">
              <span className="text-[#A39D94]">Owner:</span>{' '}
              <strong className="text-[#EDE7DC]">Malik Nasir:</strong>{' '}
              <a href="tel:03427150318" className="text-[#EDE7DC] hover:underline font-medium">
                0342-7150318
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923454792176"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] font-semibold text-[11px] hover:underline"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.818l-1.517 5.61 5.768-1.514c1.666.91 3.57 1.436 5.602 1.436 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
              </svg>
              <span>WhatsApp Malik Yasir</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Nav Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 transition-all">
        
        {/* ── Brand Logo with Clean Vector Monogram ── */}
        <Link to="/" id="nav-logo" className="flex items-center gap-3 no-underline group py-1">
          <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
            <img
              src="/images/logo.svg"
              alt="Abdullah Marble Factory Logo"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F1E1C] group-hover:text-[#A68038] transition-colors">
              ABDULLAH
            </span>
            <span className="font-sans text-[9px] sm:text-[9.5px] font-bold tracking-[0.25em] uppercase text-[#A68038]">
              Marble Factory • Fort Abbas
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-sans text-xs uppercase tracking-wider px-3.5 py-2 transition-all no-underline font-medium rounded-sm ${
                  isActive
                    ? 'text-[#A68038] font-bold bg-[#EFECE6]/60 border-b-2 border-[#C5A059]'
                    : 'text-[#2C2C2C] hover:text-[#A68038] hover:bg-[#FAF9F6]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right Action Buttons ── */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/923454792176"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#1E6B37] hover:bg-[#16532a] text-white px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm rounded-md"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.818l-1.517 5.61 5.768-1.514c1.666.91 3.57 1.436 5.602 1.436 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
            </svg>
            0345-4792176
          </a>

          <Link
            to="/products"
            className="px-4 py-2.5 bg-[#1A1918] hover:bg-[#C5A059] hover:text-[#141312] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm rounded-md"
          >
            Explore Products
          </Link>
        </div>

        {/* ── Mobile Hamburger Toggle ── */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="lg:hidden p-2.5 text-[#2C2C2C] hover:text-[#C5A059] focus:outline-none flex flex-col justify-center gap-1.5 min-w-[44px] min-h-[44px]"
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Dropdown Drawer ── */}
      <div
        id="mobile-nav-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#FAF9F6] border-t border-[#E5E0D8] ${
          mobileOpen ? 'max-h-[520px] opacity-100 py-4 shadow-xl' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col space-y-1.5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`mobile-nav-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-sans text-sm py-2.5 px-3 border-b border-[#E5E0D8]/60 transition-colors flex items-center justify-between rounded-md ${
                  isActive ? 'text-[#A68038] font-bold bg-[#EFECE6]' : 'text-[#2C2C2C] font-medium'
                }`
              }
            >
              <span>{link.label}</span>
              <span className="text-xs text-[#A68038]">→</span>
            </NavLink>
          ))}

          <div className="pt-3 flex flex-col gap-2">
            <Link
              to="/products"
              className="w-full text-center bg-[#1A1918] text-white py-3 text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm"
            >
              Explore Products
            </Link>

            <a
              href="https://wa.me/923454792176"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#1E6B37] text-white py-3 text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm"
            >
              WhatsApp Malik Yasir: 0345-4792176
            </a>

            <a
              href="tel:03427150318"
              className="w-full flex items-center justify-center gap-2 bg-[#FAF9F6] border border-[#2C2C2C] text-[#2C2C2C] py-3 text-xs font-semibold uppercase tracking-wider rounded-md"
            >
              📞 Call Malik Nasir: 0342-7150318
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
