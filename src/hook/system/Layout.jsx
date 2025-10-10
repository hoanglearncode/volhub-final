// src/components/layout/Layout.jsx  (hoặc file bạn đang dùng)
import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/AppRoutes";

function Layout() {
  const element = useRoutes(routes);
  return <>{element}</>;
}

export default Layout;
