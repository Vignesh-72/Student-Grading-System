import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Effect to check for a token in local storage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Here you would typically decode the token to get user info
      // For now, we just set the token
      setToken(storedToken);
    }
  }, []);

  // Login function
  const login = (userData, tokenData) => {
    localStorage.setItem('token', tokenData);
    setUser(userData);
    setToken(tokenData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};