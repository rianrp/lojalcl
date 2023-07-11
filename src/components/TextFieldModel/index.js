import { TextField, withStyles } from '@material-ui/core';

const LinesTextField = withStyles({
    root: {
        lineHeight: 1,
        '& .MuiInputBase-root': {
            color: 'black'
        },
        '& label': {
            color: 'inherited',
        },
        '& label.Mui-focused': {
            color: '#4054b4',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#4054b4',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'silver',
            },
            '&:hover fieldset': {
                borderColor: 'silver',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4054b4',
            },
        },
    }
})(TextField)

export default LinesTextField;