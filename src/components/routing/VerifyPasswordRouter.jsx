import { useAuth } from "../../context/AuthContext"
import { Navigate } from "react-router-dom";
export default function ({ children }) {
  const {user, logout} = useAuth();
  if(user !== null) {
    let check = confirm("Để làm điều này bạn cần đăng xuất trước đã!")
    if(check){
      logout();
    }
  } else {
    return <Navigate to="/register"/>;
  }

  return children; 
}
