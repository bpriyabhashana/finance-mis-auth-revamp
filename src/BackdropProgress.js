import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme()

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 10,
        color: '#fff',
    },
}));

const BackdropProgress = ({ open }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}

export default BackdropProgress;