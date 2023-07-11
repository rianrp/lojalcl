import { Navigate, useNavigate } from "react-router-dom";

import { repositoryUser } from "../Repositories/user";
import { useEffect } from "react";

export const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await repositoryUser.isAuthenticated();
        if (response.data == false) {
          navigate("/");
          localStorage.clear();
        }
      } catch (e) {
        navigate("/");
      }
    })();
  }, []);

  return <>{children}</>;
};

export const PublicRoute = ({ children }) => {
  if (!localStorage.getItem("usuario")) {
    return <>{children}</>;
  }
  return <Navigate to="/Dashboard" />;
};
