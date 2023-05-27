import { alpha, Backdrop, Button, CircularProgress, Grid, IconButton, InputBase, makeStyles, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { MenuDrawer } from "../../components/ForMenu/Drawer"
import SnackbarsMessage from "../../components/AllPages/SnackbarMessage";
import { EmployeesRepository } from "../../Repositories/employees";
import EnhancedTable from "./table";
import SearchIcon from '@material-ui/icons/Search';
import ModalAddEmployees from "./ModalAddEmployees";
import UserListToolbar from "./SearchComp";
import AddIcon from '@material-ui/icons/Add';
import { shopeeProducts } from "../../Repositories/shopeeProducts";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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



export const Employees = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [SnackbarOpen, setSnackbarOpen] = useState();
    const [severity, setSeverity] = useState();
    const [employees, setEmployees] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cargo, setCargo] = useState([]);
    const [image, setImage] = useState();
    const [openModal, setOpenModal] = useState();
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');

    const allEmployees = async () => {
        try {
            setLoading(true)

            let response = await EmployeesRepository.getAll();
            setEmployees(response.data.data)

        } catch {
            setMessage("Ocorreu um erro no sistema!");
            setSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false)
        }
    }

    const clear = () => {
        setName("");
        setEmail("");
        setImage("");
        setCargo("");
        setPassword("");
    }

    const handleClickCreate = async () => {
        if (password.length < 6) {
            setMessage("A senha deve conter no mínimo 6 caracteres!");
            setSeverity("error");
            setSnackbarOpen(true);
            return;
        }
        try {
            setLoading(true)
            let data = {
                name: name,
                email: email,
                password: password,
                cargo: cargo,
                image: image == null ? "https://ibb.co/0t73h6D" : image
            }
            await EmployeesRepository.post(data);
            clear()
            setMessage("Funcionario criado com sucesso de boas vindas!");
            setSeverity("success");
            setOpenModal(false)
            setSnackbarOpen(true);
            allEmployees();
        } catch {
            setMessage("Ocorreu um erro no sistema!");
            setSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false)
        }
    }

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const employeesFiltrados = employees?.filter(function (e) {
        return e.name.includes(filterName);
    });

    useEffect(() => {
        allEmployees();
    }, [])

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

                <ModalAddEmployees {...{ openModal, setOpenModal, name, setName, email, setEmail, password, setPassword, cargo, setCargo, image, setImage, handleClickCreate, loading }} />
                {/* <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Funcionários
                </Typography> */}
                <Grid item xs={12} container>
                    <Grid xs={12}>
                        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                    </Grid>
                </Grid>
                <Grid style={{ padding: "13px" }}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            className={classes.button}
                            startIcon={<PersonAddIcon />}
                            onClick={() => setOpenModal(true)}
                        >
                            Funcionário
                        </Button>
                    </Grid>
                    <EnhancedTable {...{ employeesFiltrados }} />
                </Grid>
            </main>
        </div>
    )
}