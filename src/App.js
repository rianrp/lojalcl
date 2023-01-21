import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import AuthApi from "./Routes/AuthApi";
import { ProtectRoutes, PublicRoute } from "./Routes";
import Cookies from "js-cookie";
import Products from "./pages/Products/Products";

function App() {
  const Auth = useContext(AuthApi);
  const [auth, setAuth] = useState(Auth);
  const [page, setPage] = useState(["/Dashboard", "/Products"]);
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectRoutes>
                <Dashboard />
              </ProtectRoutes>
            }
          ></Route>
          <Route
            path="/Products"
            element={
              <ProtectRoutes>
                <Products />
              </ProtectRoutes>
            }
          ></Route>
        </Routes>
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
