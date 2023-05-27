import { alpha, Backdrop, Button, CircularProgress, Grid, IconButton, InputBase, makeStyles, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { useState } from "react";
import { MenuDrawer } from "../../components/ForMenu/Drawer"
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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        color: "#fff", // cor de fundo desejada
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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



export const InventoryControl = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [SnackbarOpen, setSnackbarOpen] = useState();
    const [severity, setSeverity] = useState();

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
                <h1>RESTOQUE</h1>
            </main>
        </div>
    )
}