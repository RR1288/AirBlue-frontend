import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, selectedRole } = useContext(AuthContext);
  const location = useLocation();

  // If the user is not logged in, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If 2FA is not enabled and the user is not on the enable-2fa page, redirect there.
  if (!user.twoFAVerified && location.pathname !== "/enable-2fa") {
    return <Navigate to="/enable-2fa" replace />;
  }

  // If allowedRoles are defined and the user's role is not allowed, redirect to home.
  // eslint-disable-next-line react/prop-types
  if (allowedRoles && !allowedRoles.includes(selectedRole)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
