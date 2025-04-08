// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, selectedRole, loading, roles, setSelectedRole} = useContext(AuthContext);
  console.log("USER", user);
  console.log("SELECTED ROLE", selectedRole);
  
  const location = useLocation();

  if (loading) {
    console.log("ProtectedRoute: Loading authentication state...");
    return <div>Loading...</div>;
  }

  // If the user is not logged in, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If 2FA is not enabled and the user is not on the enable-2fa page, redirect there.
  if (!user.twoFAVerified && location.pathname !== "/enable-2fa") {
    return <Navigate to="/enable-2fa" replace />;
  }

  // Universal access: If no specific allowedRoles are defined, grant access to all authenticated users.
  if (!allowedRoles || allowedRoles.length === 0) {
    console.log("Universal access granted to all roles.");
    return <Outlet />;
  }

  // Check if the user has any of the required roles for this route
    let userRoles = roles.split("").map((roleCode) => {
      const roleMap = { A: "admin", E: "eventPlanner", F: "financePlanner", attendee: "attendee" };
      return roleMap[roleCode];
    });
    
    if (userRoles.length === 0) {
      setSelectedRole("attendee");
      userRoles = ["attendee"];
      console.log("User roles set to default: attendee");
    }
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
    console.log("User roles:", userRoles);
    console.log("Allowed roles:", allowedRoles);


    if (hasAccess) {
      // If the `selectedRole` doesn't match the required role, switch it automatically
      const matchingRole = allowedRoles.find((role) => userRoles.includes(role));
      console.log("Matching role found:", matchingRole);
      
      if (selectedRole !== matchingRole) {
        setSelectedRole(matchingRole);
        console.log(`Switching role to: ${matchingRole}`);
      }
  
      return <Outlet />;
    }
  
    // If the user's roles do not include any allowedRoles, redirect to home.
    console.log("Access denied. Redirecting to home.");
    return <Navigate to="/home" replace />;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
