import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2">
      {/* Desktop Tooltip */}
      {hovered && (
        <div className="hidden sm:block bg-[#1A1A1A] text-[#EDE7DC] px-3 py-1.5 rounded text-xs font-sans shadow-xl border border-[#C9A84C]/30 whitespace-nowrap animate-fadeIn">
          <span className="text-[#C9A84C] font-bold">Malik Yasir Bashir:</span> 0345-4792176
        </div>
      )}

      {/* Floating Button */}
      <a
        href="https://wa.me/923454792176"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Malik Yasir Bashir on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-2 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping hidden xs:inline-block" />
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.818l-1.517 5.61 5.768-1.514c1.666.91 3.57 1.436 5.602 1.436 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
        </svg>
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
