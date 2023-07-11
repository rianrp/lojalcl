import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppBar, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Toolbar, Typography, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { Enums } from '../../../enums';
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }, formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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

export default function ModalFiltroProduct(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [value, setValue] = React.useState('female');
    const classes = useStyles();

    const categories = [

        {
            value: Enums.category.pelicula,
            label: "Película",
        },
        {
            value: Enums.category.capinha,
            label: "Capinha",
        },
        {
            value: Enums.category.carregador,
            label: "Carregador",
        },
        {
            value: Enums.category.cabo,
            label: "Cabo",
        },
        {
            value: Enums.category.fonte,
            label: "Fonte",
        },
        {
            value: Enums.category.caixadesom,
            label: "Caixa de som",
        },
        {
            value: Enums.category.fonedeouvido,
            label: "Fone de ouvido",
        },
        {
            value: Enums.category.suporteparacelular,
            label: "Suporte para celular",
        },
        {
            value: Enums.category.mouse,
            label: "Mouse",
        },
        {
            value: Enums.category.teclado,
            label: "Teclado",
        },
        {
            value: Enums.category.relogio,
            label: "Relógio",
        },
        {
            value: Enums.category.adaptador,
            label: "Adaptador",
        },
        {
            value: Enums.category.outros,
            label: "Outros",
        },
        {
            value: Enums.category.celular,
            label: "Celular",
        }
    ];

    const handleChange = (event) => {
        props.setOpenFiltro(false)
        props.setFiltroSelected(parseInt(event.target.value));
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={props.openFiltro}
                onClose={() => props.setOpenFiltro(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.title}>
                        <Typography variant="h6" className={classes.title}>
                            Filtros
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => props.setOpenFiltro(false)}
                            aria-label="close"
                            float={"center"}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <FormControl component="fieldset" style={{marginTop: "15px"}}>
                        <FormLabel component="legend">Filtrar por</FormLabel>
                        <RadioGroup aria-label="category" name="category" value={props.filtroSelected} onChange={handleChange}>
                            <FormControlLabel
                                value={0}
                                control={<Radio />}
                                label={"Todos"}
                            />
                            {categories.map((category) => (
                                <FormControlLabel
                                    key={category.value}
                                    value={category.value}
                                    control={<Radio />}
                                    label={category.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </div>
    );
}