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
  CircularProgress,
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

export default function ModalEditProducts(props) {
  const theme = useTheme();
  const [image, setImage] = useState();
  const [valuePrice, setValuePrice] = useState(props.priceEdit);

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
    props.setPriceEdit(event.target.value);
  };

  const upload = (arquivo) => {
    const imagemUpload = arquivo.target.files;
    if (imagemUpload.lenght <= 0) return;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage(fileReader.result);
      props.setImage(fileReader.result);
    };
    fileReader.readAsDataURL(imagemUpload[0]);
  };

  const uploadImagem = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.type = "file";
    input.onchange = upload;
    input.accept = "image/png, image/jpeg";
    input.click();
    return;
  };

  const handleClose = () => {
    props.setOpenEdit(false);
    setValuePrice("")
  };

  useEffect(() => {
    setValuePrice(props.priceEdit);
  }, [props.priceEdit]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openEdit}
        onClose={handleClose}
        fullWidth={"md"}
        maxWidth={"md"}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Adicionando um novo produto"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={12}>
            <Grid
              item
              xs={7}
              style={{ paddingBottom: "10px", paddingRight: "10px" }}
            >
              <TextField
                id="outlined-basic"
                label="Nome do produto"
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={5} style={{ paddingBottom: "10px" }}>
              <USelect
                {...{
                  itens: categories,
                  value: props.categoryProducts,
                  setValue: props.setCategoryProducts,
                  label: "Categoria ",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormattedInputs {...{ valuePrice, handleChange }} />
            </Grid>
            <Grid item xs={4}>
              <UploadButton {...{ upload, uploadImagem }} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Quantidade"
                value={props.quantity}
                onChange={(e) => props.setQuantity(e.target.value)}
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={props.handleClickSaveEdit}
            disable={props.loading ? true : false}
            color="primary"
            autoFocus
          >
            {props.loading ? <CircularProgress /> : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
