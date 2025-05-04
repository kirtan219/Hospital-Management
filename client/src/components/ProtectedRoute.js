import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute; 