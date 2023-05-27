import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '15px',
  },
  avatar: {
    marginRight: '15px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#999',
  },
}));

const SoldItem = ({ product, date }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <img src="" alt={"product.name"} />
      </Avatar>
      <div>
        <Typography className={classes.title}>
          {"product.name"}
        </Typography>
        <Typography className={classes.subtitle}>
          Vendido em {"date"}
        </Typography>
      </div>
    </div>
  );
};

export default SoldItem;
