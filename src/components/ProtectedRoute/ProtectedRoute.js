import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};


