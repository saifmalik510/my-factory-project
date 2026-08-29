import { useState, useEffect } from 'react';
import api from '../../services/api';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  gold: '#C9A84C',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function ManageSettings() {
  const [settings, setSettings] = useState({
    factoryName: 'Abdullah Marble Factory',
    tagline: 'Crafting Timeless Spaces with Premium Natural Stone',
    contact: {
      phone: '0345-4792176',
      secondaryPhone: '0342-7150318',
      whatsapp: '0345-4792176',
      email: 'info@abdullahmarble.com',
      owner1Name: 'Malik Yasir Bashir',
      owner1Phone: '0345-4792176',
      owner2Name: 'Malik Nasir Iqbal',
      owner2Phone: '0342-7150318',
    },
    location: {
      address: 'Main Haroonabad Road, Near THQ Hospital',
      city: 'Fort Abbas',
      district: 'Bahawalnagar',
      province: 'Punjab',
      country: 'Pakistan',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55835.45268482476!2d72.825227!3d29.192518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c8340d860d5b5%3A0x6b1cfb8849ad7e59!2sFort%20Abbas%2C%20Bahawalnagar%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    },
    businessHours: {
      monday: '8:30 AM – 6:30 PM',
      tuesday: '8:30 AM – 6:30 PM',
      wednesday: '8:30 AM – 6:30 PM',
      thursday: '8:30 AM – 6:30 PM',
      friday: '8:30 AM – 12:30 PM, 2:30 PM – 6:30 PM',
      saturday: '8:30 AM – 6:30 PM',
      sunday: 'Closed',
    },
    socialLinks: { facebook: '', instagram: '', youtube: '', twitter: '', tiktok: '' },
    seoTitle: 'Abdullah Marble Factory — Premium Natural Marble & Stone (Fort Abbas)',
    seoDescription: 'Premier manufacturer and supplier of Pakistani and imported Italian marble, granite, and exotic stone in Fort Abbas and across Pakistan.',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await api.get('/admin/settings');
        if (res.data?.success && res.data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...res.data.settings,
            contact: { ...prev.contact, ...(res.data.settings.contact || {}) },
            location: { ...prev.location, ...(res.data.settings.location || {}) },
            businessHours: { ...prev.businessHours, ...(res.data.settings.businessHours || {}) },
            socialLinks: { ...prev.socialLinks, ...(res.data.settings.socialLinks || {}) },
          }));
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setError(null);

    try {
      const res = await api.put('/admin/settings', settings);
      if (res.data?.success) {
        setFeedback('Site and factory settings updated successfully!');
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      console.error('Settings update error', err);
      setError(err.response?.data?.message || 'Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ padding: '3rem', textAlign: 'center', color: C.stone }}>Loading site settings...</p>;
  }

  return (
    <div style={{ maxWidth: '950px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.25rem' }}>
          Factory Settings & Owner Profiles
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: C.stone }}>
          Manage factory location in Fort Abbas, owners contact numbers, WhatsApp connectivity, and weekly operating hours.
        </p>
      </div>

      {feedback && (
        <div style={{ padding: '0.875rem 1.25rem', background: '#D1FAE5', borderLeft: '4px solid #10B981', color: '#065F46', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {feedback}
        </div>
      )}
      {error && (
        <div style={{ padding: '0.875rem 1.25rem', background: '#FDF2F2', borderLeft: '4px solid #E02424', color: '#9B1C1C', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* ─── Factory Owners Information ─── */}
        <div style={{ background: '#fff', padding: '1.75rem', border: '1px solid rgba(140,130,121,0.15)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 700, color: C.charcoal, marginBottom: '1rem', borderBottom: '1px solid #EDE7DC', paddingBottom: '0.5rem' }}>
            Factory Owners & Contacts
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            {/* Owner 1 */}
            <div style={{ background: '#FAF7F2', padding: '1.25rem', border: '1px solid #EDE7DC' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: C.gold, marginBottom: '0.5rem' }}>
                First Owner (with WhatsApp)
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Owner Name
                </label>
                <input
                  type="text"
                  value={settings.contact?.owner1Name || 'Malik Yasir Bashir'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, owner1Name: e.target.value },
                    })
                  }
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', outline: 'none', background: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Phone & WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.contact?.owner1Phone || '0345-4792176'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: {
                        ...settings.contact,
                        owner1Phone: e.target.value,
                        phone: e.target.value,
                        whatsapp: e.target.value,
                      },
                    })
                  }
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', outline: 'none', background: '#fff' }}
                />
              </div>
            </div>

            {/* Owner 2 */}
            <div style={{ background: '#FAF7F2', padding: '1.25rem', border: '1px solid #EDE7DC' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.5rem' }}>
                Second Owner (Call & Operations)
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Owner Name
                </label>
                <input
                  type="text"
                  value={settings.contact?.owner2Name || 'Malik Nasir Iqbal'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, owner2Name: e.target.value },
                    })
                  }
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', outline: 'none', background: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settings.contact?.owner2Phone || '0342-7150318'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: {
                        ...settings.contact,
                        owner2Phone: e.target.value,
                        secondaryPhone: e.target.value,
                      },
                    })
                  }
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', outline: 'none', background: '#fff' }}
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              Official Factory Email Address
            </label>
            <input
              type="email"
              value={settings.contact?.email || 'info@abdullahmarble.com'}
              onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
              style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
            />
          </div>
        </div>

        {/* ─── Factory Location (Fort Abbas) ─── */}
        <div style={{ background: '#fff', padding: '1.75rem', border: '1px solid rgba(140,130,121,0.15)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 700, color: C.charcoal, marginBottom: '1rem', borderBottom: '1px solid #EDE7DC', paddingBottom: '0.5rem' }}>
            Factory Location in Fort Abbas
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Street Address
              </label>
              <input
                type="text"
                value={settings.location?.address || 'Main Haroonabad Road, Near THQ Hospital'}
                onChange={(e) => setSettings({ ...settings, location: { ...settings.location, address: e.target.value } })}
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                City
              </label>
              <input
                type="text"
                value={settings.location?.city || 'Fort Abbas'}
                onChange={(e) => setSettings({ ...settings, location: { ...settings.location, city: e.target.value } })}
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                District / Province
              </label>
              <input
                type="text"
                value={settings.location?.province || 'Bahawalnagar, Punjab'}
                onChange={(e) => setSettings({ ...settings, location: { ...settings.location, province: e.target.value } })}
                style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              Google Maps Embed Iframe URL for Fort Abbas
            </label>
            <input
              type="text"
              value={settings.location?.mapEmbedUrl || ''}
              onChange={(e) => setSettings({ ...settings, location: { ...settings.location, mapEmbedUrl: e.target.value } })}
              style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none', fontSize: '0.8125rem' }}
            />
          </div>
        </div>

        {/* ─── Business Hours Schedule ─── */}
        <div style={{ background: '#fff', padding: '1.75rem', border: '1px solid rgba(140,130,121,0.15)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 700, color: C.charcoal, marginBottom: '1rem', borderBottom: '1px solid #EDE7DC', paddingBottom: '0.5rem' }}>
            Weekly Operating Hours
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem' }}>
            {DAYS.map((day) => {
              const cap = day.charAt(0).toUpperCase() + day.slice(1);
              return (
                <div key={day}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.25rem' }}>
                    {cap}
                  </label>
                  <input
                    type="text"
                    value={settings.businessHours?.[day] || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        businessHours: { ...settings.businessHours, [day]: e.target.value },
                      })
                    }
                    style={{ width: '100%', padding: '0.55rem', border: '1px solid #ccc', outline: 'none', fontSize: '0.8125rem' }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.9rem 2.5rem', fontSize: '0.875rem' }}
          >
            {saving ? 'Saving Settings...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
