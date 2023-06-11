import React from "react";
import { Navigate } from "react-router-dom";

const CommonRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CommonRoute;
