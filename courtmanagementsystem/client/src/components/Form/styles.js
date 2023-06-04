
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),

    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
    },
    error: {
        // paddingLeft: theme.spacing(1.5),
        fontSize: "12px",
        color: 'red',

    },
    formControl: {
        margin: '0px',
    },
    bb: {
        boxSizing: 'borderBox',
    }
}));
