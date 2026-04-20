import React, { createContext, useState, useEffect } from 'react';
import { saveUser, getUser, clearAllData } from './services/storageService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await getUser();
        setUser(savedUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    try {
      await saveUser(userData);
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await clearAllData();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};