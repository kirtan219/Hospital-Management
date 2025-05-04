import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// This component redirects authenticated users away from auth pages (login/signup)
const AuthRedirect = ({ children }) => {
  const { currentUser } = useAuth();

  // If user is logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, show the requested auth page
  return children;
};

export default AuthRedirect; 