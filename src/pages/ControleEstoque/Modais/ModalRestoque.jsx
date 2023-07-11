import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { AppBar, ButtonGroup, CircularProgress, DialogActions, DialogContent, Grid, TextField, Toolbar, useMediaQuery } from '@material-ui/core';
import FormattedInputs from '../../../components/HelpComponents/unumberformat';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }, selectEmpty: {
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
}));

export default function ModalRestoque(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.openRestoque}
            onClose={() => props.setOpenRestoque(false)}
            maxWidth={"lg"}
            aria-labelledby="responsive-dialog-title"
        >
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.title}>
                    <Typography variant="h6" className={classes.title}>
                        {props.restoqueSelected.name}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => props.setOpenRestoque(false)}
                        aria-label="close"
                        float={"center"}
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Grid container item xs={12} style={{marginTop: "15px"}}>
                    <Grid item xs={fullScreen?12:6} style={{ textAlign: "center" }}>
                        <img src={props.restoqueSelected.image?props.restoqueSelected.image:"https://i.ibb.co/Tv4vp29/pacote.png"} width={250}></img>
                    </Grid>
                    <Grid item xs={fullScreen?12:6}>
                        <Grid container item xs={12} style={{ marginTop: "20px" }}>
                            <Grid item xs={fullScreen?7:8}>
                                <TextField
                                    id="outlined-basic"
                                    label="Quantidade"
                                    value={props.quantity}
                                    onChange={(e) => props.setQuantity(e.target.value)}
                                    variant="outlined"
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={fullScreen?2:3}>
                                <ButtonGroup style={{ height: "56px" }}>
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => {
                                            props.setQuantity(Math.max(props.quantity - 1, 1));
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        aria-label="increase"
                                        onClick={() => {
                                            props.setQuantity(props.quantity + 1);
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "15px" }}>
                            <FormattedInputs label={"Preço"} value={props.price} setValue={props.setPrice} null={true} />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "15px" }}>
                            <FormattedInputs label={"Investido"} value={props.margin} setValue={props.setMargin} null={true} />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => props.setOpenRestoque(false)} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => props.handleClickSaveRestoque()} disable={props.loading ? true : false}
                    color="primary"
                    autoFocus
                    variant="contained"
                >
                    {props.loading ? <CircularProgress /> : "Salvar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
