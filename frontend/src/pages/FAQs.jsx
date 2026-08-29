import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const FAQ_DATA = [
  {
    category: 'Materials & Selection',
    questions: [
      {
        q: 'What is the difference between marble and granite for kitchen countertops?',
        a: 'Granite is an igneous stone with superior resistance to scratching and acid etching, making it ideal for heavy-use kitchen worktops. Marble is a softer, porous metamorphic stone cherished for its classic luxurious veining, best suited for bathrooms, feature walls, and living areas with proper sealing.',
      },
      {
        q: 'Do you supply genuine Ziarat White and Balochistan marble varieties?',
        a: 'Yes, we source raw blocks directly from prime quarries in Ziarat, Lasbela, and Khuzdar. We offer various grades including Ziarat White Super Prime, Badal Grey, and Sunny Grey.',
      },
      {
        q: 'Can I inspect and select specific slabs before cutting?',
        a: 'Absolutely. Clients and architects are welcome to visit our Fort Abbas factory yard to hand-pick exact stone blocks or view dry-lay slab bookmatches prior to fabrication.',
      },
    ],
  },
  {
    category: 'Ordering & Custom Sizing',
    questions: [
      {
        q: 'What are the standard tile sizes available?',
        a: 'Our standard production includes 12"x12", 12"x24", 24"x24", 36"x36", as well as full-size slabs up to 10ft x 6ft. Custom sizing is readily cut to order.',
      },
      {
        q: 'What is the minimum order quantity (MOQ)?',
        a: 'We accommodate orders of all sizes—from a single custom kitchen island or vanity top to thousands of square feet for commercial plazas and housing projects.',
      },
      {
        q: 'How do I request an official price quotation?',
        a: 'You can submit your dimensions via our online Quotation Form, WhatsApp us your bill of quantities (BOQ), or call our sales team directly.',
      },
    ],
  },
  {
    category: 'Delivery & Logistics',
    questions: [
      {
        q: 'Do you deliver across Pakistan?',
        a: 'Yes. We provide crated and insured transport services to Lahore, Karachi, Islamabad, Multan, Bahawalpur, Faisalabad, and all surrounding regions.',
      },
      {
        q: 'How is stone packaged to prevent breakage during transit?',
        a: 'All cut tiles and polished slabs are vertically stacked in heavy-duty wooden crates with foam cushioning and steel strapping to eliminate transit vibration.',
      },
    ],
  },
  {
    category: 'Maintenance & Care',
    questions: [
      {
        q: 'How should natural marble floors be cleaned?',
        a: 'Use pH-neutral stone cleaners or warm water with mild soap. Avoid acidic liquids like vinegar, lemon, or harsh detergents that can etch the polish.',
      },
      {
        q: 'How often should marble be sealed?',
        a: 'We recommend applying a high-grade penetrating sealer upon installation and resealing every 12 to 18 months depending on traffic.',
      },
    ],
  },
];

export default function FAQs() {
  const [activeCat, setActiveCat] = useState('Materials & Selection');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const currentQuestions = FAQ_DATA.find((f) => f.category === activeCat)?.questions || [];

  return (
    <div className="min-h-screen bg-[#F8F5F0] pt-24 pb-20">
      <SEO
        title="Frequently Asked Questions — Marble, Ordering & Care"
        description="Find answers to common questions regarding marble selection, standard tile dimensions, custom cutting, nationwide delivery, and stone maintenance."
        keywords="marble FAQs, stone selection guide, marble cleaning tips, Fort Abbas marble orders"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A84C] block mb-2">
            Help & Guidance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#8C8279] text-base leading-relaxed">
            Everything you need to know about selecting, ordering, and maintaining premium natural stone.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FAQ_DATA.map((f) => (
            <button
              key={f.category}
              onClick={() => {
                setActiveCat(f.category);
                setOpenIndex(null);
              }}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold tracking-wider transition-all ${
                activeCat === f.category
                  ? 'bg-[#2C2C2C] text-white shadow-sm'
                  : 'bg-white text-[#2C2C2C] border border-[#EDE7DC] hover:border-[#C9A84C]'
              }`}
            >
              {f.category}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-4 mb-16">
          {currentQuestions.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#EDE7DC] transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#2C2C2C]">
                    {item.q}
                  </span>
                  <span className="text-[#C9A84C] text-xl font-bold">
                    {isOpen ? '−' : '＋'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-[#8C8279] leading-relaxed border-t border-[#F4F1EA] pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Box */}
        <div className="bg-[#FAF7F2] border border-[#EDE7DC] p-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-[#2C2C2C] mb-2">Still Have Questions?</h3>
          <p className="text-[#8C8279] text-xs sm:text-sm mb-6 max-w-md mx-auto">
            Our stone specialists are available to guide you on material feasibility, grade selection, and quotation estimates.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#2C2C2C] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#C9A84C] transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="https://wa.me/923008765432"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#1E6B37] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#16532a] transition-colors"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
