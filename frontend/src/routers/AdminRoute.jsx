import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = ({ children, redirectTo = "/admin" }) => {
  const location = useLocation();

  let isAdmin = false;
  try {
    const stored = localStorage.getItem("admin");
    const user = stored ? JSON.parse(stored) : null;
    isAdmin = !!(user && user.role === "admin");
  } catch (err) {
    isAdmin = false;
  }

  if (isAdmin) return children ? children : <Outlet />;

  return <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export default AdminRoute;
