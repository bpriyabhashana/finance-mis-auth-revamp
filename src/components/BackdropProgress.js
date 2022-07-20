import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@mui/styles";
import LoadingSpinner from "./LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const BackdropProgress = ({ open }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <LoadingSpinner />
    </Backdrop>
  );
};

export default BackdropProgress;
