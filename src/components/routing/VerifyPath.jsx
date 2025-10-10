//VerifyPath src/components/routing/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ({ children }) {
  const { user } = useAuth();
  const role = user?.scope ?? null;

  console.log(role);

  if (user === null) {
    return children;
  } else {
    if (role === 'ROLE_ADMIN') {
        return <Navigate to={'/admin'} />
    }else if(role === 'ROLE_ORGANIZER') { 
        return <Navigate to={'/btc'} />
    }else {
        return <Navigate to={'/'} />
    }
  }
}