// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { getDefaultRole, Roles } from "../utils/roles";

// Create the AuthContext
export const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [selectedRole, setSelectedRole] = useState(Roles.ATTENDEE); // Stores the selected role
  const [loading, setLoading] = useState(true); // Tracks loading state during rehydration

  /**
   * Rehydrate authentication state on app initialization
   */
  const rehydrateAuthState = useCallback(async () => {
    try {
      console.log("Rehydrating auth state...");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // Include cookies
      });

      console.log("Rehydration response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        const { token, roles, userId, username } = data.data;

        console.log("Rehydration success:", data);

        // Update user state with rehydrated data
        setUser({ token, roles, userId, username, twoFAVerified: true });
        setSelectedRole(getDefaultRole(roles));
      } else {
        // Handle failed rehydration (e.g., session expired)
        console.error("Rehydration failed. Status:", response.status);
        setUser(null);
        setSelectedRole(Roles.ATTENDEE); // Reset to default role
      }
    } catch (error) {
      // Log unexpected errors
      console.error("Error during rehydration:", error);
      setUser(null);
      setSelectedRole(Roles.ATTENDEE);
    } finally {
      // Stop loading state
      setLoading(false);
    }
  }, []);

  /**
   * Automatically rehydrate auth state when the app loads
   */
  useEffect(() => {
    rehydrateAuthState();
  }, [rehydrateAuthState]);

  /**
   * Login function to store user information after successful login
   */
  const login = ({ token, roles, userId, username }) => {
    console.log("User logged in:", { username, roles });

    const defaultRole = getDefaultRole(roles);
    setUser({ token, roles, userId, username, twoFAVerified: false }); // Assume 2FA not verified initially
    setSelectedRole(defaultRole);
  };

  /**
   * Function to mark 2FA as verified
   */
  const verify2FA = (token) => {
    console.log("2FA verified for user.");
    setUser((prev) => ({ ...prev, twoFAVerified: true, token }));
  };

  /**
   * Logout function to clear user state
   */
  const logout = () => {
    console.log("User logged out.");
    setUser(null);
    setSelectedRole(Roles.ATTENDEE);
  };

  // Context value for sharing across the app
  const value = {
    user,
    token: user?.token || null,
    roles: user?.roles || "",
    username: user?.username || "",
    userId: user?.userId || null,
    twoFAVerified: user?.twoFAVerified || false,
    selectedRole,
    setSelectedRole,
    login,
    logout,
    verify2FA,
    loading, // Provide loading state
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom Hook for using Auth Context
 */
export const useAuth = () => useContext(AuthContext);