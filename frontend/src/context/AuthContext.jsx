import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('abdullah_admin_token') || null);
  const [loading, setLoading] = useState(true);

  // Check auth session on mount or token change
  const checkAuth = useCallback(async () => {
    const savedToken = localStorage.getItem('abdullah_admin_token');
    if (!savedToken) {
      setAdmin(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/auth/me');
      if (res.data?.success && res.data?.admin) {
        setAdmin(res.data.admin);
        setToken(savedToken);
      } else {
        localStorage.removeItem('abdullah_admin_token');
        setAdmin(null);
        setToken(null);
      }
    } catch (err) {
      console.warn('Auth verification failed:', err.response?.data?.message || err.message);
      localStorage.removeItem('abdullah_admin_token');
      setAdmin(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login handler
  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    if (res.data?.success && res.data?.token) {
      const receivedToken = res.data.token;
      const receivedAdmin = res.data.admin;

      localStorage.setItem('abdullah_admin_token', receivedToken);
      setToken(receivedToken);
      setAdmin(receivedAdmin);
      return { success: true, admin: receivedAdmin };
    }
    throw new Error(res.data?.message || 'Login failed.');
  };

  // Logout handler
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout API error', err);
    } finally {
      localStorage.removeItem('abdullah_admin_token');
      setToken(null);
      setAdmin(null);
    }
  };

  const value = {
    admin,
    token,
    isAuthenticated: !!token && !!admin,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
