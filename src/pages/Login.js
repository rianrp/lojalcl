import React, { useContext, useState } from "react";
import logo from "../images/logoteste2.png";
import api from "../Api";
import { repositoryUser } from "../Repositories/user";
import { Backdrop, CircularProgress, Typography, useMediaQuery } from "@material-ui/core";
import AuthApi from "../Routes/AuthApi";
import { Navigate, Outlet } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import SnackbarsMessage from "../components/SnackbarMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Login = (props) => {
  const classes = useStyles();
  const Auth = useContext(AuthApi);
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasaccount] = useState(false);
  const [message, setMessage] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState();
  const [severity, setSeverity] = useState();
  const [name, setName] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const login = async () => {
    let userAdmin = {
      login: email,
      password: password,
    };
    try {
      setLoading(true)
      const response = await repositoryUser.post(userAdmin);
      if (response) {
        Auth.setAuth(true);
        Cookies.set("user", "loginTrue");
      }
      setMessage("Bem vindo De volta!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setMessage("Senha ou usuarios incorretos!");
      setSeverity("error");
      setSnackbarOpen(true);
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
    <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <SnackbarsMessage
          {...{ message, SnackbarOpen, setSnackbarOpen, severity }}
        />
      <section className="login" style={{position: "absolute"}}>
        
        <div className={fullScreen ? "loginContainerMobile" : "loginContainer"}>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <img src={logo} width="200px" style={{ float: "center" }}></img>
          </div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <Typography style={{ color: "white" }}>
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
