import { useAuth } from "../../context/AuthContext"
import { Navigate } from "react-router-dom";
export default function ({ children }) {
  const {user, logout} = useAuth();
  return children; 
}
