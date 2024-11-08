// ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, onUnauthorized, children }) => {
  useEffect(() => {
    if (!isAllowed) {
      onUnauthorized();
    }
  }, [isAllowed, onUnauthorized]);

  return isAllowed ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
