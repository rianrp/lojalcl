import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    borderRadius: 10,
    border: '1px solid #ddd',
    maxWidth: 350,
    width: "auto",
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '100%', // 1:1
    borderRadius: '50%',
    backgroundSize: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: '10px 0 5px',
  },
  subtitle: {
    fontSize: 12,
    color: '#777',
    margin: '5px 0 10px',
  },
});

export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={"Ultimo vendido"}
      />
      <CardMedia
        className={classes.media}
        image={props.relatorio?.item.image}
      />
      <CardContent>
        <Typography className={classes.title} variant="body1" component="p">
          {props.relatorio?.item.name}
        </Typography>
        <Typography className={classes.subtitle} variant="body2" component="p">
          "Vendido em": {props.relatorio?.item.data}
        </Typography>
      </CardContent>
    </Card>
  );
}
