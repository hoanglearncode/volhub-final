// src/components/routing/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  // const { user } = useAuth();
  // const role = user?.scope ?? null;

  // if (!allowedRoles || allowedRoles.length === 0) {
  //   return children;
  // }

  // if (role && allowedRoles.includes(role)) {
  //   return children;
  // }

  // return <Navigate to="/login"/>;
  return children;
}
