import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8F5F0',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#C9A84C', animation: 'spin 1s linear infinite' }}>
          🏛️
        </div>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#2C2C2C', fontWeight: 600 }}>
          Authenticating Abdullah Marble Factory Admin...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
