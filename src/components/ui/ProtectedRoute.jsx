import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from './Spinner';

// Guards routes that require a signed-in user. While the saved token is being
// verified we wait, then either render the page or redirect to /login while
// remembering where the user was headed.
const ProtectedRoute = ({ children }) => {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size={28} className="text-muted" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
