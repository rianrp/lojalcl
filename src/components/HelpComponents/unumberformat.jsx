import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="R$ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs(props) {
  const classes = useStyles();
  const [value, setValue] = useState();

  const handleChange = (e) => {
    props.setValue(e.target.value)
  }

  console.log("dkkdkd", props.erros)

  return (
    <TextField
      label={props.label + (props.null ? (" R$" + props.value) : " ")}
      value={value}
      disabled={props.disable}
      onChange={(e) => handleChange(e)}
      name="numberformat"
      variant="outlined"
      id={props.errors ? "outlined-basic" : "outlined-error-helper-text"}
      fullWidth={true}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      error={props.errors}
      helperText={props.errors ? "Não pode ser vazio." : ""}
    />
  );
}
