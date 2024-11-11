import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (location.pathname.includes('employee') && user?.role !== 'employee') {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;