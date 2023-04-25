import {
  alpha,
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { MenuDrawer } from "../../components/ForMenu/Drawer";
import SnackbarsMessage from "../../components/AllPages/SnackbarMessage";

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
    color: "#fff",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState();
  const [severity, setSeverity] = useState();
  const user = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className={classes.root}>
      <MenuDrawer />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <main className={classes.content}>
        <SnackbarsMessage
          {...{ message, SnackbarOpen, setSnackbarOpen, severity }}
        />
        <div className={classes.appBarSpacer} />
        <Grid style={{ padding: "30px" }}>
          <Grid
            container
            item
            xs={12}
            style={{
              backgroundColor: "#F7F7F7",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              borderRadius: "10px",
            }}
          >
            <Grid container item xs={12} style={{ padding: "20px" }}>
              <Grid>
                <Avatar src={user?.usuario?.image} className={classes.large}></Avatar>
              </Grid>
              <h1 style={{ fontFamily: "sans-serif", textAlign: "left", padding: "6px" }}><p style={{ fontSize: "20px" }}>{user?.usuario?.name}</p><p style={{ fontSize: "12px", color: "#575757" }}>Emprendedor</p></h1>
            </Grid>
            <Grid item xs={6} style={{ padding: "20px" }}>
              <Typography style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontWeight: "Bold", fontSize: "1rem", textTransform: "capitalize", letterSpacing: "0.0075em" }}>Configurações da plataforma</Typography>
            </Grid>
            <Grid item xs={6} style={{ padding: "20px" }}>
              <Typography style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontWeight: "Bold", fontSize: "1rem", textTransform: "capitalize", letterSpacing: "0.0075em" }}>Informações do perfil</Typography>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
