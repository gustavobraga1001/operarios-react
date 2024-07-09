import React from "react";
import useAuth from "../../context/AuthProvider/useAuth";
import { Outlet } from "react-router-dom";
import Login from "../../pages/Login/Login";

export const ProtectedLayout = () => {
  const auth = useAuth();

  if (!auth.email) {
    return <Login />;
  }
  return <Outlet />;
};
