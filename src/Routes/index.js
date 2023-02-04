import { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Products from "../pages/Products/Products";
import AuthApi from "./AuthApi";
import Cookies from "js-cookie";

export const ProtectRoutes = ({ children }) => {
  if (!Cookies.get("user")) {
    console.log("RENDERIZOU AQUI")
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export const PublicRoute = ({ children }) => {
  if (!Cookies.get("user")) {
    return <>{children}</>;
  }
  return <Navigate to="/Dashboard" />;
};
