import React, { useState } from "react";
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
  CircularProgress,
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
import { Enums } from "../../../enums";
import USelect from "../../../components/uselect";
import FormattedInputs from "../../../components/HelpComponents/unumberformat";
import UploadButton from "../../../components/HelpComponents/uploadimages";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from "@material-ui/icons/Close";

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
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

export default function ModalAddProducts(props) {
  const theme = useTheme();
  const [valuePrice, setValuePrice] = useState();
  const [valueInvest, setValueInvest] = useState();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [errors, setErrors] = useState(
    { name: false },
    { price: false },
    { margin: false },
    { image: false },
    { quantity: false },
    { description: false }
  )
 
  const categories = [
    {
      value: Enums.category.celular,
      label: "Celular",
    },
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
  ];
  
  const meses = [
    {
      value: Enums.warranty.tresmeses,
      label: "3 Meses"
    },
    {
      value: Enums.warranty.cincomeses,
      label: "5 Meses"
    },
    {
      value: Enums.warranty.umano,
      label: "1 Ano"
    },
    {
      value: Enums.warranty.doisanos,
      label: "2 Anos"
    },
  ]
  const classes = useStyles();

  const handleClose = () => {
    props.setOpenModal(false);
    setErrors(
      { name: false },
      { price: false },
      { margin: false },
      { image: false },
      { quantity: false },
      { description: false }
    )
  };

  const handleCheckIn = () => {
    const { name, description, price, margin } = props;
    const updatedErrors = {
      name: name.length < 6,
      description: description.length < 10,
      price: price == 0,
      margin: margin == 0
    };

    setErrors(updatedErrors);

    const hasErrors = Object.values(updatedErrors).some(value => value);
    if (!hasErrors) {
      props.handleClickSave();
    }
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

            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              float={"center"}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {fullScreen ? (
            <Grid container spacing={12}>
              <Grid
                item
                xs={fullScreen ? 12 : 6}
                style={{ paddingBottom: "10px" }}
              >
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <UploadButton label={"Add Image"} image={props.image} setImage={props.setImage} people={false} />
                  </Grid>
                </Grid>
                <TextField
                  id={errors.name ? "outlined-basic" : "outlined-error-helper-text"}
                  label="Nome do produto"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                  variant="outlined"
                  fullWidth={true}
                  error={errors.name}
                  helperText={errors.name ? "Nome deve ter no mínimo 6 caracteres." : ""}
                />
              </Grid>
              <Grid item xs={fullScreen ? 12 : 6} style={{ paddingBottom: "10px", marginBottom: "10px" }}>
                <USelect
                  {...{
                    itens: categories,
                    value: props.categoryProducts,
                    setValue: props.setCategoryProducts,
                    label: "Categoria ",
                  }}
                />
              </Grid>
              <Grid item xs={fullScreen ? 6 : 3}>
                <FormattedInputs label={"R$ Preço"} value={props.price} setValue={props.setPrice} Null={true} errors={errors.price} />
              </Grid>
              <Grid item xs={fullScreen ? 6 : 3} style={{ paddingLeft: "5px" }}>
                <FormattedInputs label={"R$ Investido"} value={props.margin} setValue={props.setMargin} Null={true} errors={errors.margin} />
              </Grid>
              <Grid item xs={fullScreen ? 12 : 2} style={{ marginTop: "20px" }}>
                <USelect
                  {...{
                    itens: meses,
                    value: props.warranty,
                    setValue: props.setWarranty,
                    label: "Garantia",
                  }}
                />
              </Grid>
              <Grid container item xs={fullScreen ? 12 : 3} style={{ marginTop: "20px" }}>
                <Grid item xs={7}>
                  <TextField
                    id="outlined-basic"
                    label="Quantidade"
                    value={props.quantity}
                    onChange={(e) => props.setQuantity(e.target.value)}
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={3}>
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
              <Grid container item xs={12} style={{ marginTop: "20px" }}>
                <Grid item xs={12} style={{ width: "auto", display: "flex" }}>
                  <TextField
                    id={errors.description ? "outlined-multiline-static" : "outlined-error-helper-text"}
                    label="Descrição"
                    multiline
                    rows={6}
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                    variant="outlined"
                    fullWidth={true}
                    error={errors.description}
                    helperText={errors.description ? "Deve ter no mínimo 10 caracteres." : ""}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={12} style={{ paddingTop: "20px" }}>
              {/* localizador desk */}
              <Grid
                item
                xs={6}
                style={{ paddingBottom: "10px" }}
              >
                <TextField
                  id={errors.name ? "outlined-basic" : "outlined-error-helper-text"}
                  label="Nome do produto"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                  variant="outlined"
                  fullWidth={true}
                  error={errors.name}
                  helperText={errors.name ? "Nome não pode conter menos que 6 caracteres" : ""}
                />
              </Grid>
              <Grid item xs={6} style={{ paddingBottom: "10px", marginBottom: "10px", paddingLeft: "5px" }}>
                <USelect
                  {...{
                    itens: categories,
                    value: props.categoryProducts,
                    setValue: props.setCategoryProducts,
                    label: "Categoria ",
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <FormattedInputs label={"R$ Preço"} value={props.price} setValue={props.setPrice} Null={true} errors={errors.price} />
              </Grid>
              <Grid item xs={3} style={{ paddingLeft: "5px" }}>
                <FormattedInputs label={"R$ Investido"} value={props.margin} setValue={props.setMargin} Null={true} errors={errors.margin} />
              </Grid>
              <Grid item xs={2} style={{ paddingLeft: "5px" }}>
                <USelect
                  {...{
                    itens: meses,
                    value: props.warranty,
                    setValue: props.setWarranty,
                    label: "Garantia",
                  }}
                />
              </Grid>
              <Grid item xs={2} style={{ paddingLeft: "5px" }}>
                <TextField
                  id={errors.quantity ? "outlined-basic" : "outlined-error-helper-text"}
                  label="Quantidade"
                  value={props.quantity}
                  onChange={(e) => props.setQuantity(e.target.value)}
                  variant="outlined"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={2}>
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
              <Grid container item xs={6} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <UploadButton label={"Add Image"} image={props.image} setImage={props.setImage} people={false} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={6} style={{ marginTop: "50px" }}>
                <Grid item xs={12} style={{ width: "auto" }}>
                  <TextField
                    id={errors.description ? "outlined-multiline-static" : "outlined-error-helper-text"}
                    label="Descrição"
                    multiline
                    rows={6}
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                    variant="outlined"
                    fullWidth={true}
                    error={errors.description}
                    helperText={errors.description ?
                      "A descrição deve conter pelo menos 10 caracteres." : ""}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleCheckIn()} disable={props.loading ? true : false}
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
