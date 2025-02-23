import { Navigate } from 'react-router-dom';
import { getToken, hasPermission } from '../services/authService';
import React from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredPermission: string;
}

const PrivateRoute = ({ children, requiredPermission }: PrivateRouteProps) => {
  const isAuthenticated = !!getToken();

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  if (!hasPermission(requiredPermission)) {
    return (
      <Navigate
        to='/unauthorized'
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
