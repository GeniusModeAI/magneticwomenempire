import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminLogin from './AdminLogin';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <AdminLogin />;
};

export default ProtectedRoute;
