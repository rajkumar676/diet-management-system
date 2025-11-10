import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  children: JSX.Element;
}

/**
 * Wrapper component to protect routes based on authentication and authorization.
 * Redirects to /login if not allowed.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
