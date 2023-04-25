import { TextField, Typography, withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';

const ULinesTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            color: 'black',
            minWidth: 120
        },
        '& label': {
            color: 'inherited',
        },
        '& label.Mui-focused': {
            color: '#414a7b',
            minWidth: 120
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#414a7b',
            minWidth: 120
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'silver',
                minWidth: 120
            },
            '&:hover fieldset': {
                borderColor: 'silver',
                minWidth: 120
            },
            '&.Mui-focused fieldset': {
                borderColor: '#414a7b',
            },
        }
    }
})(TextField)

export const USelect = (props) => {

    const handleChange = (event) => {
        if (props.setValueArray) {
            let array = [...props.valueArray];
            array[props.index] = event.target.value;
            props.setValueArray(array);
        }
        if (props.setValue) {
            props.setValue(event.target.value);
        }
        if (props.onChange) {
            props.onChange(event);
        }
    }

    return (
        <div>
            {props.custom ? (
                <TextField
                    fullWidth
                    variant="outlined"
                    disabled={props.disabled}
                    label={props.label}
                    name={props.name}
                    className={props.className}
                    value={props.value}
                    onChange={e => handleChange(e)}
                    select
                >
                    {props.itens.map(item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                </TextField>
            ) : (
                <ULinesTextField
                    fullWidth
                    variant="outlined"
                    disabled={props.disabled}
                    label={props.label}
                    name={props.name}
                    className={props.className}
                    value={props.value}
                    onChange={e => handleChange(e)}
                    select
                    style={{ marginTop: '0px', marginBottom: '0px' }}
                >
                    
                    {props.itens.map(item => (
                        <MenuItem value={item.value}>
                            <Typography style={{ lineHeight: 1 }}>
                                {props.quantidadeBagagem ? (
                                    <>
                                        {props.quantidadeBagagem[item.value].quantidadeBagagem} | {" "}
                                    </>
                                ) : null}
                                {item.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </ULinesTextField>
            )}
        </div >
    )
};

export default USelect;
