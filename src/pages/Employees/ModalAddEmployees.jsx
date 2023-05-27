import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from 'clsx';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    AppBar,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Toolbar,
    Typography,
} from "@material-ui/core";
import USelect from "../../components/uselect";
import FormattedInputs from "../../components/HelpComponents/unumberformat";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import UploadButton from "../../components/HelpComponents/uploadimages";
import addfotouser from "../../images/adicionar-usuario.png"
import CloseIcon from "@material-ui/icons/Close";
import { Enums } from "../../enums";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    toolbar: {
        minHeight: 128,
        alignItems: "flex-start",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
}));

export default function ModalAddEmployees(props) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const categories = [
        {
            value: Enums.cargo.Employee,
            label: "Funcionário",
        },
        {
            value: Enums.cargo.Manager,
            label: "Gerente",
        },
        {
            value: Enums.cargo.visit,
            label: "Visitante",
        }
    ];
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleChange = (event) => {
        props.setPassword(event.target.value);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        props.setOpenModal(false);
    };


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.openModal}
                onClose={handleClose}
                fullWidth={"md"}
                maxWidth={"md"}
                aria-labelledby="responsive-dialog-title"
            >
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.title}>
                        <Typography variant="h6" className={classes.title}>
                            Adicionando um novo funcionário
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => props.setOpenModal(false)}
                            aria-label="close"
                            float={"center"}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container spacing={12}>
                        <Grid item
                            xs={12} style={{ textAlign: "center" }}>
                            <Button>
                                <UploadButton image={props.image} setImage={props.setImage} people={true} />
                            </Button>
                            <Typography>Foto do funcionario</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Nome"
                                value={props.name}
                                onChange={(e) => props.setName(e.target.value)}
                                variant="outlined"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                value={props.email}
                                onChange={(e) => props.setEmail(e.target.value)}
                                id="outlined-full-width"
                                margin="normal"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" style={{ margin: "0px", width: "95%" }}>
                                <InputLabel fullWidth style={{ width: "100%" }} htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    showPassword="Senha"
                                    type={showPassword ? 'text' : 'password'}
                                    value={props.password}
                                    onChange={(e) => handleChange(e)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={"auto"}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} style={{ paddingBottom: "10px" }}>
                            <USelect
                                {...{
                                    itens: categories,
                                    value: props.cargo,
                                    setValue: props.setCargo,
                                    label: "Cargo ",
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={props.handleClickCreate} disable={props.loading ? true : false}
                        color="primary"
                        autoFocus
                        variant="contained"
                    >
                        {props.loading ? <CircularProgress /> : "Salvar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
