import DateFnsUtils from '@date-io/date-fns';
import { createTheme, ThemeProvider, useMediaQuery, useTheme } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import frLocale from "date-fns/locale/pt-BR";
import React from 'react';
import LinesTextField from '../TextFieldModel';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#4054b4'
        },
        secondary: {
            main: '#ffffff'
        },
    },
})

export const UDatePicker = props => {
    const theme = useTheme();
    const responsive = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChangeData = xdate => {
        if (props.setDate) {
            props.setDate(xdate);
        }
        if (props.setValueArray) {
            let array = [...props.valueArray];
            array[props.index][props.tipoArray] = xdate;
            props.setValueArray(array);
        }
        if (props.eventOnChange) {
            props.eventOnChange({ target: { name: props.name, value: xdate } });
        }
        if (props.onChange) {
            props.onChange(props.name, xdate);
        }
        if (props.onChangeChild) {
            props.onChangeChild();
        }
    }

    return (
        <div>
            <ThemeProvider theme={Theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                    <KeyboardDatePicker
                        autoOk
                        InputProps={props.readOnly === undefined || props.readOnly === false ? null : { readOnly: 'true' }}
                        readOnly={props.readOnly === undefined || props.readOnly === false ? null : { readOnly: 'true' }}
                        initialFocusedDate={props.initialFocusedDate}
                        disablePast={props.disablePast || false}
                        minDate={props.minDate || new Date(1900, 0, 1)}
                        maxDate={props.minDate || new Date()}
                        minDateMessage={'A data não deve ser anterior à data mínima'}
                        required={props.required}
                        fullWidth
                        variant={responsive ? 'dialog' : 'inline'}
                        orientation="portrait"
                        cancelLabel="Cancelar"
                        inputVariant="outlined"
                        margin="dense"
                        invalidDateMessage="Formato de data inválido!"
                        name={props.name}
                        id="date-picker-dialog"
                        TextFieldComponent={LinesTextField}
                        label={props.label}
                        format="dd/MM/yyyy"
                        value={props.date || null}
                        onChange={handleChangeData}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </div>
    )
};

export default UDatePicker;