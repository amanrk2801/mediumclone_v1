// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
