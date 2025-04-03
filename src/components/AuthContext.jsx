import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext with default values
export const AuthContext = createContext({
  user: null,
  token: null,
  role: null,
  setUser: () => {},
  setToken: () => {},
  setRole: () => {},
});

// AuthProvider component to wrap around the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Load user, token, and role from localStorage when the app initializes
  useEffect(() => {
    // store user token and rule
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    // if user and token are found update variables
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setRole(storedRole || 'attendee');
    }
  }, []);

  // Update localStorage when role changes
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    }
  }, [role]);

  return (
    <AuthContext.Provider value={{ user, token, role, setUser, setToken, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
