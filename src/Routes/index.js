import { useContext, useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import AuthApi from "./AuthApi";

export const ProtectRoutes = ({ children }) => {
  if (!localStorage.getItem("usuario")) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export const PublicRoute = ({ children }) => {
  if (!localStorage.getItem("usuario")) {
    return <>{children}</>;
  }
  return <Navigate to="/Dashboard" />;
};
