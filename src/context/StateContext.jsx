// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import parseJwtNoLib from "../utils/tokenParser";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const initialToken = localStorage.getItem(TOKEN_KEY) || null;

  // token & user khởi tạo từ localStorage (synchronous)
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(() => (initialToken ? parseJwtNoLib(initialToken) : null));
  const [isAuthReady, setIsAuthReady] = useState(false); // true khi lần kiểm tra đầu tiên hoàn tất

  // helper logout
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  // khi token thay đổi: cập nhật localStorage, axios header, validate exp, set user
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);

      // parse token và kiểm tra expire
      const parsed = parseJwtNoLib(token);
      if (!parsed) {
        // invalid token -> clear
        logout();
        setIsAuthReady(true);
        return;
      }
      if (parsed.exp && Date.now() / 1000 > parsed.exp) {
        logout();
        setIsAuthReady(true);
        return;
      }
      setUser(parsed);
      setIsAuthReady(true);
    } else {
      // không có token
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      setIsAuthReady(true);
    }
  }, [token, logout]);

  const loginWithToken = useCallback((newToken) => {
    setToken(newToken);
  }, []);

  const refreshToken = ()=> {
    const res = async () => {
      const data = await axios.post(`${import.meta.env.VITE_API}`, {token: token}, {})
      if(data.data?.result?.authenticated) {
        setToken(data.data?.result?.token);
      }
    }
    res();
  }

  const contextValue = {
    user,
    token,
    loginWithToken, // dùng để login
    refreshToken,
    logout,
    isAuthReady,
    setUser, // nếu bạn cần set user thủ công (cẩn thận)
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
