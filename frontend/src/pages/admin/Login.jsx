import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  charcoalDark: '#1A1A1A',
  gold: '#C9A84C',
  goldHover: '#A8873A',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Where to redirect after login
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // If already authenticated, redirect immediately
  if (isAuthenticated) {
    navigate(from, { replace: true });
  }

  const handleDemoFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Please enter your username or admin email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Admin login error:', err);
      const msg = err.response?.data?.message || err.message || 'Invalid username or password.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: `
          radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,168,76,0.12) 0%, transparent 70%),
          linear-gradient(135deg, ${C.charcoalDark} 0%, #242424 50%, #151515 100%)
        `,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(38, 38, 38, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(201, 168, 76, 0.35)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          padding: '3rem 2.25rem',
          position: 'relative',
        }}
      >
        {/* Top Gold Border Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          }}
        />

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              border: `1.5px solid ${C.gold}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: C.gold,
              fontSize: '1.5rem',
              background: 'rgba(201, 168, 76, 0.08)',
            }}
          >
            🏛️
          </div>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#F8F5F0',
              lineHeight: 1.1,
              marginBottom: '0.25rem',
            }}
          >
            Abdullah Marble
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: C.gold,
            }}
          >
            Factory Portal & Administration
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: 'rgba(224, 36, 36, 0.15)',
              borderLeft: '3px solid #E02424',
              color: '#F98080',
              padding: '0.875rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              marginBottom: '1.5rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Username / Email */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#DDD4C5',
                marginBottom: '0.4rem',
              }}
            >
              Admin Username or Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              autoComplete="username"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                background: 'rgba(20, 20, 20, 0.8)',
                border: '1px solid rgba(140, 130, 121, 0.35)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = C.gold)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(140, 130, 121, 0.35)')}
            />
          </div>

          {/* Password with Toggle */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label
                htmlFor="password"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#DDD4C5',
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: C.gold,
                  fontSize: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                background: 'rgba(20, 20, 20, 0.8)',
                border: '1px solid rgba(140, 130, 121, 0.35)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = C.gold)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(140, 130, 121, 0.35)')}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            id="admin-login-btn"
            style={{
              width: '100%',
              padding: '0.9rem',
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldHover} 100%)`,
              border: 'none',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 15px rgba(201, 168, 76, 0.3)',
            }}
          >
            {isSubmitting ? 'Verifying Credentials...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        {/* Quick Demo Credentials Fill Box */}
        <div
          style={{
            marginTop: '2rem',
            padding: '0.875rem 1rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px dashed rgba(201, 168, 76, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: C.gold, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Demo Access
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#A89D95' }}>
              admin / admin123
            </div>
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            style={{
              background: 'rgba(201, 168, 76, 0.2)',
              border: `1px solid ${C.gold}`,
              color: '#fff',
              fontSize: '0.6875rem',
              padding: '0.35rem 0.6rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
            }}
          >
            Auto Fill
          </button>
        </div>

        {/* Back Link to Main Website */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link
            to="/"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              color: '#8C8279',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = C.gold)}
            onMouseLeave={(e) => (e.target.style.color = '#8C8279')}
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
