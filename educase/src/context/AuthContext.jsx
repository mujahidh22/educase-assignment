import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000/api/auth';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));
  const [loading, setLoading] = useState(true);

  // Save tokens to localStorage
  const saveTokens = useCallback((access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }, []);

  // Clear auth state
  const clearAuth = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  // Refresh the access token
  const refreshAccessToken = useCallback(async () => {
    const storedRefresh = localStorage.getItem('refreshToken');
    if (!storedRefresh) {
      clearAuth();
      return null;
    }

    try {
      const res = await axios.post(`${API_URL}/refresh`, {
        refreshToken: storedRefresh,
      });
      saveTokens(res.data.accessToken, res.data.refreshToken);
      return res.data.accessToken;
    } catch {
      clearAuth();
      return null;
    }
  }, [clearAuth, saveTokens]);

  // Fetch current user
  const fetchUser = useCallback(async (token) => {
    try {
      const res = await api.get('/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch {
      // Try refreshing token
      const newToken = await refreshAccessToken();
      if (newToken) {
        try {
          const res = await api.get('/me', {
            headers: { Authorization: `Bearer ${newToken}` },
          });
          setUser(res.data.user);
        } catch {
          clearAuth();
        }
      }
    }
  }, [refreshAccessToken, clearAuth]);

  // On mount, fetch user if token exists
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetchUser(token);
      }
      setLoading(false);
    };
    init();
  }, []); 

  // Login
  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    saveTokens(res.data.accessToken, res.data.refreshToken);
    setUser(res.data.user);
    return res.data;
  };

  // Register
  const register = async (userData) => {
    const res = await api.post('/register', userData);
    saveTokens(res.data.accessToken, res.data.refreshToken);
    setUser(res.data.user);
    return res.data;
  };

  // Logout
  const logout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (e){
      console.log('Error in logout:',e)
    }
    clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
