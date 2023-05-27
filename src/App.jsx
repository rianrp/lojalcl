import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AuthApi from "./Routes/AuthApi";
import { ProtectRoutes, PublicRoute } from "./Routes";
import Products from "./pages/Products/Products";
import { Employees } from "./pages/Employees";
import { Profile } from "./pages/Profile";
import { COnfigurations } from "./pages/Config";

function App() {
  const Auth = useContext(AuthApi);
  const [auth, setAuth] = useState(Auth);
  
  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route
            path="/"
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
            path="/Produtos"
            element={
              <ProtectRoutes>
                <Products />
              </ProtectRoutes>
            }
          ></Route>
          <Route
            path="/Funcionarios"
            element={
              <ProtectRoutes>
                <Employees />
              </ProtectRoutes>
            }
          ></Route>
          <Route
            path="/Perfil"
            element={
              <ProtectRoutes>
                <Profile />
              </ProtectRoutes>
            }
          ></Route>
          <Route
            path="/Configuracoes"
            element={
              <ProtectRoutes>
                <COnfigurations />
              </ProtectRoutes>
            }
          ></Route>
        </Routes>
      </Router>
    </AuthApi.Provider>
  );
}

export default App;
