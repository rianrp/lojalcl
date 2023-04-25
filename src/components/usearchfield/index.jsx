import { Tooltip, Typography } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React, { cloneElement, createContext, forwardRef, useContext, useEffect, useRef } from 'react';
import { VariableSizeList } from 'react-window';
import LinesTextField from '../LinesTextField';
import { useStyles } from './styles';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
    const { data, index, style } = props;
    return cloneElement(data[index], {
        style: {
            ...style,
            top: style.top + LISTBOX_PADDING,
        },
    });
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current !== null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
        if (React.isValidElement(child) && child.type === ListSubheader) {
            return 48;
        }
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.node,
};

const renderGroup = (params) => [
    <ListSubheader key={params.key} component="div">
        {params.key}
    </ListSubheader>,
    params.children,
];

export const USearchField = props => {
    const classes = useStyles();
    const cName = { className: "MuiAutocomplete-inputRootDense" };

    return (
        <>
            <Autocomplete
                disableListWrap
                options={props.itens}
                name={props.name}
                clearText='Limpar '
                disabled={props.disabled}
                className={classes.root}
                getOptionLabel={option => option.label === undefined ? '' : option?.label}
                style={{ width: '100%' }}
                noOptionsText="Não há nada para selecionar"
                value={props.value === null ? null : props.value}
                renderGroup={renderGroup}
                ListboxComponent={ListboxComponent}
                onChange={(event, newValue) => {
                    if (props.setValue) {
                        props.setValue(newValue);
                    }
                    if (props.onChange && newValue) {
                        props.onChange(props.name, newValue.value)
                    }
                    if (props.setValueArray) {
                        let array = [...props.valueArray];
                        if (props.tipoArray) {
                            array[props.index][props.tipoArray] = newValue;
                            props.setValueArray(array);
                            return;
                        }
                        array[props.index] = newValue;
                        props.setValueArray(array);
                    }
                }}
                renderInput={params => (
                    <LinesTextField
                        {...params}
                        className={classes.textfield}
                        required={props.required}
                        label={props.label}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            ...cName,
                            ...[props.InputProps ? props.InputProps : {}]
                        }}
                    />
                )}
                renderOption={(option) => (
                    <Tooltip title={option.label}>
                        <Typography noWrap>{option.label}</Typography>
                    </Tooltip>
                )}
            />
        </>
    )
};

export default USearchField;
