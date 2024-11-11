import React, { createContext, useState, useContext } from 'react';
import { loginUserAPI, loginEmployeeAPI } from './api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (credentials, isEmployee = false) => {
    try {
      const response = isEmployee 
        ? await loginEmployeeAPI(credentials)
        : await loginUserAPI(credentials);

      if (!response || !response.success || !response.data) {
        throw new Error('Invalid response from server');
      }

      const userData = {
        ...response.data,
        role: isEmployee ? 'employee' : 'user'
      };

      setUser(userData);
      setToken(response.data.token);
      
      return { success: true, role: userData.role };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};