import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/common/SEO';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'quote' ? 'quote' : 'contact';
  const initialStone = searchParams.get('stone') || '';

  const [tab, setTab] = useState(initialType);
  const [settings, setSettings] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: initialType === 'quote' ? 'Quotation Request' : 'General Contact',
    productInterest: initialStone,
    preferredFinish: 'Polished',
    dimensions: '',
    quantity: '',
    message: '',
    website: '', // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await api.get('/settings');
        if (res.data?.success && res.data.settings) {
          setSettings(res.data.settings);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Spam honeypot trap
    if (formData.website) {
      setSubmitted(true);
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide both your name and phone/WhatsApp number.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customerName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        inquiryType: tab === 'quote' ? 'Quotation Request' : 'General Contact',
        productInterest: formData.productInterest.trim() || undefined,
        preferredFinish: tab === 'quote' ? formData.preferredFinish : undefined,
        dimensions: tab === 'quote' ? formData.dimensions.trim() : undefined,
        quantity: tab === 'quote' ? formData.quantity.trim() : undefined,
        message: formData.message.trim() || 'Inquiry from official website contact form.',
      };

      const res = await api.post('/inquiries', payload);
      if (res.data?.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          inquiryType: tab === 'quote' ? 'Quotation Request' : 'General Contact',
          productInterest: '',
          preferredFinish: 'Polished',
          dimensions: '',
          quantity: '',
          message: '',
          website: '',
        });
      } else {
        setErrorMessage(res.data?.message || 'Failed to submit inquiry. Please try WhatsApp.');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setErrorMessage(
        err.response?.data?.message || 'Network error submitting inquiry. Please connect with us directly via WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const owner1Name = settings?.contact?.owner1Name || 'Malik Yasir Bashir';
  const owner1Phone = settings?.contact?.owner1Phone || '0345-4792176';
  const owner2Name = settings?.contact?.owner2Name || 'Malik Nasir Iqbal';
  const owner2Phone = settings?.contact?.owner2Phone || '0342-7150318';
  const emailAddr = settings?.contact?.email || 'info@abdullahmarble.com';
  const locationAddr =
    settings?.location?.address || 'Main Haroonabad Road, Near THQ Hospital, Fort Abbas, Bahawalnagar, Punjab, Pakistan';
  const mapEmbedUrl =
    settings?.location?.mapEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55835.45268482476!2d72.825227!3d29.192518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c8340d860d5b5%3A0x6b1cfb8849ad7e59!2sFort%20Abbas%2C%20Bahawalnagar%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s';

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Abdullah Marble Factory, Main Haroonabad Road, Near THQ Hospital, Fort Abbas'
  )}`;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2C2C] pt-24 pb-20">
      <SEO
        title="Contact Us & Factory Location — Fort Abbas | Abdullah Marble Factory"
        description="Connect with factory owners Malik Yasir Bashir (0345-4792176) & Malik Nasir Iqbal (0342-7150318). Main Haroonabad Road, Near THQ Hospital, Fort Abbas, Punjab."
        keywords="Abdullah marble Fort Abbas, Malik Yasir Bashir, Malik Nasir Iqbal, marble factory contact number, Fort Abbas marble factory"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#C9A84C]/40 px-3.5 py-1 mb-3">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C9A84C]">
              Factory Direct Contact & Inquiries
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-4">
            Connect With Our Factory in Fort Abbas
          </h1>
          <p className="text-[#8C8279] text-base leading-relaxed font-light">
            Speak directly with factory owners <strong className="text-[#2C2C2C] font-semibold">{owner1Name}</strong> and <strong className="text-[#2C2C2C] font-semibold">{owner2Name}</strong> for stone pricing, block availability, custom edge profiles, and nationwide delivery scheduling.
          </p>
        </div>

        {/* ── Quick Action Buttons Bar ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href={`tel:${owner1Phone.replace(/[^0-9]/g, '')}`}
            className="px-5 py-2.5 bg-[#2C2C2C] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <span>📞</span> Call Malik Yasir ({owner1Phone})
          </a>

          <a
            href={`https://wa.me/92${owner1Phone.replace(/^0+/, '').replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1E6B37] hover:bg-[#16532a] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <span>💬</span> WhatsApp Direct
          </a>

          <a
            href={`tel:${owner2Phone.replace(/[^0-9]/g, '')}`}
            className="px-5 py-2.5 bg-white border border-[#EDE7DC] hover:border-[#C9A84C] text-[#2C2C2C] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <span>📞</span> Call Malik Nasir ({owner2Phone})
          </a>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#FAF7F2] border border-[#C9A84C]/50 hover:bg-[#C9A84C] hover:text-[#1A1A1A] text-[#C9A84C] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <span>🗺️</span> Get Directions
          </a>
        </div>

        {/* ── Contact Info Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Owner 1: Malik Yasir Bashir */}
          <div className="bg-white p-6 border border-[#EDE7DC] shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#25D366]" />
            <div>
              <span className="text-3xl block mb-3">👤</span>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
                Factory Owner / MD
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C2C2C] mb-2">{owner1Name}</h3>
            </div>
            
            <div className="space-y-2 mt-4 pt-3 border-t border-[#F4F1EA]">
              <div>
                <a
                  href={`tel:${owner1Phone.replace(/[^0-9]/g, '')}`}
                  className="text-sm font-semibold text-[#2C2C2C] hover:text-[#C9A84C] transition-colors block"
                >
                  📞 {owner1Phone}
                </a>
              </div>
              <div>
                <a
                  href={`https://wa.me/92${owner1Phone.replace(/^0+/, '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded hover:bg-[#25D366]/20 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.818l-1.517 5.61 5.768-1.514c1.666.91 3.57 1.436 5.602 1.436 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Owner 2: Malik Nasir Iqbal */}
          <div className="bg-white p-6 border border-[#EDE7DC] shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#C9A84C]" />
            <div>
              <span className="text-3xl block mb-3">👤</span>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
                Factory Operations
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C2C2C] mb-2">{owner2Name}</h3>
            </div>
            
            <div className="space-y-2 mt-4 pt-3 border-t border-[#F4F1EA]">
              <div>
                <a
                  href={`tel:${owner2Phone.replace(/[^0-9]/g, '')}`}
                  className="text-sm font-semibold text-[#2C2C2C] hover:text-[#C9A84C] transition-colors block"
                >
                  📞 {owner2Phone}
                </a>
              </div>
              <div className="text-xs text-[#8C8279]">
                Direct Call for Supply & Yard Visits
              </div>
            </div>
          </div>

          {/* Location Card: Fort Abbas */}
          <div className="bg-white p-6 border border-[#EDE7DC] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-3xl block mb-3">📍</span>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
                Factory Yard Location
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C2C2C] mb-1">Fort Abbas, Punjab</h3>
              <p className="text-[#8C8279] text-xs leading-relaxed mt-2">
                Main Haroonabad Road, Near THQ Hospital, Bahawalnagar District, Pakistan
              </p>
            </div>

            <div className="pt-3 border-t border-[#F4F1EA] mt-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#C9A84C] hover:underline flex items-center gap-1"
              >
                Open in Google Maps <span>→</span>
              </a>
            </div>
          </div>

          {/* Email & Support */}
          <div className="bg-white p-6 border border-[#EDE7DC] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-3xl block mb-3">✉️</span>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
                Official Email
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C2C2C] mb-1">Tender & Quotations</h3>
              <a
                href={`mailto:${emailAddr}`}
                className="text-xs font-semibold text-[#C9A84C] hover:text-[#2C2C2C] transition-colors break-all block mt-2"
              >
                {emailAddr}
              </a>
            </div>

            <div className="text-xs text-[#8C8279] pt-3 border-t border-[#F4F1EA] mt-4">
              Response time within 24 hours
            </div>
          </div>
        </div>

        {/* ─── Form & Map Section ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#EDE7DC] p-6 sm:p-10 lg:p-12 shadow-sm">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-[#EDE7DC] mb-8">
              <button
                type="button"
                onClick={() => {
                  setTab('contact');
                  setSubmitted(false);
                }}
                className={`pb-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                  tab === 'contact'
                    ? 'border-[#C9A84C] text-[#2C2C2C]'
                    : 'border-transparent text-[#8C8279] hover:text-[#2C2C2C]'
                }`}
              >
                General Inquiry
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('quote');
                  setSubmitted(false);
                }}
                className={`pb-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                  tab === 'quote'
                    ? 'border-[#C9A84C] text-[#2C2C2C]'
                    : 'border-transparent text-[#8C8279] hover:text-[#2C2C2C]'
                }`}
              >
                Request Quotation
              </button>
            </div>

            {/* Success Message */}
            {submitted ? (
              <div className="bg-[#D1FAE5] border-l-4 border-[#10B981] p-6 text-[#065F46]">
                <h3 className="font-serif text-2xl font-bold mb-2">Inquiry Received Successfully!</h3>
                <p className="text-sm leading-relaxed mb-4">
                  Thank you. Malik Yasir Bashir or Malik Nasir Iqbal will review your stone requirements and respond with competitive factory-direct pricing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 bg-[#065F46] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Another Inquiry
                  </button>
                  <a
                    href={`https://wa.me/92${owner1Phone.replace(/^0+/, '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#1E6B37] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    Connect Instantly on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {errorMessage && (
                  <div className="p-4 bg-[#FDF2F2] border-l-4 border-[#E02424] text-[#9B1C1C] text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Honeypot anti-spam trap */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#d4cecb] focus:outline-none focus:border-[#C9A84C] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#d4cecb] focus:outline-none focus:border-[#C9A84C] bg-white"
                    />
                  </div>
                </div>

                {/* Email & Stone Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#d4cecb] focus:outline-none focus:border-[#C9A84C] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                      Stone Variety of Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tropical Granite, Tavera, Black Granite"
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#d4cecb] focus:outline-none focus:border-[#C9A84C] bg-white"
                    />
                  </div>
                </div>

                {/* Quotation Specific Fields */}
                {tab === 'quote' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF7F2] p-4 border border-[#EDE7DC]">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                        Preferred Finish
                      </label>
                      <select
                        value={formData.preferredFinish}
                        onChange={(e) => setFormData({ ...formData, preferredFinish: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#d4cecb] bg-white focus:outline-none focus:border-[#C9A84C]"
                      >
                        <option value="Polished">Polished</option>
                        <option value="Honed">Honed</option>
                        <option value="Brushed">Brushed</option>
                        <option value="Flamed">Flamed</option>
                        <option value="Sandblasted">Sandblasted</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                        Tile / Slab Sizing
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12x24 tiles, full slabs"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#d4cecb] bg-white focus:outline-none focus:border-[#C9A84C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                        Estimated Quantity
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1500 sq ft, 4 slabs"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#d4cecb] bg-white focus:outline-none focus:border-[#C9A84C]"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#2C2C2C] mb-1">
                    Project Details & Edge Specifications
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Describe your project, required delivery location from Fort Abbas, custom edge profiles..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#d4cecb] focus:outline-none focus:border-[#C9A84C] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#2C2C2C] hover:bg-[#C9A84C] hover:text-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Submitting Inquiry...' : tab === 'quote' ? 'Send Quotation Request' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Fort Abbas Google Map Embed & Operating Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#EDE7DC] pt-8 lg:pt-0 lg:pl-8">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-serif text-xl font-bold text-[#2C2C2C]">
                  Factory & Showroom Yard
                </h3>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#C9A84C] hover:underline"
                >
                  Get Directions →
                </a>
              </div>
              <p className="text-xs text-[#C9A84C] font-semibold mb-3">
                📍 Main Haroonabad Road, Near THQ Hospital, Fort Abbas
              </p>

              {/* Map Iframe */}
              <div className="aspect-[4/3] bg-[#FAF7F2] border border-[#EDE7DC] overflow-hidden mb-6 shadow-sm">
                <iframe
                  title="Abdullah Marble Factory Location in Fort Abbas"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Weekly Business Hours */}
              <div className="bg-[#FAF7F2] p-4 border border-[#EDE7DC]">
                <h4 className="font-serif text-base font-bold text-[#2C2C2C] mb-2">
                  Factory Yard Hours
                </h4>
                <div className="space-y-1.5 text-xs text-[#8C8279]">
                  <div className="flex justify-between">
                    <span>Monday – Thursday:</span>
                    <span className="font-semibold text-[#2C2C2C]">8:30 AM – 6:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday:</span>
                    <span className="font-semibold text-[#2C2C2C]">8:30 AM – 12:30 PM, 2:30 PM – 6:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold text-[#2C2C2C]">8:30 AM – 6:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-[#9B1C1C] font-bold">Closed (Visits by Appointment)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
