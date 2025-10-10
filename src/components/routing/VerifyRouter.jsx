import { useAuth } from "../../context/AuthContext"
import { Navigate } from "react-router-dom";
export default function VerifyRouter({ children }) {
  const {user} = useAuth();
  console.log(user);
  if(user.status === "PENDING") {
    return children
  } 
  return children
}
