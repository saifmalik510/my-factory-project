import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  charcoalDark: '#1A1A1A',
  gold: '#C9A84C',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

export default function AdminDashboard() {
  const { admin, logout } = useAuth();

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    gallery: 0,
    inquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/admin/dashboard-stats');
      if (res.data?.success) {
        if (res.data.stats) setStats(res.data.stats);
        if (res.data.recentInquiries) setRecentInquiries(res.data.recentInquiries);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
      setError('Could not refresh admin dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F1EA', color: C.charcoal }}>
      
      {/* ─── Admin Navigation Bar ─── */}
      <header
        style={{
          background: C.charcoalDark,
          color: '#fff',
          padding: '0.875rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `2px solid ${C.gold}`,
        }}
      >
        {/* Left: Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem', color: C.gold }}>🏛️</span>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.1 }}>
              Abdullah Marble Factory
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Admin Management Console
            </div>
          </div>
        </div>

        {/* Right: User Profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              color: '#DDD4C5',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>🌐</span> View Public Site
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.06)',
              padding: '0.4rem 0.85rem',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            <span style={{ color: C.gold, fontSize: '0.75rem' }}>👤</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 600 }}>
              {admin?.username || 'Admin'}
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                background: C.gold,
                color: '#fff',
                padding: '1px 5px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {admin?.role || 'Admin'}
            </span>
          </div>

          <button
            onClick={logout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              padding: '0.45rem 0.85rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E02424';
              e.currentTarget.style.borderColor = '#E02424';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ─── Dashboard Body ─── */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        
        {/* Title & Refresh Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.25rem' }}>
              Welcome back, {admin?.username || 'Administrator'}
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: C.stone }}>
              Factory operational overview, inventory statistics, and customer quotation pipeline.
            </p>
          </div>

          <button
            onClick={fetchDashboardData}
            disabled={loading}
            style={{
              padding: '0.6rem 1.25rem',
              background: '#fff',
              border: '1px solid rgba(140, 130, 121, 0.3)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: C.charcoal,
            }}
          >
            🔄 {loading ? 'Refreshing...' : 'Refresh Stats'}
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: '#FDF2F2', borderLeft: '4px solid #E02424', color: '#9B1C1C', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {/* ─── KPI Stats Grid ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Products Stat */}
          <div
            style={{
              background: '#fff',
              padding: '1.75rem',
              border: '1px solid rgba(140,130,121,0.15)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              borderTop: `3px solid ${C.gold}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.stone, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Products in Catalog
              </span>
              <span style={{ fontSize: '1.25rem' }}>💎</span>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 700, color: C.charcoal }}>
              {stats.products}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#1E6B37', marginTop: '0.25rem' }}>
              Active marble & granite inventory
            </div>
          </div>

          {/* Categories Stat */}
          <div
            style={{
              background: '#fff',
              padding: '1.75rem',
              border: '1px solid rgba(140,130,121,0.15)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              borderTop: '3px solid #2C2C2C',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.stone, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Stone Categories
              </span>
              <span style={{ fontSize: '1.25rem' }}>🏛️</span>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 700, color: C.charcoal }}>
              {stats.categories}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.stone, marginTop: '0.25rem' }}>
              Pakistani, Italian, Granite, Onyx
            </div>
          </div>

          {/* Gallery Stat */}
          <div
            style={{
              background: '#fff',
              padding: '1.75rem',
              border: '1px solid rgba(140,130,121,0.15)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              borderTop: `3px solid ${C.gold}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.stone, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Gallery Projects
              </span>
              <span style={{ fontSize: '1.25rem' }}>🖼️</span>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 700, color: C.charcoal }}>
              {stats.gallery}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.stone, marginTop: '0.25rem' }}>
              Completed installations showcased
            </div>
          </div>

          {/* Inquiries Stat */}
          <div
            style={{
              background: '#fff',
              padding: '1.75rem',
              border: '1px solid rgba(140,130,121,0.15)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              borderTop: '3px solid #1E6B37',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.stone, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Customer Inquiries
              </span>
              <span style={{ fontSize: '1.25rem' }}>📬</span>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 700, color: C.charcoal }}>
              {stats.inquiries}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#1E6B37', marginTop: '0.25rem' }}>
              Direct quotations & contact leads
            </div>
          </div>
        </div>

        {/* ─── Two-Column Section: Recent Inquiries + Quick Actions ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Left: Recent Inquiries Table */}
          <div
            style={{
              background: '#fff',
              padding: '2rem',
              border: '1px solid rgba(140,130,121,0.15)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', fontWeight: 700, color: C.charcoal }}>
                Recent Customer Inquiries
              </h2>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.gold, fontWeight: 600 }}>
                Live Pipeline
              </span>
            </div>

            {recentInquiries.length === 0 ? (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: C.stone, padding: '2rem 0', textAlign: 'center' }}>
                No inquiries received yet. New inquiries submitted on the website will appear here.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #EDE7DC', color: C.stone, fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Customer</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Type</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Product / Interest</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInquiries.map((inq) => (
                      <tr key={inq._id} style={{ borderBottom: '1px solid #F4F1EA' }}>
                        <td style={{ padding: '0.875rem 0.5rem', fontWeight: 600, color: C.charcoal }}>
                          <div>{inq.customerName}</div>
                          <div style={{ fontSize: '0.75rem', color: C.stone, fontWeight: 400 }}>{inq.phone}</div>
                        </td>
                        <td style={{ padding: '0.875rem 0.5rem', color: C.stone }}>
                          {inq.inquiryType || 'General'}
                        </td>
                        <td style={{ padding: '0.875rem 0.5rem', color: C.charcoal }}>
                          {inq.productInterest || 'N/A'}
                        </td>
                        <td style={{ padding: '0.875rem 0.5rem' }}>
                          <span
                            style={{
                              background: inq.status === 'New' ? '#FEF3C7' : '#D1FAE5',
                              color: inq.status === 'New' ? '#92400E' : '#065F46',
                              padding: '2px 8px',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {inq.status || 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right: Quick Administration Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                background: '#fff',
                padding: '2rem',
                border: '1px solid rgba(140,130,121,0.15)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', fontWeight: 700, color: C.charcoal, marginBottom: '1.25rem' }}>
                Management Shortcuts
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <Link
                  to="/products"
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: '#FAF7F2',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: C.charcoal,
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  <span>💎 Browse Active Products</span>
                  <span style={{ color: C.gold }}>→</span>
                </Link>

                <Link
                  to="/gallery"
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: '#FAF7F2',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: C.charcoal,
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  <span>🖼️ Manage Gallery Portfolio</span>
                  <span style={{ color: C.gold }}>→</span>
                </Link>

                <Link
                  to="/contact"
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: '#FAF7F2',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: C.charcoal,
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  <span>📍 Check Contact / Map Details</span>
                  <span style={{ color: C.gold }}>→</span>
                </Link>
              </div>
            </div>

            {/* Security & System Info Box */}
            <div
              style={{
                background: C.charcoalDark,
                color: '#fff',
                padding: '1.75rem',
                borderLeft: `3px solid ${C.gold}`,
              }}
            >
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: C.gold, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                Security & Authentication
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.125rem', color: '#fff', marginBottom: '0.5rem' }}>
                JWT Protected Session
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#A89D95', lineHeight: 1.6 }}>
                All `/api/admin/*` routes are protected with Bearer JWT verification and bcrypt credential hashing.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
