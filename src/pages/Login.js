import React, { useContext, useState } from "react";
import logo from "../images/smartphone.png";
import api from "../Api";
import { repositoryUser } from "../Repositories/user";
import { Typography } from "@material-ui/core";
import AuthApi from "../Routes/AuthApi";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = (props) => {
  const Auth = useContext(AuthApi);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasaccount] = useState(false);
  const [name, setName] = useState("");

  const login = async () => {
    let userAdmin = {
      login: email,
      password: password,
    };
    try {
    //   const response = await repositoryUser.post(userAdmin);
    //   if (response) {
        Auth.setAuth(true);
        Cookies.set("user", "loginTrue");
    //   }
    } catch (error) {
    }
  };

  return (
    <>
      <section className="login">
        <div className="loginContainer">
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <img src={logo} width="80px" style={{ float: "center" }}></img>
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <Typography style={{ color: "white", marginBottom: "10px" }}>
              Bem Vindo de volta!
            </Typography>
          </div>
          <label>Email</label>
          <input
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          <label>Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <p className="errorMsg">{passwordError}</p>
          <div className="btnContainer">
            <button
              className="button"
              style={{ color: "#414a7b" }}
              onClick={login}
            >
              Entrar
            </button>
            <p style={{ textAlign: "center" }}>Esqueceu a senha?</p>
          </div>
          <div className="termos">Termos de uso | Política de privacidade</div>
        </div>
      </section>
    </>
  );
};

export default Login;
