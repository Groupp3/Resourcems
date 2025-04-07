// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const [token, setToken] = useState(AuthService.getToken());

  useEffect(() => {
    const storedUser = AuthService.getCurrentUser();
    const storedToken = AuthService.getToken();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    const data = await AuthService.login(email, password);
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
