import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './App.css';
import Layout from "./hook/system/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { createStore } from 'redux'


export default function App() {
  return (
    <AuthProvider>
        <ScrollToTop behavior="smooth" top={0} />
        <Layout />
        <ToastContainer />
    </AuthProvider>
  );
}
