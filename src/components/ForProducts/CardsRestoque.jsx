import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { CardMedia, Grid, IconButton, useMediaQuery } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useTheme } from "@material-ui/core/styles";
import { Enums } from "../../enums";

const useStyles = makeStyles({
  root: {
    width: 'auto',
    margin: "10px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  }
});

export default function Cards(props) {
  const theme = useTheme();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [products, setProducts] = useState(props.ProductsPerPage);

  function category(category) {
    switch (category) {
      case Enums.category.pelicula:
        category = "Película";
        break;
      case Enums.category.capinha:
        category = "Capinha";
        break;
      case Enums.category.carregador:
        category = "Carregador";
        break;
      case Enums.category.cabo:
        category = "Cabo";
        break;
      case Enums.category.fonte:
        category = "Fonte";
        break;
      case Enums.category.caixadesom:
        category = "Caixa de som";
        break;
      case Enums.category.fonedeouvido:
        category = "Fone de ouvido";
        break;
      case Enums.category.suporteparacelular:
        category = "Suporte para celular";
        break;
      case Enums.category.mouse:
        category = "Mouse";
        break;
      case Enums.category.teclado:
        category = "Teclado";
        break;
      case Enums.category.relogio:
        category = "Relógio";
        break;
      case Enums.category.adaptador:
        category = "Adaptador";
        break;
      case Enums.category.outros:
        category = "Outros";
        break;
  
      default:
        break;
    }
  
    return category;
  }
  

  useEffect(() => {
    setProducts(props.ProductsPerPage);
  }, [props.ProductsPerPage]);

  const productsFiltrados = products?.filter(function (e) {
    if(props.searchValue == ""){
      return e.name
    }
    return e.name.toLowerCase().includes(props.searchValue.toLowerCase());
  });

  return (
    <>
      {productsFiltrados?.map((item) => (
        <Grid item xs={fullScreen ? 12 : 3} md={3} key={item.id}>
          <Card className={classes.root} variant="outlined" >
            <CardContent>
              <CardMedia
                className={classes.media}
                image={item.image}
                title={item.name}
              />
              <Grid style={{ padding: "10px" }}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.name}
                </Typography>
              </Grid>
              <Typography variant="h5" component="h2">
                {category(item.category)}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                R$ {parseFloat(item.price).toFixed(2)}
              </Typography>
              <Typography variant="body2" component="p">
                {item.quantity} caixas
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() =>
                  props.handleOpenEdit(
                    item.id,
                    item.name,
                    item.category,
                    item.image,
                    item.price,
                    item.quantity,
                    item.warranty,
                    item.margin,
                    item.description
                  )
                }
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => props.handleOpenDelete(item.id)}
                style={{ backgroundColor: "#C50101" }}
              >
                <DeleteIcon />
              </Button>
              <IconButton
                className={classes.expand}
                color="primary"
                aria-label="add to shopping cart"
                style={{ marginLeft: "auto" }}
                onClick={() =>
                  props.handleBuyProduct(
                    item.id,
                    item.name,
                    item.quantity,
                    item.price,
                    item.image,
                    item.warranty,
                    item.description
                  )
                }
              >
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}
