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
import { Enums } from "./enums";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
      case Enums.category.celular:
        category = "Celular";
        break;
      case Enums.category.notebook:
        category = "Notebook";
        break;
      case Enums.category.monitor:
        category = "Monitor";
        break;
      case Enums.category.fone:
        category = "Fone";
        break;
      case Enums.category.teclado:
        category = "teclado";
        break;
      case Enums.category.outros:
        category = "outros";
        break;

      default:
        break;
    }

    return category;
  }

  useEffect(() => {
    setProducts(props.ProductsPerPage);
  }, [props.ProductsPerPage]);

  return (
    <>
      {products?.map((item) => (
        <Grid item xs={fullScreen ? 12 : 2} style={{marginRight: 80}}>
          <Card className={classes.root} variant="outlined" key={item.id}>
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
                $ {parseFloat(item.price).toFixed(2)}
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
                    item.quantity
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
              >
                <DeleteIcon />
              </Button>
              <IconButton
                className={classes.expand}
                color="primary"
                aria-label="add to shopping cart"
                style={{ marginLeft: "auto"}}
                onClick={() =>
                  props.handleBuyProduct(
                    item.id,
                    item.name,
                    item.quantity,
                    item.price
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
