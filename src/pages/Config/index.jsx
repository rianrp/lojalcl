import { AppBar, Avatar, Checkbox, FormControlLabel, Grid, IconButton, TextField, Toolbar, Typography, alpha, makeStyles, withStyles } from "@material-ui/core"
import React, { useState } from "react"
import { MenuDrawer } from "../../components/ForMenu/Drawer"
import FullWidthTabs from "./Config";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    }, text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
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
    }, search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const COnfigurations = () => {
    const classes = useStyles();
    const [name, setName] = useState();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });
    const user = JSON.parse(localStorage.getItem("usuario"));

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <MenuDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Grid container item xs={12}>
                    <Grid item xs={12} style={{ margin: "20px" }}>
                        <Typography style={{ fontSize: "28px", fontWeight: "500" }}>Configurações</Typography>
                    </Grid>
                    <Grid container item xs={12} style={{ margin: "28px" }}>
                        <Grid item xs={7}>
                            <Grid item xs={12}>
                                <Typography style={{ fontFamily: "sans-serif", fontSize: "20px" }}>Notificações</Typography>
                                <hr style={{
                                    border: 'none',
                                    borderTop: '1px solid gray',
                                    marginTop: "8px",
                                    width: "80%"
                                }} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedB}
                                            onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Receber notificações"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedA}
                                            onChange={handleChange}
                                            name="checkedA"
                                            color="primary"
                                        />
                                    }
                                    label="Notificações via Email"
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} style={{ textAlign: "center" }}>
                            <Grid item xs={12} style={{ textAlign: "left" }}>
                                <Typography style={{ fontFamily: "sans-serif", fontSize: "20px" }}>Perfil</Typography>
                                <hr style={{
                                    border: 'none',
                                    borderTop: '1px solid gray',
                                    marginTop: "8px",
                                    width: "80%"
                                }} />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "15px" }}>
                                <div style={{ position: "relative" }}>
                                    <img src={user.usuario.image} style={{ width: "160px", height: "160px", borderRadius: "50%", }} />
                                    <div style={{
                                        position: "absolute",
                                        top: "49%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        color: "#555",
                                        padding: "0px",
                                        borderRadius: "50%",
                                        width: "160px", height: "160px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}>
                                        <Typography style={{ margin: 0, color: "#888" }}>Alterar foto</Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ margin: "10px" }}>
                                <TextField
                                    id="outlined-basic"
                                    label="Nome"
                                    value={user.usuario.name}
                                    onChange={(e) => setName(e.target.value)}
                                    variant="outlined"
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ margin: "10px" }}>
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    value={user.usuario.email}
                                    onChange={(e) => setName(e.target.value)}
                                    variant="outlined"
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}