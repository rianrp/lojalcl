import React, { useContext, useState } from "react";
import logo from "../../images/logoteste2.jpeg";
import api from "../../Api";
import { repositoryUser } from "../../Repositories/user";
import { Backdrop, Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography, useMediaQuery } from "@material-ui/core";
import AuthApi from "../../Routes/AuthApi";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SnackbarsMessage from "../../components/AllPages/SnackbarMessage";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      LCL Celulares{" "}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  }
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
  const navigate = useNavigate()
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
        localStorage.setItem('usuario', JSON.stringify(response.data.data));
      }
      navigate('/Dashboard')
      setMessage("Bem vindo De volta!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setMessage("Senha ou usuarios incorretos!");
      setSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div style={{ backgroundColor: "#fefefe" }}>

      <Container>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <SnackbarsMessage
          {...{ message, SnackbarOpen, setSnackbarOpen, severity }}
        />
        <div className={classes.paper}>
          <div
            style={{
              textAlign: "center"
            }}
          >
            <img src={logo} width="200px" style={{ float: "center" }}></img>
          </div>
          <Typography component="h1" variant="h5">
            Bem vindo de volta!
          </Typography>
          <Grid style={{ textAlign: "left" }}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email ou Usuário"
              name="email"
              autoComplete="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha "
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#142df5" }}
              onClick={login}
            >
              Sign In
            </Button>
          </Grid>
        </div>
        <Box mt={10} style={{ padding: "20px" }}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Login;
