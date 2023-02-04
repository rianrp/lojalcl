import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { Button, ListItem } from "@material-ui/core";
import ExportExcel from "./uexcelexport";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  const [deposits, setDeposits] = useState(0);
  const [value, setValue] = useState(props.sallers);
  const [colunasExcel, setColunasExcel] = useState();
  const [rowsExcel, setRowsExcel] = useState();
  const [date, setDate] = useState(
    new Date().getFullYear() +
      "/" +
      new Date().getMonth() +
      1 +
      "/" +
      new Date().getDate()
  );
  let deposit = 0;

  const DepositSaller = () => {
    let deposit = 0;

    if (value) {
      props.sallers.forEach((item) => (deposit += item.total));
    } else {
      setDeposits(0);
    }

    setDeposits(deposit);
  };

  useEffect(() => {
    setValue(props.sallers)
  }, [props.sallers])

  return (
    <React.Fragment>
      <Title>Depositos recentes</Title>
      <Typography component="p" variant="h4">
        {props.sallers?.forEach((item) => (deposit += item.total))}${" "}
        {parseFloat(deposit).toFixed(2)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {date}
      </Typography>
      <div>
        <ExportExcel {...{value}} />
      </div>
    </React.Fragment>
  );
}
