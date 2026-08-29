import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  charcoalDark: '#1A1A1A',
  charcoalLight: '#3D3D3D',
  gold: '#C9A84C',
  goldHover: '#A8873A',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard Overview', icon: '📊' },
  { path: '/admin/products', label: 'Manage Products', icon: '💎' },
  { path: '/admin/categories', label: 'Manage Categories', icon: '🏛️' },
  { path: '/admin/gallery', label: 'Manage Gallery', icon: '🖼️' },
  { path: '/admin/inquiries', label: 'Manage Inquiries', icon: '📬' },
  { path: '/admin/settings', label: 'Site Settings', icon: '⚙️' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F1EA', color: C.charcoal }}>
      
      {/* ─── Sidebar ─── */}
      <aside
        style={{
          width: '260px',
          background: C.charcoalDark,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid rgba(201, 168, 76, 0.25)',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.75rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.75rem', color: C.gold }}>🏛️</span>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.1 }}>
                Abdullah
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', color: C.gold, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Marble Admin
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: '1.5rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#fff' : '#A89D95',
                background: isActive ? 'rgba(201, 168, 76, 0.18)' : 'transparent',
                borderLeft: isActive ? `3px solid ${C.gold}` : '3px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info & Footer in Sidebar */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: C.gold,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8125rem',
              }}
            >
              {admin?.username ? admin.username.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {admin?.username || 'Administrator'}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: C.gold, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {admin?.role || 'Superadmin'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: 'rgba(224, 36, 36, 0.15)',
              border: '1px solid rgba(224, 36, 36, 0.4)',
              color: '#F98080',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#E02424', e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(224, 36, 36, 0.15)', e.currentTarget.style.color = '#F98080')}
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Navbar */}
        <header
          style={{
            background: '#fff',
            padding: '0.875rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(140, 130, 121, 0.15)',
            boxShadow: '0 1px 10px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: C.stone }}>
            Abdullah Marble Factory Management System • <span style={{ color: '#1E6B37', fontWeight: 600 }}>● Online</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                color: C.charcoal,
                textDecoration: 'none',
                padding: '0.4rem 0.85rem',
                background: '#FAF7F2',
                border: '1px solid rgba(140,130,121,0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 500,
              }}
            >
              <span>🌐</span> Public Storefront ↗
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
