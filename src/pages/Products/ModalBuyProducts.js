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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Enums } from "../../components/enums";
import USelect from "../../components/uselect";
import FormattedInputs from "../../components/unumberformat";
import UploadButton from "../../components/uploadimages";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ModalBuyProducts(props) {
  const theme = useTheme();
  const [image, setImage] = useState();
  const [valuePrice, setValuePrice] = useState(props.priceBuy);
  const [quantity, setQuantity] = useState(props.quantity);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
  };

  useEffect(() => {
    setValuePrice(props.priceBuy);
    if (quantity > props.quantity) {
      setValuePrice(props.priceBuy);
      setQuantity(props.quantity);
    }else{
        setValuePrice((quantity * props.priceBuy).toString())
    }
  }, [quantity]);

  useEffect(() => {
    setValuePrice(props.priceBuy);
    setQuantity(props.quantity);
  }, [props.priceBuy]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openBuy}
        onClose={handleClose}
        fullWidth={"xs"}
        maxWidth={"xs"}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Comprando um novo produto"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={12}>
            <Grid item xs={12} style={{ paddingBottom: "10px" }}>
              <TextField
                id="outlined-basic"
                label={"Compra do produto"}
                disabled
                value={props.name}
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Quantidade"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12}>
              <FormattedInputs {...{ valuePrice, handleChange }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => props.handleClickSaveBuy(valuePrice, quantity)} color="primary" autoFocus>
            Vendas
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
