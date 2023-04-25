import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Enums } from "../../components/enums";
import USelect from "../../components/uselect";
import FormattedInputs from "../../components/HelpComponents/unumberformat";
import UploadButton from "../../components/HelpComponents/uploadimages";
import CloseIcon from "@material-ui/icons/Close";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextoLimitado from "../../components/HelpComponents/textoLimitado";

const useStyles = makeStyles((theme) => ({
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

export default function ModalBuyProducts(props) {
  const theme = useTheme();
  const [image, setImage] = useState();
  const [valuePrice, setValuePrice] = useState(props.priceBuy);
  const [quantity, setQuantity] = useState(1);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const item = {
    id: props.id,
    name: props.name,
    quantity: quantity,
    image: props.image,
    price: valuePrice * quantity,
  };
  const categories = [
    {
      value: Enums.category.celular,
      label: "Celular",
    },
    {
      value: Enums.category.notebook,
      label: "Notebook",
    },
    {
      value: Enums.category.fone,
      label: "Fone",
    },
    {
      value: Enums.category.teclado,
      label: "Teclado",
    },
    {
      value: Enums.category.monitor,
      label: "Monitor",
    },
    {
      value: Enums.category.outros,
      label: "Outros",
    },
  ];


  const classes = useStyles();

  const handleChange = (event) => {
    setValuePrice(event.target.value);
  };

  const handleClose = () => {
    props.setOpenBuy(false);
    props.handleAddCar(item);
    props.setOpenCart(true)
  };

  function mostrarMais() {
    // Seleciona o elemento de texto
    var texto = document.querySelector("p");

    // Verifica se o texto já foi expandido
    if (texto.style.maxHeight) {
      // Se sim, esconde o restante do texto
      texto.style.maxHeight = null;
    } else {
      // Se não, expande o texto
      texto.style.maxHeight = texto.scrollHeight + "px";
    }
  }

  useEffect(() => {
    setValuePrice(props.priceBuy);
  }, [props.priceBuy]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openBuy}
        onClose={() => props.setOpenBuy(false)}
        fullWidth={"xs"}
        maxWidth={"xs"}
        aria-labelledby="responsive-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.title}>
            <Typography variant="h6" className={classes.title}>

            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => props.setOpenBuy(false)}
              aria-label="close"
              float={"center"}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ padding: "8px" }}>
          <Grid container xs={12} style={{ textAlign: "center", margin: 0 }}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <img
                src={props.image}
                style={{ maxWidth: "300px", borderRadius: "20px", textAlign: "center" }}
              ></img>
            </Grid>
            <Grid style={{ marginTop: "20px" }}>
              {props.quantity > 5?(
                <Grid>
                  <Typography style={{ backgroundColor: "#40EB297A", borderRadius: "6px", paddingLeft: "8px", paddingRight: "8px", color: "#2D7418", fontFamily: "sans-serif", fontWeight: "bold" }}>ESTOQUE EM ALTA</Typography>
                </Grid>
              ):(
              <Grid>
                <Typography style={{ backgroundColor: "#EB29297A", borderRadius: "6px", paddingLeft: "8px", paddingRight: "8px", color: "#741818", fontFamily: "sans-serif", fontWeight: "bold" }}>ESTOQUE EM FALTA</Typography>
              </Grid>
              )}
            </Grid>
            <Grid container item xs={12} style={{ textAlign: "left", marginTop: "20px" }}>
              <Grid itme xs={12}>
                <Typography style={{ borderRadius: "6px", paddingLeft: "8px", paddingRight: "8px", color: "#741818", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "12px" }}>VENDA</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginLeft: "6px", fontSize: "1.125rem", fontWeight: "700", fontFamily: "sans-serif" }}>{props.name}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
              <hr style={{ width: "auto", borderTop: "1px dashed #8F8F8F" }}></hr>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={5} style={{ textAlign: "center", flexDirection: "column", justifyContent: "center", display: "flex" }}>
                <Typography>
                  Quantidade:
                </Typography>
              </Grid>
              <Grid item xs={7} style={{ textAlign: "right" }}>
                <ButtonGroup style={{ height: "56px" }}>
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      setQuantity(Math.max(quantity - 1, 1));
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <TextField
                    id="outlined-basic"
                    value={quantity<props.quantity?quantity:props.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    variant="outlined"
                    style={{ width: "40px" }}
                  />
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <Typography style={{ color: "#929292" }}>Disponível: {props.quantity}</Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "left", padding: "8px" }}>
                <Typography style={{ fontSize: "1.125rem", fontWeight: "500", fontFamily: "sans-serif" }}>Descrição</Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "left", padding: "8px" }}>
                <TextoLimitado texto={"Um produto Pode ser um bem físico, como um carro, um telefone celular ou um livro, ou um serviço, como uma aula de yoga, um corte de cabelo ou uma consulta médica."} limite={100} />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
              <hr style={{ width: "auto", borderTop: "1px dashed #8F8F8F" }}></hr>
            </Grid>
            <Grid item xs={12} container style={{ textAlign: "center" }}>
              <Grid xs={4}>
                <Typography style={{ fontSize: "20px" }}>R$ {parseFloat(props.priceBuy).toFixed(2)}</Typography>
                <Typography style={{ fontSize: "10px", color: "#929292" }}>{props.warranty == 0 ? "Nenhum garantia" : "Garantia de " + props.warranty} Meses</Typography>
              </Grid>
              <Grid xs={4}>
                <Button
                  onClick={() => props.handleAddCar(item)}
                  color="primary"
                  autoFocus
                  startIcon={<AddShoppingCartIcon />}
                  style={{ width: "auto" }}
                >
                  Carrinho
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button style={{ width: "auto" }} variant="contained" color="primary" autoFocus onClick={() => handleClose()}>
                  Vender
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
