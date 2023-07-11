import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Enums } from "../../../enums";
import USelect from "../../../components/uselect";
import FormattedInputs from "../../../components/HelpComponents/unumberformat";
import CloseIcon from "@material-ui/icons/Close";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  formControl: {
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

export default function ModalSellProducts(props) {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tax, setTax] = useState();
  const [creditSelected, setCreditSelected] = useState(1);
  const creditCard = []
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const paymentMethod = [
    {
      value: Enums.paymentMethod.dinheiro,
      label: "Dinheiro",
    },
    {
      value: Enums.paymentMethod.cartaodecredito,
      label: "Cartão de crédito",
    },
    {
      value: Enums.paymentMethod.cartaodedebito,
      label: "Cartão de débito",
    },
    {
      value: Enums.paymentMethod.pix,
      label: "Pix",
    },
    {
      value: Enums.paymentMethod.boletobancario,
      label: "Boleto",
    }
  ];

  for (let i = 1; i < 12; i++) {
    const parcela = props.values.total / i;
    const label = `${i}x de R$${parcela.toFixed(2)}`;
    const value = i;
    creditCard.push({ value, label });
  }

  function somarValores(value) {
    let soma = 0;
    for (let price of props.cartItem) {
      soma += price.price;
    }
    props.values.total = (soma + (tax == undefined ? 0 : Number(tax)) - (props.descont == undefined ? 0 : Number(props.descont))).toFixed(2)
    props.values.subtotal = soma.toFixed(2)
    return soma;
  }
  somarValores()

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...props.cartItem];
    newItems.splice(index, 1);
    props.setCartItems(newItems);
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openCart}
        onClose={() => props.setOpenCart(false)}
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="responsive-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.title}>
            <Typography variant="h6" className={classes.title}>

            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => props.setOpenCart(false)}
              aria-label="close"
              float={"center"}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid ontainer item xs={12} style={{
            boxShadow: "0px 0px 7px 1px rgba(226,226,226,1)",
            webkitBoxShadow: "0px 0px 7px 1px rgba(226,226,226,1)",
            mozBoxShadow: "0px 0px 7px 1px rgba(226,226,226,1)",
            margin: "10px 0px 10px 0px",
            padding: "20px"
          }}>
            {props.cartItem?.length == 0 ? (
              <h2>Adicione algum produto ao carrinho!</h2>
            ) : (
              props.cartItem.map((item, index) => (
                <>
                  <Grid item xs={12}>
                    <Typography style={{ color: "rgb(145, 158, 171)", fontWeight: "700", fontSize: "1.0625rem" }}>Detalhes:</Typography>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center", padding: "20px" }}>
                    <img
                      src={item.image}
                      width={fullScreen ? "80px" : "100px"}
                    ></img>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ paddingBottom: "10px" }}
                  >
                    <TextField
                      id="outlined-basic"
                      label={item.name}
                      disabled={true}
                      variant="outlined"
                      fullWidth={true}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label={item.quantity}
                      disabled={true}
                      variant="outlined"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "10px", textAlign: "center", marginTop: "20px" }}>
                    <Typography style={{fontSize: "20px"}}>R$ {item.price?.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "right" }} onClick={() => handleRemoveItem(index)}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      style={{ color: "#D13131", backgroundColor: "#FFFFFF00", boxShadow: "none" }}

                      startIcon={<RemoveShoppingCartIcon style={{ color: "#D13131" }} />}
                    >
                      Remover
                    </Button>
                  </Grid>
                  <hr style={{ width: "auto", borderTop: "1px dashed #8F8F8F", marginBottom: "10px", marginTop: "10px" }}></hr>
                </>
              ))
            )}
            {props.cartItem?.length == 0 ? (null) : (
              <Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Data"
                      format="dd/MM/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Descrição"
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <USelect
                    {...{
                      itens: paymentMethod,
                      value: props.payment,
                      setValue: props.setPayment,
                      label: "Metódo de pagamento ",
                    }}
                  />
                </Grid>
                {props.payment == 2 ? (
                  <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <USelect
                      {...{
                        itens: creditCard,
                        value: creditSelected,
                        setValue: setCreditSelected,
                        label: "",
                      }}
                    />
                  </Grid>
                ) : (null)}
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Desconto R$"
                    value={props.descont}
                    onChange={(e) => props.setDescont(e.target.value)}
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Taxa R$"
                    value={tax}
                    onChange={(e) => setTax(e.target.value)}
                    variant="outlined"
                    fullWidth={true}
                  />
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={9} style={{ marginTop: "20px", textAlign: "right" }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>Desconto: </Typography>
                    <Typography>Tax: </Typography>
                    <Typography style={{ fontWeight: "bold" }}>Preço total: </Typography>
                  </Grid>
                  <Grid item xs={3} style={{ marginTop: "20px", marginTop: "20px", textAlign: "right" }}>
                    <Typography>R$ {props.values.subtotal}</Typography>
                    <Typography>{props.descont == 0 || props.descont == undefined ? " - " : "R$ " + props.descont}</Typography>
                    <Typography>{tax == 0 || tax == undefined ? " - " : "R$ " + tax}</Typography>
                    <Typography style={{ fontWeight: "bold" }}>R$ {props.values.total}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid style={{ width: "auto", marginTop: "20px", marginBottom: "30px" }}>
            {props.cartItem?.length == 0 ? (null) : (
              <Button
                onClick={() => props.handleClickSaveBuy()}
                disable={props.loading ? true : false}
                color="primary"
                autoFocus
                variant="contained"
                fullWidth={true}
                style={{ backgroundColor: "#089c54" }}
              >
                {props.loading ? <CircularProgress /> : "Finalizar venda"}
              </Button>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
