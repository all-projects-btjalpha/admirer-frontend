import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("auth_token"); // or useContext if you have AuthContext
  return isAuthenticated ? children : <Navigate to="/LogIn" replace />;
};

export default PrivateRoute;

