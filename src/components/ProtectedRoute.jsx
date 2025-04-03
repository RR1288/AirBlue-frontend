import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useContext(AuthContext);

  // if no token is present user is not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/" replace />; 
  }

  // if the user's role is not in the list of allowedRoles, redirect to login
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  
  // if authenticated and authorized, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
