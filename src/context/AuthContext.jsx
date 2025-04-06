// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDefaultRole, Roles } from '../utils/roles';


export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(Roles.ATTENDEE);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  const login = ({ token, roles, userId, username }) => {
    const defaultRole = getDefaultRole(roles);
    console.log(defaultRole);
    
    setUser({ token, roles, userId, username, twoFAVerified: false });
    setSelectedRole(defaultRole);
  };

  const verify2FA = (token) => {
    setUser((prev) => ({ ...prev, twoFAVerified: true, token }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setSelectedRole(Roles.ATTENDEE);
  };

  const value = {
    user,
    token: user?.token || null,
    roles: user?.roles || '',
    username: user?.username || '',
    userId: user?.userId || null,
    twoFAVerified: user?.twoFAVerified || false,
    selectedRole,
    setSelectedRole,
    login,
    logout,
    verify2FA,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
