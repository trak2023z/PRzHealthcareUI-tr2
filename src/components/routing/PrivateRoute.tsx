import React from 'react';
import { Navigate } from 'react-router-dom';
import { UseAuthenticatedUser } from '../../hooks/UseAuthenticatedUser';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = UseAuthenticatedUser();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }

  return <>
    {children}
  </>;
};