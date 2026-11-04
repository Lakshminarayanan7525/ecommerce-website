import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('apex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('apex_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('apex_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('apex_token', token);
    } else {
      localStorage.removeItem('apex_token');
    }
  }, [token]);

  const login = async (email, password, remember = true) => {
    const data = await api.auth.login(email, password);
    setUser(data);
    setToken(data.token);
    if (!remember) {
      sessionStorage.setItem('apex_remember', 'false');
    }
    return data;
  };

  const register = async (userData) => {
    const data = await api.auth.signup(userData);
    setUser(data);
    setToken(data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('apex_user');
    localStorage.removeItem('apex_token');
  };

  const updateProfile = async (profileData) => {
    const updated = await api.auth.updateProfile(profileData);
    setUser(prev => ({ ...prev, ...updated }));
    return updated;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      updateProfile,
      setUser
    }}>
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
