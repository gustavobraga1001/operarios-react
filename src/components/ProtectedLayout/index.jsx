import React from "react";
import useAuth from "../../context/AuthProvider/useAuth";
import { Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
  const auth = useAuth();

  if (!auth.email) {
    return <h1>Você não tem acesso</h1>;
  }
  return <Outlet />;
};
